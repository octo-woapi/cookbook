---
description: How to create a resource when the id is already known?
complexity: 1
---

# Create a resource with an already known id

## Use-case

In most cases, we use POST for creating a new resource. The request is made on the collection, and the server is responsible for generating the id of the new resource:
```bash
POST https://api.example.com/v1/orders HTTP/1.1

< 201 Created
< Location: https://api.example.com/v1/orders/42
```

But sometimes, the id of the resource to create is already known by the client.

This can happen when:
- The business object has been created first in another application, and we want to use the same id when synchronizing it with our API.
  - e.g.: when a product is purchased, the Payment Provider generates a Transaction id when the payment is complete.
  Then we want to create a new `/transactions` resource on our Order API, using the id given by the PSP.
- The resource id is not randomly generated but has a business meaning, and can be chosen client-side
  - e.g.: I want my products to be identified by their business identifier: [EAN (European Article Numbering)](https://fr.wikipedia.org/wiki/Code-barres_EAN), [UPC (Universal Product Code)](https://fr.wikipedia.org/wiki/Code_universel_des_produits)...

## Recipe

You should use `PUT` instead of `POST` for creating the resource, and give the id in the url.

For example, to create a new `product` with id `761234567890`:
```bash
PUT https://api.example.com/v1/products/761234567890 HTTP/1.1
{
  "label": "My new product"
}

< 201 Created
```

The syntax is the same as for a complete update: `PUT` kind of perform an upsert on the resource.

In the case of a creation, the [201 Status Code](https://developer.mozilla.org/fr/docs/Web/HTTP/Status/201) is expected.

## Resources

- [PUT definition in the HTTP RFC](https://datatracker.ietf.org/doc/html/rfc2616#section-9.6)
> If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource by the requesting user agent, the origin server can create the resource with that URI.
