---
description: How to format the response body in case of an API error?
complexity: 1
---

# API Error format

## Use-case

My API returns errors in various cases:
- the request does not satisfy my business rules
- a resource does not exist
- the request is not properly formatted
- an unexpected error occurred (yes, it happens!)
- ...

In case of an error, I already know about [HTTP status codes](https://httpstatuses.com/) (should be in `4xx` or `5xx`), but what should I put in the response body?

## Recipe

**Choose an error format for your API, and stick with it.**

The error response body should be an object, containing always the same attributes.

It should at least contain:
- an **error code**: a human-readable code, shortly describing the problem, usable by an application to identify the error.
  - the error code is unique for each error case.
  - a Client (like a frontend) may be able to write a condition on this code, for example to display a specific message to the user.
  - suggested format: upper snake case, with explicit words
  - e.g.: `PRODUCT_NOT_FOUND`, `ORDER_ALREADY_PAID`, `NO_SEARCH_RESULT`...
- an **error message**: a human-readable description, fully describing the problem.
  - the message may differ from one occurrence to another: it can contain data explaining this specific error, eg: `The product #42 is no longer available.`
  - this message is meant for helping Client developers to debug. In most cases, it should not be displayed as is to an end-user.

The complete format depends on your API standard (snake or caml case, etc.). Here is a suggestion:
```json
{
  "error_code": "PRODUCT_NOT_FOUND",
  "error_message": "The product #42 is no longer available."
}
```

### Internal Server Errors
Unexpected exceptions should always be caught at the higher level of your application, so that they are transformed to a [500 API error](https://httpstatuses.com/500) with a neutral message.

For security concerns, always avoid to expose your implementation details in your API responses (stack trace, database errors, etc.).\
Use logs instead for debugging the error.

Here is a suggestion of a response body for a 500 error:
```json
{
  "error_code": "UNEXPECTED_ERROR",
  "error_message": "An unexpected error occurred."
}
```

### Documentation

The generic error response format should be visible in your API documention (such as Swagger UI), and associated to `4xx` and `5xx` status codes.

The list of possible error codes returned by an endpoint should be listed along with the endpoint description.

### About Status codes

HTTP Status codes and built-in error codes are complementary:
- the **status code** indicates a **high-level typology of errors**: authentication, resource not found, incorrect request syntax, business rule violation...\
This is helpful for the Client to perform a first treatment when no details are needed: 401 -> redirect to login form, 404 -> display the Not Found error page, etc.
- the **error code** identifies a **specific error case**: it allows the Client to perform fine-grained handling of the error when necessary.

### Don'ts
- **don't use HTTP Status Code as error codes**: you will never achieve a one-to-one mapping between error cases and statuses. It does not scale at all: you will be stuck as soon as you will want to make the difference between two cases that belong to the same status.
- **don't use technical error codes**, such as numeric values or non-explicit codes: your Client will have to go through an unfriendly documentation for understanding the error.
  - eg: `"error_code": "42"`, `"error_code": "NF"`...
  - this is also a good practice of separation of concerns: if internal codes are exposed on your API, it means that the API is coupled with your implementation. Refactoring may be more difficult, since your API Clients are now aware of some of your internal details. Technical stuff should not appear on your API!
