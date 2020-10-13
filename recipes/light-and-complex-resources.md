---
description: I need a light version and a complete version of the same resource
complexity: 1
---

# Light and complex resources

## Use-case

On my e-commerce API, I have an entity called Product, representing a product sold on the API.\
A Product can have many attributes, but the API Clients usually don't need all of them at the same time.

A single resource `GET /products/:id` would be too big for most usages, but all the attributes are needed at a step of my workflow.

How can I build an API that meets all these requirements?

## Recipe 1: expose several resources with real business meaning

If it is too big, it is probably because your resource tries to cover multiple business cases: display a list of products as a search result, the details of a product, the technical info, the prices, the stocks, etc.\

Try to split it in several resources and sub-resources that have a business meaning, and will be used in different business contexts:
- `GET /products/:id` would contain the minimum product information, necessary for a simple display, such as labels, descriptions or a main image.
- `GET /products/:id/technical_info`, `GET /products/:id/ratings`, `GET /products/:id/images`...
- this works especially if some information necessitate another parameter: `GET /products/:id/stocks?location_id=...` returns the stocks at a specific location.

If you have different types of products (like books, clothes and computers on the same e-commerce API), they probably don't share the same characteristics. It would be interesting to build specific resources for your API to expose the real business case:
- `GET /products/:id` with shared characteristics (labels, etc.) and links to following specific resources
- `GET /books/:id` only for books, with their specific attributes: author, publisher, translator, back cover...
- `GET /computers/:id` with screen size, RAM, CPU...

In a nutshell: **split your resource, but in a business-relevant way.**

Benefits:
- your API is affordable and really reflects your business
- no more huge single resource that forces the Client to load many useless information, impacting performances

Drawbacks:
- if a Client needs multiple information at once, it will have to do multiple calls

## Recipe 2: on-demand fields on a single resource

If the business split is not possible, for example if it does not cover the multiple use cases of yours Clients, you can still go along with the single resource.

In this case, you can add a `?fields=...` query string parameter, that will allow the Client to chose which field are needed in its context:

The full product without filtering:
```shell
GET https://api.example.com/v1/products/42 HTTP/1.1
< 200 OK
< {
<     "id": 42,
<     "title": "My fancy product!",
<     "description": "The best of all products",
<     "images": ["//some.url"],
<     "height": "120",
<     "width": "100",
<     "depth": "10",
<     "author": null,
<     ...
< }
```

The same with the fields filter:
```shell
GET https://api.example.com/v1/products/42?fields=title,description HTTP/1.1
< 200 OK
< {
<     "title": "My fancy product!",
<     "description": "The best of all products"
< }
```

Benefits:
- Simple to implement and to understand for the Client
- Can be combined with the **Recipe 1** for filtering fields on any resource

Drawbacks:
- Depending on your backend implementation, you may have to load the full product anyway and just filter in the response layer.
- If you have cache on your resource, it will decrease your hit ratio because of the multiple combination of parameters.
- Calls without filter may cause performances issues because of the size of the response.
- Without splitting it, your product resource may continue to grow endlessly, and not represent accurately your business any more.

## Do not

It is sometimes tempting to expose resources like `/light_product/:id`, `/medium_product/:id`, `/complete_product/:id`...

The problem with such a design is that you will never know for sure in which resource a field belongs, because of the totally arbitrary border. The split between what is in _light_ and _medium_ will probably be driven by your main client (generally your front-end), for a specific and short-sighted need.\
This will necessitate a great deal of cognitive load and documentation reading for checking what resource should be called by a Client in a new use case. What if it needs a field in _light_ and one in _medium_?\

Finally, this does not really solve your scalability problems: you cannot split this way more than 2 or 3 times, and you may have to finally enrich your "light" resources for following the Clients needs.
