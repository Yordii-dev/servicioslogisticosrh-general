<template>
  <span
    v-if="getStepper.stepError != step"
    :style="
      getStepper.stepActual == step || isStepPast(step)
        ? stepActive
        : stepDeactive
    "
    class="step text-white"
  >
    <i v-if="isStepPast(step)" class="fa-solid fa-check"></i>
    <span v-else>{{ step }}</span>
  </span>
  <i
    v-else
    class="icon-error-step fa-solid fa-triangle-exclamation text-danger"
  ></i>
  <hr v-show="step != getStepper.titles.length" class="hr flex-grow-1" />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['step', 'text'],
  name: 'StepVue',
  data() {
    return {
      stepActive: {
        background: '#007bff',
      },
      stepDeactive: {
        background: 'rgba(0, 0, 0, 0.38)',
      },
    }
  },
  computed: {
    ...mapGetters(['getStepper']),
  },
  methods: {
    ...mapMutations(['setStepperTitle']),
    isStepPast(step) {
      return this.getStepper.pastSteps.find((el) => el == step)
    },
  },

  mounted() {
    //Para no tener problemas de titulos duplicados cada ves que carga el stepper
    if (this.getStepper.titles.length < 3) {
      this.setStepperTitle({ text: this.text, step: this.step })
    }
  },
}
</script>
<style scoped>
.step {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px !important;
  width: 30px !important;
  border-radius: 50% !important;
}

.icon-error-step {
  font-size: 30px;
}

.hr {
  height: 0.1px;
  border-width: 0;
  background-color: rgb(172, 172, 172);
}
</style>
