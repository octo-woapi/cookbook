<template>
  <div class="theme-container" :class="pageClasses">
    <navbar v-if="shouldShowNavbar" />

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
import Navbar from "@theme/components/Navbar.vue"
import Page from "@theme/components/Page.vue"
import Recipes from "@theme/components/Recipes.vue"

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
    Navbar,
    Recipes,
  },
  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

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
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 16px auto;
  display: block;
</style>
