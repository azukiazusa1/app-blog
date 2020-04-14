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
import { auth } from '@/plugins/auth'
import AdminBar from '@/components/Admin/AdminBar'
import NavDrawer from '@/components/Admin/NavDrawer'
import { mapActions } from 'vuex'

export default {
  created() {
    auth().then(user => {
      this.bindUserById(user.uid)
    })
  },
  methods: {
    ...mapActions('user', ['bindUserById']),
    ...mapActions(['flash/setFlash']),
  },
  components: {
    NavDrawer, AdminBar, FlashMessage
  }
}
</script>