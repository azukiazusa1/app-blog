<template>
  <article-list :date="new Date($route.params.date)"></article-list>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import { mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'archive-list',
  created() {
    this.setMetaInfo({
      title: `アーカイブ - ${this.formatedDate}`
    })
    this.clearArticles()
  },
  methods: {
    ...mapMutations(['clearArticles']),
  },
  computed: {
    formatedDate() {
      return moment(this.$route.params.date).format('YYYY年MM月')
    }
  },
  watch: {
    $route() {
      this.loading = false
      this.clearArticles()
      this.setMetaInfo({
        title: `アーカイブ - ${this.formatedDate}`
      })
    }
  },
  components: {
    ArticleList
  }
}
</script>
