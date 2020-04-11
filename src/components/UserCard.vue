<template>
  <v-card>
    <v-card-title>Author</v-card-title>
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
          <v-img :src="getUser.photoURL" :alt="getUser.displayName"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ getUser.displayName }}</v-list-item-title>
      </v-list-item>
      <v-card-text>
        {{ getUser.profile }}
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('user')

export default {
  name: 'user-card',
  data() {
    return {
      loading: true,
      error: false
    }
  },
  props: {
    uid: {
      type: String,
      required: true
    }
  },
  created() {
    this.bindUserById(this.uid)
      .then(() => {
        this.loading = false
      })
      .catch(() => this.error = true)
  },
  methods: {
    ...mapActions(['bindUserById'])
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>