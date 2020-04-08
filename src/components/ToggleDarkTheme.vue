<template>
  <v-btn icon
    @click="toggleDark"
    :color="getColor">
    <v-icon>fas fa-moon</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ToggleDarkTheme',
  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  computed: {
    getColor() {
      return this.$vuetify.theme.dark ? 'deep-purple accent-4' : ''
    }
  }
}
</script>