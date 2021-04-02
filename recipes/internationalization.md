---
description: How to design API resources that depends on the requested language or country
complexity: 2
---

# Internationalize your API

## Use-case

My e-commerce API exposes products.\
I want the content to change depending on the language or the country of the end-user:
- labels and units should be retrieved in the language of the user
- the user should only see the products available in his country, with the price of the product in his country

There are actually two distinct use-cases behind this one:
- labels and units are about **translation**: it only changes the text that will be displayed to the user, it does not impact the business rules\
eg: the list of products will be the same, but with labels in English, French, etc.
- selling products adapted to a specific country is called **localization**: the country changes the **business rules** of the API, not only the labels.\
eg: the product #42 is available only in France but not in the US ; the product #43 is worth 10€ in France but $20 in the US, etc.

A different recipe will be applied to each use-case.

## Recipe for use case 1 : translation

When building a REST API, we should rely on HTTP built-in functionalities (instead of inventing custom ones), so that any developer will be able to understand how the API works without even reading a documentation.

Changing the _representation_ of a given resource depending on the format requested by the API Client is a core principle of the HTTP protocol: it is called [content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).

For getting the representation of the resource in a specific language, we should use the [Accept-Language header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language).

Your API will have to deal with this Accept-Language header:
- return the labels in the requested language
- use a default language if the header is not present (it should not be mandatory)
- maybe implement a fallback mechanism if there is no translation for the requested language

Getting the product #42 in the default locale (English):
```shell
curl https://api.example.com/v1/products/42
```
```json
{
  "id": "42",
  "label": "A great product!"
}
```

Getting the product #42 in French:
```shell
curl \
-H "Accept-Language: fr-FR" \
https://api.example.com/v1/products/42
```
```json
{
  "id": "42",
  "label": "Un super produit !"
}
```

## Recipe for use case 2 : localization (business rules depending on the country)

When the country of the user does not only imply translation, but also changes the behaviour of your application, **it should be requested as an explicit parameter.**

Your business parameters should always be explicit in your API contract. A Client developer should be able to understand what are the business parameters of an endpoint, and how they will impact the behaviour of the API.

As headers are meant for metadata (like content negotiation), the business parameters should not be "hidden" in a header.\
On the contrary, they should be declared as **query string or path parameters**, depending on the context and your API standards.

Unlike the Accept-Language header, this parameter will probably be mandatory.

### In a query string parameter

Products #42 and #43 are sold in France with a price in Euros:
```shell
curl https://api.example.com/v1/products?country=FR
```
```json
[
  {
    "id": "42",
    "label": "A great product!",
    "price": {
      "value": 15,
      "currency": "EUR"
    }
  },
  {
    "id": "43",
    "label": "The product #43",
    "price": {
      "value": 10,
      "currency": "EUR"
    }
  }
]
```

Only product #43 is sold in the US, with a price in US Dollars:
```shell
curl https://api.example.com/v1/products?country=US
```
```json
[
  {
    "id": "43",
    "label": "The product #43",
    "price": {
      "value": 20,
      "currency": "USD"
    }
  }
]
```

### In a path parameter

Same principle, but the country is in a path parameter, emphasizing the hierarchy between products and the countries they belong to:

`GET /v1/countries/:countryId/products` => list of the products of countryId

```shell
curl https://api.example.com/v1/countries/FR/products
```
```json
[
  {
    "id": "42",
    "label": "A great product!",
    "price": {
      "value": 15,
      "currency": "EUR"
    }
  },
  {
    "id": "43",
    "label": "The product #43",
    "price": {
      "value": 10,
      "currency": "EUR"
    }
  }
]
```

### Format of the parameter
 As this is a custom parameter, you can chose its name and possible values, according to what it stands for.

If your parameter is a country, rather use a normalized value like [the country ISO code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes) (like the second part of the Accept-Language format: `fr-FR` => `FR` for France).

But depending on your business needs it may also refer to a custom code, for example the id of a business unit.\
In this case, the values may be listed by a specific endpoint like `GET /business-units`:

Get all available business units:
```shell
curl https://api.example.com/v1/business-units
```
```json
[
  {
    "id": "BU_EUR",
    "label": "Europe Business Unit"
  },
  {
    "id": "BU_US",
    "label": "US Business Unit"
  }
]
```

Get the products of the Europe business unit:
```shell
curl https://api.example.com/v1/products?business-unit=BU_EUR
```
```json
[
  {
    "id": "42",
    "label": "A great product!",
    "price": {
      "value": 15,
      "currency": "EUR"
    }
  }
]
```

## Why not both?

You just separated the two concerns (translation and localization), so you can easily mix both solutions, if it makes sense for your business:

Products sold in the US, with French labels:
```shell
curl \
-H "Accept-Language: fr-FR" \
https://api.example.com/v1/products?country=FR
```
```json
[
  {
    "id": "43",
    "label": "Le produit #43 en Français !",
    "price": {
      "value": 20,
      "currency": "USD"
    }
  }
]
```


## Dont's

Before choosing a solution, you need to identify if your need belongs to the first or the second use case.\
If the parameter changes more than just labels, you probably need to manage localization like in the second use case.

**Don't use Accept-Language to manage both translation and business rules.**\
eg: `Accept-Language: fr-FR` returns the products sold in France, translated in French.

This may do the trick for a while, but you just coupled language and business rules. What if you need to expose products sold in China but translated in English? Use a custom `en-CN` language tag?
This behaviour will be difficult to understand for your API client.

**Don't use Accept-Language to display the currency**
Currency is related to the user country, and it is tempting to display prices in Euros when requested with the `fr-FR` language, and in US Dollars when requested with the `en-US` language.\
Once again, by coupling translation with a business parameter you made some queries impossible: how do I display products sold in France in Euros but with the English labels?

If your products may be displayed in different currencies, it is a better idea to accept a query parameter like `?currency=EUR`, or make the currency depends on a business parameter like: `?country=FR` => prices in Euro.
