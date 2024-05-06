<template>
  <div
    class="content-validate h-100 position-relative overflow-auto"
    :class="contentError.message ? 'alert alert-danger' : ''"
  >
    <p>·{{ contentError.message }}</p>
    <div v-show="contentError.details">
      <p class="ml-5" v-for="(detail, i) in contentError.details" :key="i">
        ·{{ detail }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['contentError'],
}
</script>
