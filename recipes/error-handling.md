---
description: Beware of chatty errors
complexity: 1
---

# Handling error messages

## Use-case

Understandable error messages are an important part of web application development, However revealing too many details can allow attackers to uncover vulnerabilities that can be used to exploit system flaws. We should properly handle our error messages and ensure we don't expose sensitive data.

When a user tries to access a resource that does not exist, the first step is to provide a proper status code, `404 not found` in this case. Additionally, you may need to provide more information in the response body, but be careful about the details you add to your error message ! 

Let's take the following examples : 

`GET /orders/21100512345`
=> 404 "The order 21100512345 was not found"


`GET /orders/21100534871`
=> 403 "The order 21100534871 is forbidden"


In these examples, you are exposing a sensitive data like (order id) and you need to be aware that such information can possibly be used by an attacker if he finds another security flaw elsewhere.

Also, when accessing a resource that a user is not authorized for, using `403 access denied`, will confirm that this id exists, but it is forbidden for that user. This also could provide hackers clues on potential flaws.


## Recipe

As a solution, when you deal with errors, we suggest you to limit your error message to a general description without mentioning IDs or any specific detail that can be used by attackers.

Also, it is preferred to return `404 not found => id does not exist`, than `403 forbidden => id exists but not allowed`, because such information should only be exposed to those who have access to the resource and the others are not supposed to know that it even exists.

If you need to give more details to allow the client to understand the broad nature of the error that occurred, you can add these information in log files, it is more safe that way!

## Conclusion

We recommend you to avoid revealing sensitives details while handling error messages like (IDs, software version, access path) or unhandled exceptions because all these inconsistencies reveal important clues on how a site works, and what information is present under the covers.
 