---
description: How error messages can lead to security issues ?
complexity: 1
---

# Handling error messages

## Use-case

Understanding error messages is an important part of web application development, However revealing too many details can allow attackers to uncover vulnerabilities that can be used to exploit system flaws. We should properly handle our error messages and ensure we don't expose sensitive data to our users.


## Recipe

When a user tries to access a resource that does not exist, the first step is to provide a proper status code, `404 not found` in this case. Additionally, you may need to provide more information in the response body, but be careful about the details you add to your error message ! 

Let's take the following example : 

`GET /v1/clients/12345/attributions/21100512345`
=> 404 "The Attribution 211005123456 was not found"

`GET /v1/clients/12345/attributions/21100534871`
=> 404 "The client 12345 is not linked to Attribution 21100534871"

In fact, there are security issues in these descriptions! You are exposing sensitives data like (client id and attributions id) that allow hackers to learn more about your file system structure and security vulnerabilities. In this case, we suggest you to limit your message error to a general message without mentioning  IDs or any specific detail that can be used by attackers.

Also, when accessing a resource that a user is not authorized for, using `403 access denied`, will confirm that this resource does exist, but it is forbidden for that user. Such detail can also provide hackers clues on potential flaws. This information should only be exposed to those who have access to the resource, and the others are not supposed to know that it even exists. As a solution, we would rather return `404 not found`, than `403 forbidden`.

If you need to give more details to allow the client to understand the broad nature of the error that occurred, you can add these information in log files, it is more safe that way!

## Conclusion

We recommend you to avoid revealing sensitives details while handling error messages like (IDs, software version, access path) or unhandled exceptions because all these inconsistencies reveal important clues on how a site works, and what information is present under the covers.
 