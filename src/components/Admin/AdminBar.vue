<template>
  <div>
    <v-app-bar
      color="red accent-2"
      dark
      app
    >
      <v-toolbar-title>
        <router-link class="title-link white--text headline font-weight-bold" to="/admin">ダッシュボード</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :offset-y=true>
        <template v-slot:activator="{ on }">
          <v-skeleton-loader
            type="avatar"
            class="mx-auto"
            v-if="getLoading"
          ></v-skeleton-loader>
          <v-list-item-avatar v-on="on">
            <v-img :src="getUser.photoURL" :alt="getUser.displayName"></v-img>
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
import { mapGetters } from 'vuex'
export default {
  methods: {
    logout() {
      logout()
        .then(() => {this.$router.push({name: 'login'})})
        .catch(e => console.error(e))
    }
  },
  computed: {
    ...mapGetters('user', ['getUser', 'getLoading'])
  }
}
</script>