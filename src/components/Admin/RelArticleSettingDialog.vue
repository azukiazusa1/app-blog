<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" class="ma-5" v-on="on">
        <v-icon>fas fa-link</v-icon>
        関連記事の設定
      </v-btn>
    </template>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="red"
    ></v-progress-circular>
    <v-card v-else>
      <v-card-title>
        関連記事の設定
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>fas fa-question-circle</v-icon>
            </v-btn>
          </template>
          <span>関連記事に設定するには、記事一覧からドラッグアンドドロップしてください。</span>
        </v-tooltip>
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols=6>
            <v-text-field
              v-model="keyword"
              label="タイトルで検索"
              append-icon="fas fa-search"
            ></v-text-field>
          </v-col>
          <v-col cols=3>
            <v-checkbox
              v-model="isTag"
              label="同じタグを使用している記事"
            >
            </v-checkbox>
          </v-col>
          <v-col cols=3>
            <v-checkbox
              v-model="isTerm"
              label="近い時期に作成された記事"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=6>
            <v-card-subtitle>記事一覧</v-card-subtitle>
            <v-list
              max-height="600px"
              class="overflow-y-auto"
            >
              <draggable :list="filteredArticles" group="list">
                <v-list-item v-for="article in filteredArticles" :key="article.id">
                  <small-list-card :article="article"></small-list-card>
                </v-list-item>
              </draggable>
            </v-list>
          </v-col>
          <v-col cols=6>
              <v-card-subtitle>関連記事</v-card-subtitle>
              <draggable
                :list="relArticles"
                :group="{ name: 'list', pull: false }"
                @change="add"
              >
                <v-list
                  color="grey lighten-3"
                  min-height="600px"
                  max-height="600px"
                  class="overflow-y-auto"
                >
                  <draggable
                  :list="relArticles"
                  :group="{ name: 'list', put: false }"
                  @change="remove"
                >
                    <v-list-item v-for="article in relArticles" :key="article.id">
                      <small-list-card :article="article"></small-list-card>
                    </v-list-item>
                  </draggable>
                </v-list>
              </draggable>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Draggable from 'vuedraggable'
import SmallListCard from '@/components/SmallListCard'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'rel-article-setting-dialog',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      loading: true,
      relArticles: [],
      keyword: '',
      isTag: false,
      isTerm: false
    }
  },
  async created () {
    await this.bindAllArticles()
    await this.bindRelArticles(this.article.id)
    this.loading = false
    this.relArticles = [...this.getRelArticles]
  },
  methods: {
    ...mapActions(['bindAllArticles']),
    ...mapActions('relArticles', ['bindRelArticles', 'addRelArticle', 'removeRelArticle']),
    add (e) {
      this.addRelArticle({
        articleId: this.article.id,
        relArticle: e.added.element
      })
    },
    remove (e) {
      this.removeRelArticle({
        articleId: this.article.id,
        relArticle: e.removed.element
      })
    }
  },
  computed: {
    ...mapGetters(['getAllArticles']),
    ...mapGetters('relArticles', ['getRelArticles']),
    filteredArticles () {
      let result
      result = _.chain(this.getAllArticles)
        .reject({ id: this.article.id })
        .differenceBy(this.relArticles, 'id')
        .value()

      if (this.keyword) {
        result = result.filter(v => v.title.includes(this.keyword))
      }

      if (this.isTag) {
        result = result.filter(v => _.intersection(v.tags, this.article.tags).length !== 0)
      }

      if (this.isTerm) {
        const date = moment(this.article.created.seconds * 1000)
        const start = date.subtract(1, 'months').format()
        const end = date.add(2, 'months').format()
        result = result.filter(v => {
          console.log(moment(v.created.seconds * 1000))
          return moment(v.created.seconds * 1000).isBetween(start, end)
        })
      }

      return result
    }
  },
  components: {
    Draggable,
    SmallListCard
  }
}
</script>
