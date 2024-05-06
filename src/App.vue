<template>
  <router-view />
  <ErrorFetch v-show="appError.length > 0" :errorMessage="appError" />
</template>

<script>
import { mapState } from 'vuex'
import ErrorFetch from './components/chunks/ErrorFetch.vue'
export default {
  data() {
    return {}
  },
  components: { ErrorFetch },
  computed: {
    ...mapState(['appError']),
  },
}
</script>

<style></style>
