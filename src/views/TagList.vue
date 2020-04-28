<template>
  <v-container>
    <h1 class="headline py-5">タグ一覧</h1>
    <v-divider></v-divider>
    <tag-info-list :tags="getBindTags"></tag-info-list>
  </v-container>
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
