---
description: How to deal with rate limiting
complexity: 1
---

# API rate limiting

## What is rate limiting ?

***This is an essential component of security which protects your APIs from malicious overuse by limiting how often each user can call the API***. Without rate limiting, each user may make a request as often as they like, leading to “spikes” of requests that starve other consumers.

## Use-case

We want to secure our API with adding a rate limiting system.
Rate limits are defined by requests over a period of time, we can choose a limit of 5000 requests per hour for example.\
How to notify users of excessive use and what useful informations to send back ?

## Recipes

There is two ways to handle rate limiting:
* follow the standard headers
* use custom headers often used by the web giants

## Recipe 1 - Use standard headers

Exemple:
Response with overuse
```shell
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
```
* Status code `429 Too Many Requests` indicates that the user has sent too many requests in a given amount of time.
* `Retry-After` header indicates how long the user agent should wait before making another request.


## Recipe 2 - Use custom headers

Some of popular rate limitings APIs such as Twitter and Github used non official headers.
These three headers below are mainly used: 

* `X-Rate-Limit-Limit` - The number of allowed requests in the current period
* `X-Rate-Limit-Remaining` - The number of remaining requests in the current period
* `X-Rate-Limit-Reset` - A timestamp of when the limit will be reset

This is an inexhaustive headers list, everyone is free to add their own header.


### Response with normal usage
```shell
HTTP/1.1 200 OK
X-Rate-Limit-Limit: 5000
X-Rate-Limit-Remaining: 4999
X-Rate-Limit-Reset: 1609459200
```

* Here, we can see that we can again call the api 4999 times in the current period scope


### Response with overuse
```shell
HTTP/1.1 429 Too Many Requests
X-Rate-Limit-Limit: 5000
X-Rate-Limit-Remaining: 0
X-Rate-Limit-Reset: 1609459200
```

* Status code `429 Too Many Requests` indicates that the user has sent too many requests in a given amount of time (same as the first recipe)
* `X-Rate-Limit-Remaining` indicates that we have no longer remaining requests in the current period
* We should wait `X-Rate-Limit-Reset - currentTime` before making another request.

## What should we use ?

It depends on your needs:\
With the `recipe 1` , using only the standard header After-Retry solution is the easiest and quickest way to handle properly the rate limiting and it will respects the RFC.
Users will 
\
With the `recipe 2`, however, if you want to make your api more verbose or add more complex and specifif rules to your API, you must use custom headers, by taking inspiration from what the giants are currently doing.
Additionally, you will need to explain cleary in your documentation what's going on with your custom headers. 


## Resources

- [RFC 429 Too Many Requests](https://datatracker.ietf.org/doc/html/rfc6585#section-4)
- [MDN Retry-after header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After)
- [Common unofficial headers ](https://stackoverflow.com/questions/16022624/examples-of-http-api-rate-limiting-http-response-headers)
