---
description: How to check a resource existence ?
complexity: 1
---

## Use-case
In some cases, the client is not interested in the resource itself but by its existence. 

## Recipe 1: Using GET
The simple case, the client make a GET request to the resource and check only the HTTP status code : 
* 200, the resource exist;
* 404, the resource does not exist.

```bash
GET https://api.example.com/v1/orders/42 HTTP/1.1
< 200 OK
...
```

## Recipe 2: Using HEAD
An alternative case, the client make the same request on the HEAD endpoint.
The HEAD endpoint must return the same HTTP status code without the HTTP body.

```bash
HEAD https://api.example.com/v1/orders/42 HTTP/1.1
< 200 OK
...
```



**Benefits:**
- A more efficient approach, no response body will be transmitted for the usecase
- Modern frameworks (ex: Spring-Boot, Hapi.js and NestJS) can generate the HEAD endpoint from the GET endpoint
  * [HEAD endpoint generation in Spring](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-requestmapping-head-options)  
- The response can be cacheable

**Drawbacks:**
- Has to be handmade in order to optimize backend operations (ex: sql requests)
- The HEAD method is not widepread in the dev community


## Resources

[HEAD definition in the HTTP RFC](https://datatracker.ietf.org/doc/html/rfc2616#section-9.4)
> The HEAD method is identical to GET except that the server MUST NOT
return a message-body in the response. 
