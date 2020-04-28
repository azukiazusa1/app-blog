<template>
  <v-container>
    <v-row v-if="isEmpty">
      <v-col>
        記事が見つかりませんでした。
      </v-col>
    </v-row>
    <v-row v-if="getArticles">
      <v-col cols=12 v-for="article in getArticles" :key="article.id">
        <list-card :article="article"></list-card>
      </v-col>
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
</template>

<script>
import ListCard from '@/components/ListCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'article-list',
  props: {
    tag: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: null
    }
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.clearArticles()
  },
  methods: {
    ...mapActions(['fetchArticles']),
    ...mapMutations(['clearArticles']),
    onIntersect (entries, observer, isIntersecting) {
      if (this.loading || !isIntersecting || this.isFinish) return
      this.loading = true
      this.fetchArticles({
        lastDate: this.getLastDate,
        tag: this.tag,
        month: this.date
      })
        .then(() => this.loading = false)
    }
  },
  computed: {
    ...mapGetters(['getArticles', 'getLastDate', 'isFinish']),
    isEmpty () {
      return this.isFinish && this.getArticles.length === 0
    }
  },
  components: {
    ListCard
  }
}
</script>
