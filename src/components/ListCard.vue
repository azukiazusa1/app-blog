<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-card-title>
        <router-link :to="showPath" class="text--primary">
        {{ article.title }}
        </router-link>
      </v-card-title>
      <v-card-text>
        <v-btn icon><v-icon size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
        <v-btn icon><v-icon size="small">fas fa-tags</v-icon></v-btn>
        <tag-list :tags="article.tags"></tag-list>
        <div class="text-truncate text--primary">
          {{ article.body }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text>
          <router-link :to="showPath">Read More</router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import TagList from '@/components/TagList.vue'
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
   },
   showPath() {
     return `/article/${this.article.id}`
   }
 },
 components: {
   TagList
 }
}
</script>