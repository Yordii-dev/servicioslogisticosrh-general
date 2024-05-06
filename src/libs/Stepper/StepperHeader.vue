<template>
  <div class="d-flex justify-content-around align-items-center mx-5">
    <slot></slot>
  </div>
  <div class="d-flex justify-content-between align-items-center mb-2">
    <span
      v-for="title in getStepper.titles"
      :key="title.text"
      class="description"
      :style="
        getStepper.stepError == title.step
          ? descriptionError
          : getStepper.stepActual == title.step || isStepPast(title.step)
          ? descriptionActive
          : descriptionDeactive
      "
      >{{ title.text }}</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(["getStepper"]),
  },
  data() {
    return {
      descriptionActive: {
        color: "black",
        fontWeight: "500",
      },
      descriptionDeactive: {
        fontWeight: "lighter",
        color: "#BABABA",
      },
      descriptionError: {
        fontWeight: "black",
        color: "#dc3545",
      },
    }
  },

  methods: {
    isStepPast(step) {
      return this.getStepper.pastSteps.find((el) => el == step)
    },
  },
}
</script>

<style scoped>
.description {
  width: 130px;
  text-align: center;
}
</style>
