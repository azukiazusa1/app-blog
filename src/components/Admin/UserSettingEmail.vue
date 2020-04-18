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
          >
          </email-input-field>
        </v-col>
        <v-col>
          <v-text-field
            label="現在のパスワード"
            type="password"
            v-model="password"
            hint="メールアドレスを変更するには、再認証が必要です。"
            persistent-hint
            required
          >
          </v-text-field>
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
import emailInputField from '@/components/EmailInputField'
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
    }
  },
  async created() {
    this.user = await auth()
  },
  methods: {
    ...mapActions(['flash/setFlash']),
    async onSubmit() {
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
    emailInputField
  }
}
</script>