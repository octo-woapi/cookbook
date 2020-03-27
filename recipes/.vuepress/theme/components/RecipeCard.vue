<template>
  <v-card class="mx-auto" max-width="344" outlined :to="url">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>
      {{ description }}
    </v-card-subtitle>
    <v-card-text>
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
.card {
  display: inline-block;
  min-height: 24px;
  width: 300px;
}
</style>
