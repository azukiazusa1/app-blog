<template>
  <v-card>
    <v-img
      :src="article.thumbnail"
      alt="サムネイル"
      height="200"
    ></v-img>
    <v-card-title>
      <router-link :to="{ name: 'article-show', params: { id: article.id } }" class="text--primary">
       {{ article.title }}
      </router-link>
    </v-card-title>
    <v-card-text>
      <formated-date :date="article.created.seconds * 1000"></formated-date>
    </v-card-text>
  </v-card>
</template>

<script>
import FormatedDate from '@/components/FormatedDate'

export default {
  name: 'rel-article-card',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {
    FormatedDate
  }
}
</script>
