<template>
  <div class="recipes">
    <v-subheader>All recipes</v-subheader>
    <div class="recipes-row">
      <recipe-card class="recipe" v-for="recipe in recipes" v-bind="recipe" />
    </div>
  </div>
</template>

<script>
import RecipeCard from "@theme/components/RecipeCard.vue"

export default {
  name: "Recipes",
  components: { RecipeCard },
  props: {
    recipes: Array,
  },
}
</script>

<style scoped lang="scss">
.recipes-row {
  display: flex;
}

.recipe {
  margin: 0 8px;
}
</style>
