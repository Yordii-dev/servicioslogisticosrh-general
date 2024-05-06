<template>
  <div v-show="getStepper.stepActual == step" class="content">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  props: ["step"],
  computed: {
    ...mapGetters(["getStepper"]),
  },
}
</script>
<style scoped>
.content {
  height: 100% !important;
}
</style>
