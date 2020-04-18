<template>
  <v-card>
    <v-card-title class="headline">ユーザー情報設定</v-card-title>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols=3>
              <v-row>
                <v-col cols=12>
                  <v-avatar
                    class="profile"
                    size="164"
                  >
                    <v-img
                      :src="user.photoURL"
                      :alt="user.displayName"
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=10>
                  <v-file-input 
                    accept="image/*" 
                    label="Edit" 
                    @change="onFileUpload"
                    dense
                    >
                  </v-file-input>
                </v-col>
                <v-col cols=2>
                  <v-progress-circular
                    v-model="fileLoading"
                    color="primary"
                  ></v-progress-circular>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols=9>
              <v-row>
                <v-col cols=12>
                  <v-text-field
                    v-model="user.displayName"
                    :counter="50"
                    :error-messages="titleErrors"
                    label="ユーザー名"
                    required
                    @input="$v.user.displayName.$touch()"
                    @blur="$v.user.displayName.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols=12>
                  <v-textarea
                    v-model="user.profile"
                    :counter="300"
                    :error-messages="descriptionErrors"
                    label="プロフィール"
                    @input="$v.user.profile.$touch()"
                    @blur="$v.user.profile.$touch()"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-card-subtitle>リンク</v-card-subtitle>
          <v-row>
            <v-col cols=12 v-for="(link, brand) in user.link" :key="brand">
              <v-text-field
                :label="brand"
                :prepend-icon="`fab fa-${brand}`"
                v-model="user.link[brand]"
                :color="brand"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mr-4" @click="onSubmit" color="primary">更新</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user-setting',
  data() {
    return {
      user: null,
      fileLoading: 0
    }
  },
  created() {
    this.user = this.getUser
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    onSubmit() {

    },
    onFileUpload() {

    }
  }
}
</script>