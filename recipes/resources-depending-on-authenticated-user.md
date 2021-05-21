---
description: Should I expose resources depending on the user authenticated by an access token?
complexity: 2
---

# Resources depending on an authenticated user

## Use-case

I expect my API to be called with an already authenticated user (usually by an OAuth2 access token). This happens when the Client is a frontend or any other backend service.

I want to retrieve data linked to the user, for example:
- user profile
- list of user orders
- etc.

How can I do that?
Should I expose a simple `GET /profile` endpoint, that will use the access token to identify the user and retrieve its profile?

## Recipe

Let's start with a _don't_:

> using the access token as an implicit parameter of a regular endpoint is **not** a good idea.

Let's assume we have this `GET /profile` endpoint.
It has no parameters, other than the access token expected in the `Authorization` header.

The backend will extract the user id from the access token, and use it as the parameter of the endpoint.

Given an access token belonging to Alice:
```shell
curl \
-H "Authorization: Bearer <alice_access_token>" \
https://api.example.com/v1/profile
```
```json
{
  "username": "Alice"
}
```

Same call with an access token belonging to Bob:
```shell
curl \
-H "Authorization: Bearer <bob_access_token>" \
https://api.example.com/v1/profile
```
```json
{
  "username": "Bob"
}
```

Seems pretty convenient, right? But what's wrong with this design?

**Flaw 1:** Here comes a new need: in addition to the frontend, where the user is logged, an administrator should be allowed to access all user profiles.

_Can't do:_ you coupled your API endpoint with the ACL to be applied on the resource. An admin may comes with its own access token, but it will only contains its own id. It has no way to pass the required user id as a parameter.\
You would have to create a specific endpoint for the admin use case. It would be a shame, since being reusable for different clients is what APIs are all about.

**Flaw 2:** To improve my API performances, I would like to add some cache on top of it, for example using a CDN and the proper cache-control headers.

_Can't do:_ All the user profiles are retrieved under the same request, except for the access token. The cache service will not be able to distinguish them (unless you store the access token itself in the cache key, but you certainly don't want to do that!)

**Flaw 3:** This design is not affordant for a developer used to a classic REST design.\
Looking at the `GET /profile` resource, I expect the response to be always the same, as there is no clue indicating that the response depends on the access token. I would have to go through the doc to understand that.

Having these limits in mind, what can we do?

### Option 1: require explicit business parameters

All the previous flaws are caused because the `user id` is passed through the access token, even though it is a business parameter (the response content depends on it).

The simplest solution is to explicitly require all your business parameters, like for any other resource:\
For example, using `GET /profiles/:userId`

```shell
curl \
-H "Authorization: Bearer <alice_access_token>" \
https://api.example.com/v1/profiles/12345
```
```json
{
  "id": 12345,
  "username": "Alice"
}
```

So that you separate concerns:
- when the response of your endpoint depends on business parameters, they are explicitly requested in path parameters, query string or request body.
- when the right to access to your resource depends on the ACL of the user, they are enforced using the access token.

Constraints:
- for the API Client: extract the user id from the access token or the id token (generally in the `sub` claim). But in most contexts, user id should be an information already known by the frontend.
- for the API: we now have to check that the authenticated user can access the requested operation (as it was implicit with the previous design)

### Option 2: show explicitly that the access token is used as a parameter

You may think that your API design is dedicated to a single frontend use, and not be afraid by the previous flaws.

In this case, it can makes sense to favour a flawless usage for your frontend, and offer a simpler way to access some of the authenticated user information.

But if you want do go this way, we strongly suggest to **make it explicit in the endpoint naming**, to avoid at least the non-affordance flaw.

A common way to expose such an endpoint is to use `/me` or `/@me` in the endpoint. A developer will be able to understand that this endpoint is about the authenticated user:
- `GET /profile/@me`
- `GET /users/@me/profile`
- `GET /@me` as a shortcut for the user profile
- `GET /@me/orders` for the orders of the authenticated user  
- ...

An example [on Spotify API](https://developer.spotify.com/documentation/web-api/reference/#category-library):\
`GET https://api.spotify.com/v1/me/albums` : get the albums of the authenticated user.

Here is a request with Alice access token, retrieving Alice's profile:
```shell
curl \
-H "Authorization: Bearer <alice_access_token>" \
https://api.example.com/v1/profile/@me
```
```json
{
  "id": 12345,
  "username": "Alice"
}
```

Here is a request with Bob access token, retrieving Bob's profile:
```shell
curl \
-H "Authorization: Bearer <bob_access_token>" \
https://api.example.com/v1/profile/@me
```
```json
{
  "id": 67890,
  "username": "Bob"
}
```

In a nutshell:
- This may be a legitimate use case if your API is dedicated to a frontend.
- Be aware that this design jeopardize the reuse of your API, and forbid any caching feature.
- This should be limited to a few simple endpoints: having this design on your complete API would be a huge smell!
