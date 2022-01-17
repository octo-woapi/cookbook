---
description: How to update only a few fields of a resource?
complexity: 1
---

# Partial update of a resource

## Use-case

My API has a `/users` resource, representing a User, and containing its personal information: name, email, address...

```json
{
    "id": 42,
    "first_name" : "Tom",
    "last_name": "Smith",
    "email": "tom.smith@example.com",
    "phone": {
        "home": "0123456789",
        "mobile": "9876543210"
    },
    "address": {
        "street": "50, avenue des Champs-Elysées",
        "zip_code": "75008",
        "city": "PARIS"
    }
}
```

The user modifies his profile to update only his address.

I could perform a complete update, and send the whole resource back with a `PUT` request. But the payload may be huge, with a lot of useless fields since I just want to update the address. 

How can I perform a partial update, sending only the new address?

## Recipe

Partial update can be performed with a `PUT` request on a sub-resource. It is indeed a complete update, but of a fraction of the initial resource.

This sub-resource should be meaningful on a business level.

In our example, it would be `users/:id/address`.\
Note that this sub-resource can be in the singular, since it is a single resource and not a collection.

```
PUT https://api.example.com/v1/users/42/address HTTP/1.1
{
    "street": "34, avenue de l'Opéra",
    "zip_code": "75002",
    "city": "PARIS"
}

< 200 OK
```

This design also works for updating just one field:

```
PUT https://api.example.com/v1/users/42/email HTTP/1.1
"my_new_email@example.com"

< 200 OK
```

**Benefits:**
- your API **expresses exactly what you can update** on a business point of view:\
  Updating the address or the email may be performed on different moments of the User lifecycle, with specific business rules. Some other fields of the User may not be open to modification. Having different endpoints for each of these business operations clearly indicates that they are separate, and does not let the API Client decide what field he wants to update or not.
- you avoid the drawbacks of `PATCH` (see below)

**Drawbacks:**
- this is not suited if you need flexibility on the fields you want to update
- obviously, you end up with more endpoints on your API (but is that really a problem?)

### Why not PATCH?
In the REST standard, `PATCH` is usually described as the HTTP verb to use in case of a partial update. 

Nevertheless, we discourage from using `PATCH`:\
the format of the payload indicating the changes to apply on the resource is not specified in [the HTTP RFC](https://datatracker.ietf.org/doc/html/rfc5789).
It means that the Client will have to read your documentation to understand how the payload should be formatted to update only the address.
 
To compensate this grey area, several standards have been proposed, such as:
- [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902)
- [JSON-LD](https://github.com/digibib/ls.ext/wiki/JSON-LD-PATCH)
- [JSON Merge Patch](https://datatracker.ietf.org/doc/html/rfc7396)

But none of them are integrated in the HTTP spec: you will have to chose one and let the Client know how to format the request.

`PATCH` can also leads to tricky business cases, that will not be obvious when looking at your API: is a missing field a suppression? what if some fields have to be updated altogether?

On the other hand, `PUT` has many advantages:
- its format is standard and predictable, since you have to send the complete resource
- unlike `PATCH`, it is safe and idempotent

**Then, should I never use `PATCH`?**\
If you want a complete flexibility on the fields that will be updated, but you don't want to perform a complete update with `PUT` because the payload will be too big, `PATCH` is the only way to go.\
But in this case, it may reveal that the resource is too big, or that its business meaning is unclear, and we encourage you to reconsider its granularity.

## Resources
- [Should I PUT or should I PATCH?](https://blog.octo.com/should-i-put-or-should-i-patch/)
