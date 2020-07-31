<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>這是登入頁</h2>
      <form id="app" class="form-signin"  @submit.prevent="signin">
        <img class="mb-4" src="logo.png" alt="" style="width:250px">
        <div class="form-group">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email"
            id="inputEmail"
            class="form-control"
            placeholder="請輸入信箱"
            autofocus=""
            v-model="user.email"
            required>
        </div>
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password"
            id="inputPassword"
            class="form-control"
            placeholder="請輸入密碼"
            v-model="user.password"
            required>
        </div>
        <button class="btn btn-lg btn-primary btn-block"  type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">© 2020~∞ JavaScript-2020夏季作品實戰班</p>
        <a class="nav-link" href="#" @click="toFron()">返回前台</a>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  created() {
    // 顯示Loging...
    this.isLoading = true;
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/auth/check`;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token !== '') {
      // 顯示Loging...
      this.isLoading = true;
      // 呼叫API確認cookie是否有效
      this.$http.post(url, { api_token: token }).then((response) => {
        if (response.data.success === true) {
          this.$router.push('/admin');
        }
      }).catch(() => {
        // 清除cookie
        document.cookie = 'token=;expires=; path=/';
        this.$http.defaults.headers.Authorization = '';
      }).finally(() => {
        // 顯示Loging...
        this.isLoading = false;
      });
    } else {
      // 顯示Loging...
      this.isLoading = false;
    }
  },
  methods: {
    toFron() {
      this.$router.push('/');
    },
    signin() {
      // 宣告API
      const url = `${process.env.VUE_APP_APIPATH}/auth/login`;

      // 顯示Loging...
      this.isLoading = true;
      // 呼叫API進行登入
      this.$http.post(url, this.user).then((response) => {
        // 取得API回應的資料
        const { token } = response.data;
        const { expired } = response.data;
        // 將取回的token寫入 cookie 並expires 設定api回應的時間
        document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
        this.$router.push('/admin');
      }).catch(() => {
        // 錯誤訊息
      }).finally(() => {
        // 隱藏Loging...
        this.isLoading = false;
      });
    },
  },
};
</script>
