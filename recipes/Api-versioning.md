---
description: When and how to version your API ?
complexity: 1
---

# Api-Versioning

## Use-case

APIs are contracts established between you and your API consumers. However, they need to be evolved over time and one of the key challenges is to deal with these alterations.


## When to version your API ?

There exist different types of changes: 

- Compatible changes: These are changes that respect the principle of backward compatibility and have no impact on the existing customers, for example, for an Album resource presented in JSON format:
```json
{
   "album": {
    "title": "Dark Side of the Moon"
   }
}
```
The adding of a new attribute has no impact on the general structure.  
```json
{
  "album": {
    "title": "Dark Side of the Moon",
    "artist": "Roger Waters"
  }  
}
```
- Breaking changes: These are changes that directly impact the existing customers. On the previous example, if one or more customers use the "artist" element, changing from one artist per album to a list of artists per album makes this element unusable by customers.
```json
{
  "album": {
    "title": "Dark Side of the Moon",
    "artists": {
      "artist": [
        "Roger Waters",
        "David Gilmour"
      ]
    }
  }
}
```
So, APIs only need to be up versioned when a breaking change is made. 

Once you add a new version, you need to decide how to handle it!

## Recipe

There are different types to version your Api, but the most effective method currently used is the URI versioning. 
It consists of putting the version number in the path of the URI.

This strategy is widely used by the giants of the web, as showing the following examples: 


Google URI path : 
https://www.googleapis.com/youtube/v3/

Instagram	URI path : 
https://api.instagram.com/v1/media/popular

LinkedIn URI path : 
http://api.linkedin.com/v1/people/


It is important to note that this approach may impact the client and may not respect the REST principles (that a URI should refer to a unique resource).

### Conclusion

There exist other ways to version your Api such as Http header or query parameter versioning...
But since the version of an API is essential information, we recommend you to show it in the URI rather than in the HTTP header, it is straightforward and more simple (you don't have to deal with the complexity of handling the headers), also we recommend including a mandatory version number, on a digit, at the highest level of the uri path.