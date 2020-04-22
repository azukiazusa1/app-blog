<template>
    <v-alert 
      :type="getType" 
      v-if="isAppear"
      transition="scale-transition"
      :class="position"
    >
      <span v-if="!escape" v-html="getMessage"></span>
      <span v-else>{{ this.getMessage }}</span>
    </v-alert>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('flash')

export default {
  name: 'flash-message',
  props: {
    position: {
      type: String,
      default: 'left-bottom'
    },
  },
  computed: {
    ...mapGetters([
      'getMessage', 'getType', 'isAppear', 'escape'
    ])
  }
}
</script>

<style scoped>
.left-top {
  position: fixed!important;
  left: 10px;
  top: 0;
  z-index: 30;
}
.right-top {
  position: fixed!important;
  right: 10px;
  top: 0;
  z-index: 30;
}
.left-bottom {
  position: fixed!important;
  left: 10px;
  bottom: 0;
  z-index: 30;
}
.right-bottom {
  position: fixed!important;
  right: 10px;
  bottom: 0;
  z-index: 30;
}
</style>