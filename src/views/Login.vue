  <template>
  <v-app id="inspire">
    <flash-message></flash-message>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-form @submit.prevent="submit">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>ログイン画面</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <email-input-field
                      label="Login"
                      :email.sync="email"
                      icon="fa fa-user"
                    >
                  </email-input-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="fa fa-lock"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn icon v-if="loading">
                    <v-icon>fa fa-spinner fa-spin</v-icon>
                  </v-btn>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EmailInputField from '@/components/EmailInputField'
import FlashMessage from '@/components/FlashMessage'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { login } from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      redirect: this.$route.query.redirect || '/admin',
      loading: false
    }
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('メールアドレスの形式が正しくありません。')
      !this.$v.email.required && errors.push('メールアドレスが入力されていません。')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('パスワードが入力されていません。')
      return errors
    },
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loading = true
        login(this.email, this.password)
          .then(() => this.$router.push(this.redirect))
          .catch(() => {
            this.setFlash({
              message: 'メールアドレスかパスワードが間違っています。',
              type: 'error'
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    ...mapActions('flash', [
      'setFlash'
    ])
  },
  components: {
    EmailInputField,
    FlashMessage
  }
}
</script>