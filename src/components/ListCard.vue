<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto"
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
    >
      <v-row>
        <v-col md=3 sm=12 v-if="article.thumbnail">
          <router-link :to="showPath">
            <v-img
              :src="article.thumbnail"
              alt="サムネイル"
            >
            </v-img>
          </router-link>
        </v-col>
          <v-col md=8 sm=12>
            <v-card-title>
              <router-link :to="showPath" class="text--primary">
              {{ article.title }}
              </router-link>
            </v-card-title>
            <v-card-text>
              <formated-date :date="article.created.toMillis()"></formated-date>
              <v-btn icon><v-icon size="small">fas fa-tags</v-icon></v-btn>
              <tag-list :tags="article.tags"></tag-list>
              <div class="text--primary">
                {{ article.overview }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text>
                <router-link :to="showPath">Read More</router-link>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import TagList from '@/components/TagList'
import FormatedDate from '@/components/FormatedDate'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    showPath () {
      return `/article/${this.article.id}`
    }
  },
  components: {
    TagList,
    FormatedDate
  }
}
</script>
