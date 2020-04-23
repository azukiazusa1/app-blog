<template>
  <v-card>
    <v-card-title class="headline">タグ一覧</v-card-title>
    <v-card-text>
      編集するタグを選択してください。
      <v-divider></v-divider>
      <tag-list :tags="flatTags" link="admin/tags"></tag-list>
    </v-card-text>
  </v-card>
</template>

<script>
import TagList from '@/components/TagList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'admin-tag-list',
  created() {
    this.setMetaInfo({
      title: 'タグ一覧'
    })
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