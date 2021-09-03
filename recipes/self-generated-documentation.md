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

- API documentation improves the experience for developers and users.
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
This documentation contains instructions about how to effectively use and integrate with an API.\
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

#### How to ?

We highly recommend you to choose OpenAPI standards. It's a most used standard for API documentation.\
The OpenAPI specification was known as Swagger until version 3.0.\
Some open source libs are available, we recommend you to choose one of them.
We recommend to choose Hapi Swagger in case of NodeJS API. You can find the NPM package [here](https://www.npmjs.com/package/hapi-swagger).\
Benefits:

- Simple to implement and to understand for the developpers and Client.
- Can be used with NodeJS API.
- An active community.
- User friendly UI.
- Design-First : You can define an API with types and examples for each endpoint before you start implementing it.
- You can document your APIs reponses.
- You can document your APIs errors.

```js
import * as Hapi from '@hapi/hapi'
import * as HapiSwagger from 'hapi-swagger'

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'Example API Documentation',
        description: 'Some description',
        contact: {
          email: 'example@example.com'
        }
    },
    tags: ['Example', 'API', 'Tag'],
    basePath: `/basePath`,
    grouping: 'tags',
    security: [{ oidc: [] }],
}

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
        plugin: Inert
    },
    {
        plugin: Vision
    },
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]

await server.register(plugins)
```

#### Documentation

- [Swagger](https://swagger.io/)
- [ReDoc](https://redocly.github.io/redoc/)
- [OpenAPI Generator](https://openapi-generator.tech/)

For more information on error documentation : [API Error format](https://octo-woapi.github.io/cookbook/error-format.html).
