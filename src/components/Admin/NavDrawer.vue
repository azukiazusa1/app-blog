<template>
  <v-navigation-drawer
    color="grey darken-3"
    app
    permanent
    fixed
    dark
    >
      <v-divider></v-divider>

      <v-list dense>
        <nav-list-item
          title="記事を書く"
          icon="fas fa-edit"
          @onClick="createArticle"
        ></nav-list-item>
        <nav-list-item
          title="記事の管理"
          icon="fas fa-newspaper"
          link="/admin/articles"
        ></nav-list-item>
        <nav-list-item
          title="ユーザー情報変更"
          icon="fas fa-user"
          link="/admin/user"
        ></nav-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import NavListItem from '@/components/NavListItem'
export default {
  methods: {
    createArticle() {
      console.log(1)
    }
  },
  components: {
    NavListItem
  }
}
</script>