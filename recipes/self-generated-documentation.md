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

## Why ?

When building a REST API, we design an API that can be used by external developers and users.

Documentation is a concise reference manual containing all the information required to work with the API.

- API documentation improves the experience for developers and users.
- Serve as a guide to help users become familiar with the API.
- Increases adoption rate.
- Documentation is the key to a good experience when consuming your API.
- Reduces onboarding time.

## Recipe

We highly recommend you to choose OpenAPI standards. It's a most used standard for API documentation.\
The OpenAPI specification was known as Swagger until version 3.0.\
Some open source libs are available, we recommend you to choose one of them.\
We recommend to choose Hapi Swagger in case of NodeJS API. You can find the NPM package [here](https://www.npmjs.com/package/hapi-swagger).\
Benefits:

- Simple to implement and to understand for the developpers and Client.
- Can be used with NodeJS API.
- An active community.

Other specifications exist: RAML and API Blueprint.\
An example can be found here: [Petstore sample](https://petstore.swagger.io/) provided by [swagger.io](https://swagger.io/) team.

- Choose your documentation standard.
- Automate the generation of your documentation.

**Swagger as example :**

Demonstrating new features from Swagger allows you to:

- Demonstrates the integration between API and Swagger.
- Demonstrates new products in a client / consumer context.

Example of an OpenAPI file in yaml format:

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

### Implementation example with Node.Js

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

### Implementation example in Java / Kotlin / Spring

If you have a Spring application (in Java or Kotlin), you can use the [Springfox lib](https://springfox.github.io/springfox/) to:

- generate automatically an OpenAPI description of the endpoints declared in your application (json or yaml file)
- expose a Swagger UI static page on your application, displaying the generated documentation

Add Springfox dependency, for example with Gradle and SpringBoot:

```bash

dependencies {
    implementation "io.springfox:springfox-boot-starter:3.0.0"
}
```

Declare the API in a dedicated config file, using the `@EnableSwagger2` annotation:

```bash
@Configuration
@EnableSwagger2
class SwaggerConfig {
    @Bean
    fun apiDocumentation(): Docket = Docket(SWAGGER_2)
        .groupName("My API")
        .apiInfo("My API provides a great service!")
        .build()
}
```

By default, the documentation will be generated for all endpoints declared in Spring controllers.
Swagger UI is available on `<host>/swagger-ui.html`  
Please refer to [Springfox documentation](http://springfox.github.io/springfox/docs/current/#quick-start-guides) or [Baeldung tutorial](https://www.baeldung.com/swagger-2-documentation-for-spring-rest-api) for further details.

## Documentation

- [Swagger](https://swagger.io/)
- [ReDoc](https://redocly.github.io/redoc/)
- [OpenAPI Generator](https://openapi-generator.tech/)

For more information on error documentation : [API Error format](https://octo-woapi.github.io/cookbook/error-format.html).
