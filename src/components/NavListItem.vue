<template>
  <v-list-item link class="py-5" @click="$emit('onClick')" :to="link">
    <v-list-item-icon>
      <v-icon>{{ icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    title: String,
    link: String,
    icon: String
  }
}
</script>
