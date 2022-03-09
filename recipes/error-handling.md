---
description: How error messages can lead to security issues ?
complexity: 1
---

# Handling errors

## Use-case

Understanding error messages is an important part of web application development and troubleshooting, However revealing too many details can allow attackers to uncover vulnerabilities that can be used to exploit system flaws. We should properly handle our error messages and ensure we don't expose sensitive data to our users.


## Recipe

**How error messages can lead to security issues ?**

The first step in handling errors is to provide a client with a proper status code. Additionally, we may need to provide more information in the response body. These codes allow a client to understand the broad nature of the error that occurred, but sometimes we don't want to reveal that a certain resource is available, this information should only be exposed to those who have access to that resource.

For example, when a user tries to access a file that does not exist, the error message typically indicates,'file not found'. When accessing a file that the user is not authorized for, it indicates, 'access denied'. The user is not supposed to know the file even exists, but such inconsistencies will readily reveal the presence or absence of inaccessible files or the site's directory structure, in that case, we would rather display 404 Http status code (not found) than 403(forbidden). Thus, 403 allows the hacker to learn more about your file system structure and security vulnerabilities.




## Conclusion
 Even when error messages don't provide a lot of detail, inconsistencies in such messages can still reveal important clues on how a site works, and what information is present under the covers.
 