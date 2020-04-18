<template>
  <v-card>
    <v-card-title class="headline">ユーザー情報設定</v-card-title>
    <v-tabs
      v-model="tab"
      class="elevation-2"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#profile">プロフィール</v-tab>
      <v-tab href="#email">メールアドレス</v-tab>
      <v-tab href="#password">パスワード</v-tab>
      <v-tab-item value="profile">
        <user-setting-profile></user-setting-profile>
      </v-tab-item>
      <v-tab-item value="email">
        e-mail
      </v-tab-item>
      <v-tab-item value="password">
        password
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import UserSettingProfile from '@/components/Admin/UserSettingProfile'

export default {
  name: 'user-setting',
  data() {
    return {
      tab: null
    }
  },
  components: {
    UserSettingProfile,
  }
}
</script>