<template>
  <v-container fluid>
    <v-row>
      <v-col 
        cols=12 md=3
        v-for="(link, brand) in links"
        :key="brand"
      >
        <v-btn 
          text
          :href="link"
          target="_blan"
        >
          <v-icon left :color="brand">{{ brandIcon(brand) }}</v-icon>
          <span class="text-capitalize">{{ brand }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'brand-icon-list',
  props: {
    links: {
      type: Object,
      required: true
    },
  },
  computed: {
    brandIcon() {
      return brand => {
        if (brand === 'qiita') {
          return 'fas fa-circle'
        }
        return `fab fa-${brand}`
      }
    }
  }
}
</script>