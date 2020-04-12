<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>記事一覧</v-card-title>
              <v-container fluid>
                <v-row v-if="getArticles">
                  <v-expansion-panels
                    v-for="article in getArticles"
                    :key="article.id"
                  >
                    <list-panel :article="article"></list-panel>
                  </v-expansion-panels>
                </v-row>
                <v-row v-if="!isFinish" justify="center">
                  <v-col cols=1>
                    <v-progress-circular
                      indeterminate
                      color="red"
                      v-intersect="onIntersect"
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-container>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ListPanel from '@/components/ListPanel'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'article-list',
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.clearArticles()
  },
  methods: {
    ...mapActions(['fetchArticles']),
    ...mapMutations(['clearArticles']),
    onIntersect(entries, observer, isIntersecting) {
      if (this.loading || !isIntersecting || this.isFinish) return
      this.loading = true
      this.fetchArticles({
        lastDate: this.getLastDate,
        published: true
      })
        .then(() => this.loading = false)
    }
  },
  computed: {
    ...mapGetters(['getArticles', 'getLastDate', 'isFinish'])
  },
  components: {
    ListPanel
  }
}
</script>