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
To provide an efficient API documentation to your consumers, you will have to:
- Chose your documentation standard.
- Provide a User Interface for your documentation 
- Automate the generation of your documentation

### Chose your documentation standard

Multiple API documentation formats exist, but we highly recommend choosing [OpenAPI (Swagger)](https://www.openapis.org/). It's by far the most used standard for API documentation.

The OpenAPI specification was known as Swagger until version 3.0, and is often called by this name.

Other specifications exist, as RAML or API Blueprint, but they are less common and will come with less out-of-the-box tooling.

#### OpenAPI (Swagger) format example

Example of an OpenAPI file in yaml format (json format is also supported),\
describing a `POST /products` endpoint.

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

### Provide a User Interface for your documentation

Once you have a documentation in OpenAPI format, you will need an interface for the user to explore the documentation.

[Swagger UI](https://swagger.io/tools/swagger-ui/) is the most common tool for displaying an out-of-the-box UI for an OpenAPI description.

An example can be found here: [Petstore sample](https://petstore.swagger.io/) provided by [swagger.io](https://swagger.io/) team.

You can deploy Swagger UI as a static asset on any web server.\
Open source libraries also exist to bundle it within a web framework: [hapi-swagger for Hapi JS](https://github.com/glennjones/hapi-swagger), [Springdoc for Spring](https://springdoc.org/#Introduction)...

## Auto-generate your documentation

Maintaining an OpenAPI description of your API can be painful: you will have to keep the documentation up-to-date with the implementation, which implies a lot of work and a rigorous workflow. There will always be a risk to forget an evolution and expose an out-of-date documentation.

A convenient solution is to autogenerate the API documentation directly from the codebase:
- the documentation is based on the endpoints declared in your controllers: path, HTTP verb, query params, body schema...
- metadata can be added to the route declaration for the descriptions and examples
- the generated documentation can be globally configured: describe the API, filter the endpoints, generate several doc files...

This feature exists in most web frameworks, using open source libraries.\
The Swagger UI exposition often come along with the lib.

Here are a few examples with common frameworks.

### Implementation example with Node.Js / Hapi

Declare a Swagger documentation using the Hapi-Swagger lib:

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

const plugins = [
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

### Implementation example in Java or Kotlin / Spring

If you have a Spring application (in Java or Kotlin), you can use the [Springdoc lib](https://springdoc.org) to:

- generate automatically an OpenAPI description of the endpoints declared in your application (json or yaml file)
- expose a Swagger UI static page on your application, displaying the generated documentation

Add Springdoc dependency, for example with Gradle and SpringBoot:

```kotlin
dependencies {
    implementation "org.springdoc:springdoc-openapi-ui:1.6.3"
    implementation "org.springdoc:springdoc-openapi-webmvc-core:1.6.3"
    // and if you use Kotlin:
    implementation "org.springdoc:springdoc-openapi-kotlin:1.6.3"
}
```

Declare the API in a dedicated config file:

```kotlin
@Configuration
class SwaggerConfig {
    @Bean
    fun apiDocumentation(): GroupedOpenApi {
      return GroupedOpenApi.builder()
          .group("My-API")
          .info(Info().title("My API"))
          .build();
    }
}
```

By default, the documentation will be generated for all endpoints declared in Spring controllers.\
Swagger UI is available on `<host>/swagger-ui.html`\
Please refer to [Springdoc documentation](https://springdoc.org/#getting-started) or [Baeldung tutorial](https://www.baeldung.com/spring-rest-openapi-documentation) for further details.

## Documentation

- [Swagger](https://swagger.io/)
- [ReDoc](https://redocly.github.io/redoc/)
- [OpenAPI Generator](https://openapi-generator.tech/)
