---
description: Update many resources in a single request (a.k.a. a batch)
complexity: 3
---

## Use-case

We would like to update many resources in a single request (a batch).

## Recipe 1

Create a nested resource "batches", which accept a collection. A batch save the request, give immediately a response and run a job to process the request asynchronously.

```shell
POST https://api.example.com/v1/orders/batches HTTP/1.1
{
    "items": [
        { "id": 382, "sent_on": "2017-04-01" },
        { "id": 383, "sent_on": "2017-04-01" },
        { "id": 384, "sent_on": "2017-04-01" }
    ]
}
< 201 Created
< Location: https://api.example.com/v1/orders/batches/42
```

```shell
GET https://api.example.com/v1/orders/batches/42 HTTP/1.1
< 200 OK
< {
<     "id": 42,
<     "status": "pending",
<     "count": null,
<     "errors": null,
<     "created_at": "2017-04-01 14:43:41",
<     "updated_at": "2017-04-01 14:43:41"
< }
```

```shell
GET https://api.example.com/v1/orders/batches/42 HTTP/1.1
< 200 OK
< {
<     "id": 42,
<     "status": "pending",
<     "count": 3,
<     "errors": [
<         { "id": 383, "url": "/orders/383" }
<     ],
<     "created_at": "2017-04-01 14:43:41",
<     "updated_at": "2017-04-01 14:43:41"
< }
```

Warning: unit processing stay a better choice.

# Benefits and drawbacks

Benefits:
* highly reduce number of requests

Drawbacks:
* design is not affordable
* errors are hard to deal with, we can't use HTTP codes anymore
* clients must implement polling to get the result, two ways to avoid that:
  * "fire & forget": error cases are discarded
  * client must implement a callback URL to be notified about processing completion
