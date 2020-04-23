<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mt-5">
          <v-card-title class="justify-center">
            <h1>
              <p class="display-4 font-italic">About</p>
              <p class="title">{{ getBlogInfo.title }}</p>
            </h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text--primary">
            {{ getBlogInfo.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <user-card 
          :user={} 
          :loading="loading" 
          :error="error"
          v-if="loading"
        ></user-card>
        <span v-for="user in getUsers" :key="user.id">
          <user-card 
            :user="user" 
            :loading="loading" 
            :error="error"
          ></user-card>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import UserCard from '@/components/UserCard'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'about-page',
  data() {
    return {
      loading: true,
      error: false
    }
  },
  created() {
    this.setMetaInfo({
      title: `${this.getBlogInfo.title}とは`
    })
    this.bindUsers().then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters('blog', ['getBlogInfo']),
    ...mapGetters('user', ['getUsers'])
  },
  methods: {
    ...mapActions('user', ['bindUsers'])
  },
  components: {
    UserCard
  }
}
</script>