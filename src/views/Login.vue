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
                      :touch="touch"
                    >
                  </email-input-field>
                  <password-input-field
                    label="Password"
                    icon="fa fa-lock"
                    :password.sync="password"
                    :touch="touch"
                  >
                  </password-input-field>
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
import PasswordInputField from '@/components/PasswordInputField'
import FlashMessage from '@/components/FlashMessage'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { login } from '@/plugins/auth'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      redirect: this.$route.query.redirect || '/admin',
      loading: false,
      touch: false
    }
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required }
  },
  created () {
    this.setMetaInfo({
      title: 'ログイン'
    })
  },
  methods: {
    submit () {
      this.touch = true
      if (this.$v.$invalid) return
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
    },
    ...mapActions('flash', [
      'setFlash'
    ])
  },
  components: {
    EmailInputField,
    PasswordInputField,
    FlashMessage
  }
}
</script>
