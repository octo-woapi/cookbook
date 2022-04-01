---
description: How to design asynchronous API
complexity: 3
---

# Design asynchronous API

## Use-case
My e-commerce API allows me to download a PDF export of my orders.\
This operation searches for eligible orders, formats the data and generates the PDF file. 
All these operations put together can take seconds.

It is inappropriate to expose a synchronous API on this use-case for these reasons:
* The user experience is strongly degraded with a response time of several seconds;
* 504 timeout errors may occur depending on the processing time and/or the HTTP proxy servers' configuration;
* The application can become "overloaded" if too many exports are requested in the same time frame.

## How to design my API ?
We recommend adopting an "asynchronous" API design to resolve these issues.\
Two architecture's points has to be setting up:
* Expose a REST API to **retrieve the user's request**, in our case, its PDF export request
* **Dissociate heavy HTTP traffic from processing if necessary**. This processing can be triggered via cronjob, queuing for example.

Now we have to manage the problem of notifying the User with the job progress.
Two API designs are possible for this problem.

## Recipe 1: Async API with polling
Polling is the easiest solution to implement.\
It has several benefits:
* delegate to the client the resource's creation tracking;
* to not expose a callback endpoint for the client.

Polling technique consists of 3 main steps for the client: 
* requesting the resource;
* verifying the job progress;
* obtaining the created resource.

### Requesting the resource

The client sends an HTTP request to the asynchronous endpoint with the necessary information:
```shell
curl -X POST https://api.example.com/v1/orders/reports
```
```json
{
  "start_date": "2021-10-01",
  "end_date": "2021-11-01",
  ...
}
```
APIs response : 
  ```shell
  HTTP/1.1 202 Accepted
  Location: orders/report/status/99311702-cdaa-4069-85da-ea74a46035e6
  Retry-After: 60
  ```
Some information are relevant in this answer:
* Header [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) contains the URI that permits
to follow asynchronous proceeding's progress
* Status code [HTTP 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) indicates that,
the request has been taken into account but that processing did not occur.
* Finally, we advise you to add the header [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)
informing the client how long to wait before calling the endpoint again. This value can be linked to a cache policy for example.

### Checking the progress
Now, the client is free to consult this URL as many times as necessary to follow the progress of the asynchronous processing.\
It is important to **protect APIs with a rate-limiting system** preventing clients from abuse of your endpoint and by extension, crash your app.
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
APIs response : 
 ```shell
HTTP/1.1 200 OK
Content-Type: application/json
Retry-After: 60
 ```
 ```json
{
  "status" : "IN_PROGRESS"
}
```

If an error occurs during the asynchronous process, return a payload containing an error code and a message.
For more information, you can check the [error format](error-format.md) recipe.

### Obtaining a resource
Once the processing is successfully completed on the server side, status's endpoint **must return an HTTP 303 code** indicating the URI of the new created resource (our pdf in this scenario) :
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
APIs response:
 ```shell
HTTP/1.1 303 See Other
Location : api/orders/reports/99311702-cdaa-4069-85da-ea74a46035e6
 ```

For more information on the code [HTTP 303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)

### Drawbacks
The main disadvantages of this technique can be found in :
* Additional development for the progress mechanism API;
* An overload of the system and a waste of energy induced by the client-side pulling mechanism.

### Don't
Do not tell your clients to use the GET route of your resource (example: `GET api/orders/reports/{id}`) to track resource creation.

Clients will not be able to distinguish if the resource does not exist because the processing has not finished or if an error has occurred.

## Recipe 2: Async API with a callback URL
The most complex solution to implement.

This design is divided into 2 main steps:
* request of the resource by the client;
* notification from the server to the client that job has ended.

It has several benefits:
* efficiency of the scenario, the server informs the client of the end of processing;
* no development of a progress monitoring endpoint on server-side.


### Requesting the resource
The client sends an HTTP request to the asynchronous endpoint with the necessary information as in the polling case.
**In this scenario, the client will have to provide in addition, a callback url**. This url is going to be **stored on server side** and **called by this last one** once the treatment is complete.
 ```shell
curl -X POST https://api.example.com/v1/orders/reports
 ```
```json
{
  "start_date" :"2021-10-01",
  "end_date" : "2021-11-01",
  "callback_url" : "http://myserver.com/api/orders/reports/callback"
}
```
APIs response:
```shell
HTTP/1.1 202 Accepted
```

### Notifying the client
Once the asynchronous processing is completed, the server will make a POST call to the client to **notifying the end of the job**. \
We recommend that the payload contains the status of the treatment and a link to the created resource.
 ```shell
curl -X POST http://myserver.com/api/orders/reports/callback
 ```
```json
{
  "status" : "COMPLETED",
  "links" : [{
    "rel" : "reports",
    "href" : "orders/reports/0a6509c6-1571-48be-b177-95a7d640e04f"
  }]
}
```
The client can now retrieve its resource by performing a GET call.

### Drawbacks
This solution has several constraints:
* it **can only be used in server-to-server exchanges**;
* it requires more **client-side development** to expose a callback endpoint;
* **The need to manage the potential unavailability of the client.** A first answer would be to set up a retry mechanism.
* **The need to manage the mutual authentication of the client and the server.**\
Since both endpoints (`/reports` on the server side and `/callback` on the client side) are exposed, both parties must ensure the identity of each-other.
