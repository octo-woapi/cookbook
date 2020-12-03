<template>
  <div class="theme-container" :class="pageClasses">
    <div class="recipes-container">
      <recipes :recipes="recipes"></recipes>
    </div>
    <page :sidebarItems="false">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </page>
  </div>
</template>

<script>
import Page from "@theme/components/Page.vue"
import Recipes from "@theme/components/Recipes.vue"
import SearchBox from "@SearchBox"

export function toRecipe(page) {
  const { frontmatter } = page
  return {
    title: page.title || frontmatter.title,
    description: frontmatter.description,
    url: page.path,
    complexity: frontmatter.complexity,
  }
}

export default {
  name: "Home",
  components: {
    Page,
    Recipes,
    SearchBox,
  },
  computed: {
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
        },
        userPageClass,
      ]
    },

    recipes() {
      return this.$site
        ? this.$site.pages.filter(page => page.path !== "/").map(toRecipe)
        : []
    },
  },
}
</script>

<style scoped lang="stylus">
.recipes-container
  display: block;
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 16px auto;
  .recipes
    margin: 32px 0;
</style>
