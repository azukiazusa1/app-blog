<template>
  <v-container>
    <v-row>
      <v-col cols=12 v-if="getArticles">
        <v-card v-for="article in getArticles" :key="article.id">
          {{ article.title }}
        </v-card>
      </v-col>
      <v-col cols="12" v-if="loading">
          <v-progress-circular
            indeterminate
            color="red"
          ></v-progress-circular>
      </v-col>
      <v-col sm="12" md="6">
        <v-card>
          aaa
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'blog-home',
  data() {
    return {
      loading:true
    }
  },
  created() {
    this.bindArticles()
    .then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['bindArticles']),
  },
  computed: {
    ...mapGetters(['getArticles'])
  }
}
</script>
