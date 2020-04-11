<template>
  <v-app>
    <admin-bar :user="user"></admin-bar>
    <nav-drawer></nav-drawer>
    <v-content>
      <flash-message></flash-message>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import FlashMessage from '@/components/FlashMessage'
import { auth } from '@/plugins/auth'
import AdminBar from '@/components/Admin/AdminBar'
import NavDrawer from '@/components/Admin/NavDrawer'
  export default {
    data () {
      return {
        user: {},
      }
    },
    created() {
      auth().then(user => {
        this.user = user
      })
    },
    components: {
      NavDrawer, AdminBar, FlashMessage
    }
  }
</script>