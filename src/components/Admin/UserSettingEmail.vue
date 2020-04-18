<template>
  <v-card>
    <v-card-title class="title">メールアドレス</v-card-title>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        ログイン時に使用するメールアドレスを設定します。
        <v-col>
          <v-text-field
            label="現在のメールアドレス"
            :value="user.email"
            readonly
            outlined
          >
          </v-text-field>
        </v-col>
        <v-col>
          <email-input-field
            label="新しいメールアドレス"
            :email.sync="email"
            :touch="touch"
          >
          </email-input-field>
        </v-col>
        <v-col>
          <password-input-field
            label="現在のパスワード"
            :password.sync="password"
            hint="メールアドレスを変更するには、再認証が必要です。"
            :touch="touch"
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
import EmailInputField from '@/components/EmailInputField'
import PasswordInputField from '@/components/PasswordInputField'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { auth, reAuth } from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  name: 'user-setting-email',
  data() {
    return {
      user: {
        email: '',
        passowrd: ''
      },
      loading: false,
      email: '',
      password: '',
      touch: false
    }
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
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
        await this.user.updateEmail(this.email)
        this['flash/setFlash']({
          message: 'メールアドレスの変更に成功しました。'
        })
      } catch(e) {
        this['flash/setFlash']({
          message: `
            メールアドレスの変更に失敗しました。
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
    EmailInputField,
    PasswordInputField
  }
}
</script>