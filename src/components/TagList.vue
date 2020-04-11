<template>
  <div>
    <v-chip v-for="(tag, index) in tags" :key="index"
      class="ma-2"
      small
      to="/"
    >
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'tag-list',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>