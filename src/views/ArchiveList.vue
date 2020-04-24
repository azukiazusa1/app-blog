<template>
  <v-container>
    <v-row>
      <v-col class="headline">
        {{ formatedDate }}の記事
      </v-col>
    </v-row>
    <article-list :date="new Date($route.params.date)"></article-list>
  </v-container>
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
