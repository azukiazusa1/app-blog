<template>
  <v-icon 
    @click="toggleDark"
    :color="getColor"
  >fas fa-moon</v-icon>
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
      console.log(this.$vuetify.theme.dark)
      return this.$vuetify.theme.dark ? 'deep-purple accent-4' : ''
    }
  }
}
</script>