API Cookbook
===

> Recipes for cooking complex API meals

Status
---

In active development.

Stack
---

Development: VuePress, Vuetify  
CI: Travis

How to add content?
---

### TL;DR

- Create a branch `recipe-x`
- Add content
- Open up a pull request

Done!

### Longer story

This website uses VuePress to build .vue and .md files.  
The addition of a page consists of several steps:
- create a branch from master named `recipe-x` where x is the subject of your
recipe
- create a file `recipes/<your-file>.md`
- add some content ; you can preview your changes using `yarn serve`
- when you are done, push your changes to git and open a pull request
- [if any] treat the review comments

When your pull request is accepted, the CI builds and checks if everything
is ok. The changes are deployed onto master and available to readers after
that.

Backlog
---

- [ ] Add 2 more articles
- [ ] Fix the color of the complexity icon (should change based on the value)
- [ ] Add tags if needed (to be defined)
