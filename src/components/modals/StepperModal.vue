<template>
  <div
    class="modal fade"
    id="modalStepper"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <Stepper />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "../Stepper.vue"
export default {
  components: { Stepper },
}
</script>
<style scoped>
.modal-lg {
  width: 70% !important;
}
</style>
