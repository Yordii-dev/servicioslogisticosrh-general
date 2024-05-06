<template>
  <div></div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setRoutesActiveTab']),
  },
  mounted() {
    this.setRoutesActiveTab('Mapa')
  },
}
</script>
