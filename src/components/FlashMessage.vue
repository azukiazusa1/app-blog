<template>
    <v-alert 
      :type="getType" 
      v-if="isAppear"
      transition="scale-transition"
      class="v-alert--notification"
    >
      {{ this.getMessage }}
    </v-alert>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('flash')

export default {
  name: 'flash-message',
  computed: {
    ...mapGetters([
      'getMessage', 'getType', 'isAppear'
    ])
  }
}
</script>

<style scoped>
.v-alert--notification {
  position: fixed!important;
  left: 10px;
  bottom: 0;
  z-index: 30;
}
</style>