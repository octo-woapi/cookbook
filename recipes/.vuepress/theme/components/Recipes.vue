<template>
  <div class="recipes">
    <v-subheader>All recipes</v-subheader>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3"
             v-for="recipe in recipes" :key="recipe">
        <recipe-card class="recipe" v-bind="recipe" />
      </v-col>
    </v-row>
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
