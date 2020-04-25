<template>
  <v-card>
    <v-card-title><v-btn icon><v-icon>fas fa-user</v-icon></v-btn>Author</v-card-title>
    <v-skeleton-loader
      type="list-item-avatar-two-line"
      class="mx-auto"
      v-if="loading"
    ></v-skeleton-loader>
    <v-card-text color="error" v-if="error">
      ユーザー情報の取得に失敗しました。
    </v-card-text>
    <template v-else>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="user.photoURL" :alt="user.displayName"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
        </v-list-item>
      </v-list>
        <v-card-text>
          {{ user.profile }}
          <brand-icon-list :links="filteredLink"></brand-icon-list>
        </v-card-text>
    </template>
  </v-card>
</template>

<script>
import BrandIconList from '@/components/BrandIconList'
import { pickBy } from 'lodash'

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
  },
  computed: {
    filteredLink() {
      return pickBy(this.user.link, value => {
        return !!value
      })
    }
  },
  components: {
    BrandIconList
  }
}
</script>