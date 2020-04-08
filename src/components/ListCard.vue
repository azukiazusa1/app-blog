<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title>
        <router-link to="/" class="text--primary">
        {{ article.title }}
        </router-link>
      </v-card-title>
      <v-card-text>
        <v-btn icon><v-icon size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
        <v-btn icon><v-icon size="small">fas fa-tags</v-icon></v-btn>
        <v-chip v-for="(tag, index) in article.tags" :key="index"
          class="ma-2"
          small
          to="/"
        >
          {{ tag }}
        </v-chip>
        <div class="text-truncate text--primary">
          {{ article.body }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
        >
          <router-link to="/">Learn More</router-link>
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
 created() {
   console.log(this.article.tags)
 },
 computed: {
   createdTime: function () {
     return moment(this.article.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   }
 }
}
</script>