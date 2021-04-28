<template>
  <div class="recipes">
    <v-subheader>All recipes</v-subheader>
    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
           v-for="recipe in recipes">
        <recipe-card class="recipe" v-bind="recipe" />
      </div>
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
