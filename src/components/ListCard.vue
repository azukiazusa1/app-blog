<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-text>
        <v-card-title>
          {{ article.title }}
        </v-card-title>
        <p>{{ createdTime }}</p>
        <div class="text-truncate">
          {{ article.body }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import moment from 'moment'
export default {
 props: {
   article: {
     type: Object,
     required: true
   }
 },
 computed: {
   createdTime: function () {
     return moment(this.article.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   }
 }
}
</script>