<template>
  <v-card outlined min-width="100%">
    <v-row>
      <v-col cols=3 v-if="article.thumbnail">
        <v-img
          :src="article.thumbnail"
          alt="サムネイル"
          height="100"
          width="100"
        >
        </v-img>
      </v-col>
      <v-col cols=9>
        <v-card-title>
          {{ article.title }}
        </v-card-title>
        <v-card-text>
          <formated-date :date="article.created.seconds * 1000"></formated-date>
          <v-btn :href="`/article/${article.id}`" target="_blank" icon>
            <v-icon small color="light-blue">fas fa-external-link-alt</v-icon>
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FormatedDate from '@/components/FormatedDate'

export default {
  name: 'small-card-list',
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
