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
                    :error-messages="nameErrors"
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
                    :error-messages="profileErrors"
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
                :error-messages="linkErrors(brand)"
                @input="$v.user.link[brand].$touch()"
                @blur="$v.user.link[brand].$touch()"
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, url } from 'vuelidate/lib/validators'

export default {
  name: 'user-setting',
  data() {
    return {
      user: null,
      fileLoading: 0
    }
  },
  mixins: [validationMixin],
  validations: {
    user: {
      displayName: { required, maxLength: maxLength(50) },
      profile: { maxLength: maxLength(300) },
      link: {
        github: { url },
        qiita: { url },
        twitter: { url },
        facebook: { url },
      }
    },
  },
  created() {
    this.user = this.getUser
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    nameErrors () {
      const errors = []
      if (!this.$v.user.displayName.$dirty) return errors
      !this.$v.user.displayName.required && errors.push('ブログのタイトルは必須です。')
      !this.$v.user.displayName.maxLength && errors.push('タイトルは50文字までです。')
      return errors
    },
    profileErrors() {
      const errors = []
      if (!this.$v.user.profile.$dirty) return errors
      !this.$v.user.profile.maxLength && errors.push('ブログの説明は300文字までです。')
      return errors
    },
    linkErrors() {
      return brand => {
        const errors = []
        if (!this.$v.user.link[brand].$dirty) return errors
        !this.$v.user.link[brand].url && errors.push('リンクはURLの形式で入力してください。')
        return errors
      }
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
    },
    onFileUpload() {

    }
  }
}
</script>