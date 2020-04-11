<template>
  <v-alert :type="this.getType" v-if="isAppear">
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