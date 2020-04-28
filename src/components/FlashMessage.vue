<template>
    <v-alert 
      v-if="isAppear"
      :type="getType" 
      :color="getColor"
      :icon="getIcon"
      transition="scale-transition"
      :dismissible=dismissible
      :tile="tile"
      :border="border"
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
    dismissible: {
      type: Boolean,
      default: false
    },
    tile: {
      type: Boolean,
      default: false
    },
    border: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapGetters([
      'getMessage', 'getType', 'isAppear', 'getColor', 'getIcon', 'escape'
    ])
  },
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