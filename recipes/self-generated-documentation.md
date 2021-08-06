---
description: Why use self-generated documentation for our API ?
complexity: 1
---

# Self-generated documentation

## Use-case

My e-commerce API exposes products.\
I want to use self-generated documentation to:

- Facilitate the integration of an API
- Document effectively

## Recipe

When building a REST API, we design an API that can be used by external developers and users.

### Facilitate the integration of an API

Documentation is a concise reference manual containing all the information required to work with the API.

- API documentation improve the experience for developers and users.
- Serve as a guide to help users become familiar with the API.
- Increases adoption rate.
- Documentation is the key to a good experience when consuming your API.
- Reduces onboarding time.
- Allows to test your APIs.
- Allows to describe the structure of your APIs.
- Allows to describe responses based on [HTTP status codes](https://httpstatuses.com/).
- Allows to describe request body.

**Swagger as example :**

API documentation is a technical content deliverable.\
This documentation containing instructions about how to effectively use and integrate with an API.\
Demonstrating new features from Swagger allows you to:

- Demonstrates the integration between API and Swagger.
- Demonstrates new products in a client / consumer context.

```shell
  paths:
  /products:
    post:
      summary: Adds a new product
      requestBody:
        content:
          application/json:
            schema:     
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
              example:   
                id: 10
                name: new product
      responses:
        '200':
          description: OK
```

### Document effectively

Most APIs are documented in OpenAPI format and are based on [Petstore sample](https://petstore.swagger.io/) provided by [swagger.io](https://swagger.io/) team. Other specifications exist: RAML and API Blueprint.

- Choose your documentation standard.
- Automate the generation of your documentation.
- Document your APIs errors.

It is sometimes tempting to want to document everything right from the start of the project. Make sure you meet your needs and business needs.\
For more information on error documentation : [API Error format](https://octo-woapi.github.io/cookbook/error-format.html).

#### Documentation tools

- [Swagger](https://swagger.io/)
- [ReDoc](https://redocly.github.io/redoc/)
- [OpenAPI Generator](https://openapi-generator.tech/)
