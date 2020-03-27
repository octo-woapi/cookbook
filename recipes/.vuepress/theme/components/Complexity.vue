<template>
  <div class="complexity">
    <v-icon class="icon" :color="complexity.color">
      {{ complexity.icon }}
    </v-icon>
    <span>{{ complexity.text }}</span>
  </div>
</template>

<script>
export const complexities = [
  { color: "grey", text: "Unrated", icon: "mdi-signal-off" },
  { color: "green", text: "Beginner", icon: "mdi-signal-cellular-outline" },
  { color: "yellow", text: "Medium", icon: "mdi-signal-cellular-1" },
  { color: "orange", text: "Advanced", icon: "mdi-signal-cellular-2" },
  { color: "red", text: "Expert", icon: "mdi-signal-cellular-3" },
]

export default {
  name: "Complexity",
  props: {
    value: {
      type: Number,
      validator: value => 0 <= value && value <= 4,
    },
  },
  computed: {
    complexity() {
      return complexities[Math.floor(this.value)]
    },
  },
}
</script>

<style scoped lang="scss">
.complexity {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 4px;
}
</style>
