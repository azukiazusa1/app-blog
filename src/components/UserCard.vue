<template>
  <v-card>
    <v-card-title><v-btn icon><v-icon>fas fa-user</v-icon></v-btn>Author</v-card-title>
    <v-skeleton-loader
      type="list-item-avatar-two-line"
      class="mx-auto"
      v-if="loading"
    ></v-skeleton-loader>
      <v-card-text color="error" v-else-if="error">
        ユーザー情報の取得に失敗しました。
      </v-card-text>
    <template v-else>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL" :alt="user.displayName"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ user.displayName }}</v-list-item-title>
      </v-list-item>
      <v-card-text>
        {{ user.profile }}
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'user-card',
  props: {
    user: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    }
  }
}
</script>