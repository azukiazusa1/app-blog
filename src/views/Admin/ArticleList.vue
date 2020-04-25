<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">記事一覧</v-card-title>
            <v-card-text>
              投稿数
              <v-btn icon v-if="loading">
                <v-icon>fa fa-spinner fa-spin</v-icon>
              </v-btn>
              <v-avatar
                size="24"
                color="primary"
                v-else
              >
                <span class="white--text font-weight-bold">{{ getArticlesCount }}</span>
              </v-avatar>
            </v-card-text>
            <v-container fluid>
              <template v-if="loading">
                <v-skeleton-loader type="list-item-two-line" v-for="n in 5" :key="n"></v-skeleton-loader>
              </template>
              <v-row v-else>
                <v-expansion-panels
                  v-for="article in getAllArticles"
                  :key="article.id"
                >
                  <list-panel :article="article"></list-panel>
                </v-expansion-panels>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ListPanel from '@/components/ListPanel'
import { auth } from '@/plugins/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'article-list',
  data() {
    return {
      loading: true
    }
  },
  async created() {
    this.setMetaInfo({
      title: '記事の管理'
    })
    const user = await auth()
    this.bindArticlesByAuthor(user.uid)
      .then(() => this.loading = false)
  },
  methods: {
    ...mapActions(['bindArticlesByAuthor']),
  },
  computed: {
    ...mapGetters(['getAllArticles', 'getArticlesCount'])
  },
  components: {
    ListPanel
  }
}
</script>