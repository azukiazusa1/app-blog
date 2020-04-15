<template>
  <v-list-item :href="value" target="_blank">
    <v-list-item-icon>
      <v-icon :color="brand" v-if="brand === 'qiita'">fas fa-circle</v-icon>
      <v-icon :color="brand" v-else>{{ `fab fa-${brand}` }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">{{ brand }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'brand-icon-list',
  props: {
    value: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    }
  }
}
</script>