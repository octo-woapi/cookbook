<template>
  <v-card class="mx-auto card" width="100%" min-height="150px" outlined :to="url">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>
      {{ description }}
    </v-card-subtitle>
    <v-card-text class="card-text-position">
      <complexity :value="complexity"></complexity>
    </v-card-text>
  </v-card>
</template>

<script>
import Complexity from "@theme/components/Complexity.vue"

export default {
  name: "RecipeCard",
  components: { Complexity },
  props: {
    title: String,
    description: String,
    url: String,
    complexity: Number,
  },
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.card:hover {
  border-color: $primary;
  transition: border-color 0.4s $material-transition;
}

.card-text-position {
  position: absolute;
  bottom: 0;
}
</style>
