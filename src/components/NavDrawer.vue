<template>
  <v-navigation-drawer
    v-model="isOpen"
    absolute
    temporary
    dark
  >
    <v-list nav dense>
      <v-list-item-group>
        <nav-list-item
        title="Home"
        icon="fas fa-home"
        link="/"
      ></nav-list-item>
      <nav-list-item
        title="About"
        icon="fas fa-info-circle"
        link="/about"
      ></nav-list-item>
      <nav-list-item
        title="Tags"
        icon="fas fa-tags"
        link="/tags"
      ></nav-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NavListItem from '@/components/NavListItem'

export default {
  name: 'NavDrawer',
  props: {
    drawer: Boolean
  },
  computed: {
    isOpen: {
      get() {
        return this.drawer
      },
      set(drawer) {
        this.$emit('update:drawer', drawer)
      }
    },
  },
  components: {
    NavListItem
  }
}
</script>