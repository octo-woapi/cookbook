---
description: How to upload a file through a REST API?
complexity: 2
---

# File upload through API

## Use-case

I need to upload one or multiple files.

For example: an User is represented by a resource `/users`.\
The User is allowed to upload a profile image.

Is there a RESTful way to do so?

## Recipe 1 : single upload

In most cases, you will just need to upload files one by one, without creating a resource at the same time.\ 

In this case, the solution is pretty simple, and aligned with REST standards:
- expose a separate resource representing the file\
  Example: `/users/:id/profile_picture`
- a `PUT` on this resource uploads the file, using the [Content-Type header](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type) that indicates the MIME type of the uploaded file
- if necessary, expose a `GET` on this resource for downloading the file

> N.B.: the uploaded file can also be stored in a specific storage, and then not retrieved from the API.
> 
> The API will then expose only a link to this content in a text field, like:
> ```json
> {
>   "profile_picture": "https://my-storage.com/my-file.png"
> }
> ```

For our profile picture example:
```shell
# upload the file as a binary
curl \
  -X PUT \
  -H "Content-Type: image/png" \
  --data-binary <file-content> \
  https://api.example.com/v1/users/42/profile_picture
  
# get the uploaded file with the same resource
curl \
  -X GET \
  https://api.example.com/v1/users/42/profile_picture
```

### Add metadata to the file
This previous solution implies that **no metadata will be attached to the file** during the upload request.

If you need to add information about your file, it has to be designed in a different resource and created separately:

```shell
# create a resource representing the file information, without the file itself
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d {
    "title": "October Sale Report",
    "description": "the last sale report"
  }
  https://api.example.com/v1/reports
```

The response contains the id of the created resource:
```json
{
  "id": "123"
}
```

And create a second resource related to the previous one for the file upload, like described earlier: 
```shell
# upload the file as a binary on a subresource reports/:id/file
curl \
  -X PUT \
  -H "Content-Type: text/csv" \
  --data-binary <file-content> \
  https://api.example.com/v1/reports/123/file
```

## Recipe 2 : multiple upload

If you need to upload multiple files at once, the Recipe 1 does not fit anymore, because you cannot send multiple binaries on the same resource with a single MIME type in the `Content-Type` header.

In this case, you can use the plain old `multipart/form-data` Content-Type, exactly like with a `<form>` on a classic website. 

The API client will have to build a multipart request and send it to the API:
```shell
curl \
  -X PUT \
  -H "Content-Type: multipart/form-data" \
  --form metadata="{\"title\":\"My pics\"}" \
  --form file1=<file1> \
  --form file2=<file2> \
  https://api.example.com/v1/users/123/pictures
```

Note that multipart requests [can be described in Swagger](https://swagger.io/docs/specification/describing-request-body/multipart-requests/).
 
**Benefits:**
- Less http requests than with a single upload
- You can send some JSON metadata along with the files (but you will probably have to parse it explicitly, since it will be just json in a text field)

**Drawbacks:**
This design will make the integration of your API more complicated:
- The multipart format is not as easy as the JSON one, or a single binary upload.
- Most HTTP clients will be able to build a multipart request, but it will not be as straightforward as a classic API request, and some developers may get confused, because they are not used to it.

Before considering this solution, ask yourself if the multiple upload is really needed. In most cases, you could expose a single upload on your API, and let the clients perform multiple calls.

## Don't: send a Base64 image

For images upload, you may be tempted by the Base64 format.

The benefit is obvious: the image can be sent in a string field of a JSON body, along with other information on the resource. No need to handle binary, exotic content-types and so.

It can also be retrieved the same way, directly in the resource, and displayed as is in a browser.

```json
{
  "id": "123",
  "name": "Alice",
  "profile_picture": "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"
}
```

But be aware that a Base64 representation increases the image size by 33%. It will be ok for small images, but you will have to be very careful about the image sizes you accept.\
It may also add a lot of data in your resource, increasing the payload going through the network. You will have to add some workaround to prevent any performance issue (expose the image in a separate resource, add a filter for excluding the image when it is not needed...).

And if server-side you store the image as a binary, your application will have to convert it back and forth at each writing and reading, consuming CPU and memory for an unnecessary operation.

In a nutshell: even if browsers are comfortable with Base64 images, HTTP requests can easily handle binary content.

## Resources
- [A multipart explanation](https://www.outsystems.com/blog/posts/consuming-multipart-form-data-rest-method/)
- [W3C reference on multipart](https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.2)
- [HTTP/REST API File Uploads on phil.tech](https://phil.tech/2016/http-rest-api-file-uploads/)
