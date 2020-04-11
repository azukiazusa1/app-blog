<template>
  <div>
    <v-app-bar
      color="red accent-2"
      dark
      app
    >
      <v-toolbar-title>ダッシュボード</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :offset-y=true>
        <template v-slot:activator="{ on }">
          <v-list-item-avatar v-on="on">
            <v-img :src="user.photoURL" :alt="user.displayName"></v-img>
          </v-list-item-avatar>
        </template>
        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title @click="logout">ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { logout } from '@/plugins/auth'
export default {
  props: {
    user: Object
  },
  methods: {
    logout() {
      logout()
        .then(() => {this.$router.push({name: 'login'})})
        .catch(e => console.error(e))
    }
  }
}
</script>