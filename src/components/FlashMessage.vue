<template>
  <v-alert 
    :type="getType" 
    v-if="isAppear"
    text 
    transition="scale-transition"
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