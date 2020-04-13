<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>記事一覧</v-card-title>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'article-list',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.bindAllArticles()
      .then(() => this.loading = false)
  },
  methods: {
    ...mapActions(['bindAllArticles']),
  },
  computed: {
    ...mapGetters(['getAllArticles'])
  },
  components: {
    ListPanel
  }
}
</script>