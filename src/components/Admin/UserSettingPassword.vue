<template>
  <v-card>
    <v-card-title class="title">パスワード変更</v-card-title>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        <v-col>
          <password-input-field
            label="現在のパスワード"
            :password.sync="password"
            hint="パスワードを変更するには、再認証が必要です。"
            :touch="touch"
          >
          </password-input-field>
        </v-col>
        <v-col>
          <password-input-field
            label="新しいパスワード"
            :password.sync="newPassword"
            :touch="touch"
            confirm
            :confirmPassword.sync="confirmPassword"
          >
          </password-input-field>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mr-4" @click="onSubmit" color="primary">更新</v-btn>
        <v-btn icon v-if="loading">
          <v-icon>fa fa-spinner fa-spin</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import PasswordInputField from '@/components/PasswordInputField'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { auth, reAuth } from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  name: 'user-setting-password',
  data() {
    return {
      user: {
        email: '',
        passowrd: ''
      },
      loading: false,
      password: '',
      newPassword: '',
      confirmPassword: '',
      touch: false
    }
  },
  mixins: [validationMixin],
  validations: {
    password: { required },
    newPassword: { required, minLength: minLength(6)},
    confirmPassword: { 
      required,
      samaAs: sameAs(function() {
        return this.newPassword
      })
    }
  },
  async created() {
    this.user = await auth()
  },
  methods: {
    ...mapActions(['flash/setFlash']),
    async onSubmit() {
      this.touch = true
      if (this.$v.$invalid) return
      try {
        this.loading = true
        const credential = await reAuth(this.user.email, this.password)
        await this.user.reauthenticateWithCredential(credential)
        await this.user.updatePassword(this.newPassword)
        this['flash/setFlash']({
          message: 'パスワードの変更に成功しました。'
        })
      } catch(e) {
        this['flash/setFlash']({
          message: `
            パスワードの変更に失敗しました。
            message: ${e.message}
          `,
          type: 'error'
        })
      } finally {
        this.loading = false
      }
    }
  },
  components: {
    PasswordInputField
  }
}
</script>