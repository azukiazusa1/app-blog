<template>
  <v-card>
    <v-card-title class="headline">タグ一覧</v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <tag-list :tags="flatTags"></tag-list>
    </v-card-text>
  </v-card>
</template>

<script>
import TagList from '@/components/TagList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'admin-tag-list',
  created() { 
    this.bindTags() 
  },
  methods: {
    ...mapActions('tags', ['bindTags']),
  },
  computed: {
    ...mapGetters('tags', ['getBindTags']),
    flatTags() {
      if (!this.getBindTags) return
      return this.getBindTags.map(tag => tag.name)
    }
  },
  components: {
    TagList
  }
}
</script>