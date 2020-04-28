<template>
  <span>
    <v-chip v-for="(tag, index) in tags" :key="index"
      class="ma-2"
      small
      :to="`/${link}/${tag}`"
    >
      {{ tag }}
    </v-chip>
  </span>
</template>

<script>
export default {
  name: 'tag-list',
  props: {
    tags: {
      type: Array,
      required: true
    },
    link: {
      type: String,
      default: 'tags'
    }
  }
}
</script>
