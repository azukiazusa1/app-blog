<template>
  <v-card>
    {{ article.title }}
  </v-card>
</template>

<script>
import fetchBeforeRouting from '@/mixin/fetchBeforeRouting'

export default {
  name: 'article-edit',
  data() {
    return {
      article: ''
    }
  },
  mixins: [fetchBeforeRouting]
}
</script>