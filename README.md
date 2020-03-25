API Cookbook
===

> Recipes for cooking complex API meals

Status
---

> WIP!


Content
---

* [Batch processing](https://github.com/octo-woapi/cookbook/blob/master/recipes/01_batch_processing.md)

Develop
---

This website uses VuePress to build .vue and .md files.  
The addition of a page consists of several steps:
- create a branch from master named `feat-x` where x is the subject of your
recipe
- create a file `recipes/<your-file>.md`
- add some content ; you can preview your changes using `yarn serve`
- when you are done, push your changes to git and open a pull request
- [if any] treat the review comments

When your pull request is accepted, the CI builds and checks if everything
is ok. The changes are deployed onto master and available to users after
that.
