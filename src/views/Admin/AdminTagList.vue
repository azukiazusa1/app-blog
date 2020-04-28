<template>
  <v-card>
    <v-card-title class="headline">タグ一覧</v-card-title>
    <v-card-text>
      編集するタグを選択してください。
      <v-divider></v-divider>
      <tag-info-list :tags="getBindTags" link="admin/tags"></tag-info-list>
    </v-card-text>
  </v-card>
</template>

<script>
import TagInfoList from '@/components/TagInfoList'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'admin-tag-list',
  created () {
    this.setMetaInfo({
      title: 'タグ一覧'
    })
    this.bindTags()
  },
  methods: {
    ...mapActions('tags', ['bindTags'])
  },
  computed: {
    ...mapGetters('tags', ['getBindTags'])
  },
  components: {
    TagInfoList
  }
}
</script>
