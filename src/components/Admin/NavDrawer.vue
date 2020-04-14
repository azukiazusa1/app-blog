<template>
  <v-navigation-drawer
    color="grey darken-3"
    app
    permanent
    expand-on-hover
    dark
    >
      <v-divider></v-divider>

      <v-list dense>
        <nav-list-item
          title="ホーム"
          icon="fas fa-home"
          link="/admin/"
        ></nav-list-item>
        <nav-list-item
          title="記事を書く"
          icon="fas fa-edit"
          @onClick="newArticle"
        ></nav-list-item>
        <nav-list-item
          title="記事の管理"
          icon="fas fa-newspaper"
          link="/admin/articles"
        ></nav-list-item>
        <nav-list-item
          title="下書き一覧"
          icon="far fa-sticky-note"
          link="/admin/drafts"
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
import { mapActions, mapGetters } from 'vuex'

export default {

  methods: {
    ...mapActions(['createArticle', 'flash/setFlash']),
    newArticle() {
      this.createArticle(this.getUser.uid)
        .then(docRef => {
          this.$router.push({name: 'article-edit', params: { id: docRef.id }})
        })
        .catch(() => {
          this['flash/setFlash']({
            message: '新規記事の作成に失敗しました。',
            type: 'error'
          })
        })
    }
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  components: {
    NavListItem
  }
}
</script>