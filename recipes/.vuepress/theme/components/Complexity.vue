<template>
  <span>
    <v-progress-circular
      class="progress"
      :rotate="-90"
      :value="progress"
      :color="color"
      >{{ Math.floor(value) }}</v-progress-circular
    >{{ value | complexity }}
  </span>
</template>

<script>
export default {
  name: "Complexity",
  props: {
    value: {
      type: Number,
      validator: value => 0 <= value && value <= 5,
    },
  },
  computed: {
    progress() {
      return Math.floor(this.value) * 20
    },
    color() {
      const map = {
        0: "grey",
        1: "green",
        2: "yellow",
        3: "orange",
        4: "dark-orange",
        5: "red",
      }
      return map[Math.floor(this.value)]
    },
  },
  filters: {
    complexity(value) {
      const map = {
        0: "Unrated",
        1: "Beginner",
        2: "Easy",
        3: "Medium",
        4: "Advanced",
        5: "Expert",
      }
      return map[Math.floor(value)]
    },
  },
}
</script>

<style scoped lang="scss">
.progress {
  margin-right: 8px;
}
</style>
