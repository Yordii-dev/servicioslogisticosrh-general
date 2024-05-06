<template>
  <div class="fixed-bottom alert-danger w-100 py-3 text-center">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String,
  },
}
</script>
