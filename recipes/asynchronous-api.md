---
description: How to design asynchronous API
complexity: 2
---

# Design asynchronous API

## Use-case
My e-commerce API allows me to download a PDF export of my orders.\
This operation searches for eligible orders, formats the data and generates the PDF file. A priori, all these operations put together can take several seconds.

It is therefore inappropriate to expose a synchronous API on this use case for several reasons:
* The user experience is strongly degraded with a response time of several seconds;
* 504 timeout errors may occur depending on the operation's processing time and/or the intermediate HTTP servers's configuration;
* Application servers can become "overloaded" if too many exports are requested in the same time frame.

## How to design my API ?
We recommend adopting an "asynchronous" API design to resolve these issues.\
Two architecture's points can be setting up:
* Expose a REST endpoint to **retrieve the user's request**, in our case, its PDF export request
* **dissociate heavy HTTP traffic from processing if necessary**. This processing can be triggered via cronjob or via a message queue for example.

Now we have to manage the problem of notifying the User with treatment's progress
and retrieval of the requested data.

To be able to answer this, two API designs are possible.

## Recipe 1: Async API with polling
Polling is the easiest solution to implement.\
It has several benefits:
* delegate to the client the resource's creation tracking;
* do not ask the client to expose a callback endpoint.

Polling consists of 3 main steps: 
* request of the resource by the client;
* verification of treatment's progress by the client;
* obtaining the requested resource.

### Resource's request

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
API's response : 
  ```shell
  HTTP/1.1 202 Accepted
  Location: orders/report/status/99311702-cdaa-4069-85da-ea74a46035e6
  Retry-After: 60
  ```
Several informations are relevant in this answer:
* Header [Location](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) contains l'URI that permits
to follow asynchronous processing's progress
* Status code [HTTP 202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) indicates that,
the request has been taken into account but that processing did not occur.
* Finally we advise you to add the header [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)
informing the client how long to wait before calling the endpoint again. This value can be linked to a cache policy for example.

### Vérification de l'avancement
Now, the client is free to consult this URL as many times as necessary to follow the progress of the asynchronous processing.\
It is therefore important to **protect APIs with via a rate-limiting system** preventing clients from abusing of your endpoint and by extension, crash your app.
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
API's response : 
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

If an error occurs during asynchronous processing, return a payload containing an error code and a message:
 ```shell
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
 ```
 ```json
{
  "error_code": "PRODUCT_NOT_FOUND",
  "error_message": "The product #42 is no longer available."
}
```

### Obtaining a resource
Once the processing is successfully completed on the server side, status's endpoint **must return an HTTP 303 code** indicating the URI of the new resource created (our pdf here) :
 ```shell
curl -X GET https://api.example.com/v1/orders/reports/status/99311702-cdaa-4069-85da-ea74a46035e6
 ```
API's response:
 ```shell
HTTP/1.1 303 See Other
Location : api/orders/reports/99311702-cdaa-4069-85da-ea74a46035e6
 ```

For more information on the code [HTTP 303](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)

### Drawbacks
The main disadvantages of this technique can be found in :
* Additional development of a progress monitoring endpoint on  server-side;
* An overload of the system and a waste of energy induced by the client-side tracking mechanism.

### Don't
Do not tell your clients to use the GET route of your resource (example: `GET api/orders/reports/{id}`) to track resource creation.
Because if you do, clients will not be able to distinguish if the resource does not exist because the processing has not finished or if an error has occurred.

## Recipe 2: Async API with a callback URL
The most complex solution to implement.

This design is divided into 2 main steps:
* request of the resource by the client;
* notification from the server that treatment is ended.

It has several benefits:
* efficiency of the scenario because the server informs the client of the end of processing;
* no development of a progress monitoring endpoint.


### Resource demand 
The client sends an HTTP request to the asynchronous endpoint with the necessary information as in the polling case.
**In this case, the client will have to provide, in addition, a callback url**. This url is going to be **stored on server side** and **called by this last one** once the treatment is complete.
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
API's response:
```shell
HTTP/1.1 202 Accepted
```

### Notification to client
Once the asynchronous processing is completed on the server side, this one will make a POST call to the client to ** notify it of the end of the treatment**. \
We recommend that the payload contains the status of the treatment (OK, KO) and a link to the recovery of created resource.
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
The client can now retrieve its resource by performing a simple GET.

### Drawbacks
This solution induces several constraints:
* This solution is **can only be used in server-to-server exchanges**;
* The solution requires **client-side development** to expose a callback endpoint to receive the server call;
* **The need to manage the potential unavailability of the client.**\
What is the right strategy to adopt? A first answer would be to set up a retry mechanism with a time lapse between each attempt.
* **The need to manage the mutual authentication of the client and the server.**\
Since both endpoints (`/reports` server side and `/callback` client side) are exposed, both parties must ensure the identity of the machines that request them.
