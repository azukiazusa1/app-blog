<template>
  <v-container>
    <v-row>
      <v-col class="headline">
        {{ formatedDate }}の記事
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!loading">
        記事数：{{ getArchive.articleCount }}
      </v-col>
    </v-row>
    <article-list :date="new Date($route.params.date)"></article-list>
  </v-container>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'archive-list',
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.setMetaInfo({
      title: `アーカイブ - ${this.formatedDate}`
    })
    this.clearArticles()
    this.bindArchiveByMonth(this.$route.params.date)
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapMutations(['clearArticles']),
    ...mapActions('archives', ['bindArchiveByMonth'])
  },
  computed: {
    ...mapGetters('archives', ['getArchive']),
    formatedDate () {
      return moment(this.$route.params.date).format('YYYY年MM月')
    }
  },
  watch: {
    $route () {
      this.loading = true
      this.clearArticles()
      this.setMetaInfo({
        title: `アーカイブ - ${this.formatedDate}`
      })
      this.bindArchiveByMonth(this.$route.params.date)
        .then(() => {
          this.loading = false
        })
    }
  },
  components: {
    ArticleList
  }
}
</script>
