---
description: I need a way to handle calls that contains many parameters in URL
complexity: 2
---

# Complex filter

## Use-case

On any APIs where there is a need to fetch resources, there is also a need to filter these using search criteria.
In most cases, these criteria are present in the url as query params.
It can be tempting to shorten the request by using shortens or code to describe your search criterias, ending up with something like:

```shell
GET https://api.example.com/v1/products?page=1&limit=5&productType=type1&productType=type2&productType=type3&brand=brand1&brand=brand2&...
```

In this case, the request is even less readable, you will need a very strong documentation and you may end up developping dictionnaries to list all those codes.
Also, it may exceed the maximum length of the URL (depending on the browser).

And in the case where there are nested parameters, long series of values for one criterion, how can we handle it?

So what can we do about all of this? Let's look at the following recipes.


## Recipe 1: use a different request method, verb POST

It may seem confusing but keep in mind that an endpoint either may or may not return (GET) or accept (POST/PUT)/... resources.

In [RFC 2616](http://www.rfcreader.com/#rfc2616_line2483), it is defined that with POST, the data sent may not result in the creation of a new resource.

Using the HTTP verb POST, creates an endpoint which accepts a request body that contains the Search Criteria.

```shell
POST https://api.example.com/v1/products/search HTTP/1.1
{
    "page": 1,
    "limit": 15,
    "productType": [
        "type1",
        "type2",
        "type3"
    ],
    "brand": [
        "brand1",
        "brand2"
    ],
    "otherSearchCriteria": ...
}
< 200 OK
< [{
<     ...
< }]
```

This endpoint will not create any resource but will return the result of the search with the sent criteria.


### Benefits and drawbacks

Benefits:
* endpoint is readable because the Search Criteria is structured
* handle more complex search criteria, ex: nested parameters, array
* will never reach the maximum length of the URL

Drawbacks:
* because it's not common to use a POST like this, consumers need to know all the specifications in order to use this endpoint such as the body of Search Criteria
* cannot share a link to make the same search
* not recommended if the request body can not be easily retrieved (e.g. from a log monitor)
    * it will be hard to reproduce the request
* responses to POST are not target of caching operations, HTTP caches are limited to caching responses to GET
    * it may be possible to cache responses to POST, but it will be difficult

## Recipe 2: put an object into an URL parameter

Where is this recipe used? In Grafana, Kibana, Amazon (e-commerce)...

Using the HTTP verb GET, creates an endpoint which accepts an object (JSON, XML,...) in the url parameter.

At first, it will look like this because the object will be encoded.

```shell
GET https://api.example.com/v1/products?searchCriteria=%7B%22page%22%3A1%2C%22limit%22%3A15%2C%22productType%22%3A%5B%22type1%22%2C%22type2%22%2C%22type3%22%5D%2C%22brand%22%3A%5B%22brand1%22%2C%22brand2%22%5D%2C%22otherSearchCriteria%22%3A...%7D HTTP/1.1
< 200 OK
< [{
<     ...
< }]
```

But when decoded, it will look like this.

```shell
GET https://api.example.com/v1/products?searchCriteria={"page":1,"limit":15,"productType":["type1","type2","type3"],"brand":["brand1","brand2"],"otherSearchCriteria":...} HTTP/1.1
< 200 OK
< [{
<     ...
< }]
```

When receiving the request, the API must decode the url parameters to interpret it.

### Benefits and drawbacks

Benefits:
* the parameters are structured in an object
* handle more complex search criteria, ex: nested parameters, array
* reduces the number of occurrences of query params
* responses to GET can be cached by a browser, proxy, cdn, gateway...

Drawbacks:
* url is not readable
* there is a need to decode the url parameters
* it should not be abused, it should be used for the most complex endpoints
    * in case this method is used, there may be a need to reconsider the design
      (the reason is trying to do too many things with this endpoint)

## Recipe 3: use of delimiters within a query param

Instead of having multiple query params for one parameter, delimiters can be used within a single query param.

Using the example in the use-case with a delimiter like `,`, it will look like:

```shell
GET https://api.example.com/v1/products?page=1&limit=5&productType=type1,type2,type3&brand=brand1,brand2...
```

But it will only work on string query params.

Plus in the API side, there will be a need to parse the query params `productType` & `brand` by the delimiter.

### Benefits and drawbacks

Benefits:
* reduces the number of occurrences of query params
* enhances readability

Drawbacks:
* consumers need to know the specifications
* limited use on string query params
* need to choose a delimiter that will not hinder the readability
    * `,` is OK
    * `;` `|` `&` are reserved characters and can not be used
