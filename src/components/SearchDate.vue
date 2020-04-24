<template>
    <v-menu :offset-y=true>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fas fa-calendar-alt</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-date-picker
            v-model="picker"
            type="month"
            locale="zh-ja"
          ></v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  name: 'search-date',
  data() {
    return {
      picker: ''
    }
  }
}
</script>