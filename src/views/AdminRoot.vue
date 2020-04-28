<template>
  <v-app>
    <admin-bar></admin-bar>
    <nav-drawer></nav-drawer>
    <v-content>
      <flash-message></flash-message>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import FlashMessage from '@/components/FlashMessage'
import AdminBar from '@/components/Admin/AdminBar'
import NavDrawer from '@/components/Admin/NavDrawer'

export default {
  components: {
    NavDrawer, AdminBar, FlashMessage
  }
}
</script>
