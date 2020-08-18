<template>
    <div class="div-signin">
      <form class="form-signin text-center"  @submit.prevent="signin">
        <img class="mb-4" src="../../assets/logo.png" alt="" style="width:250px">
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
        <button class="btn btn-lg btn-primary btn-block"  type="submit">登入</button>
        <p class="mt-5 mb-3 text-muted">© 2020~∞ JavaScript-2020夏季作品實戰班</p>
        <!-- <a class="nav-link" href="#" @click="toFron()">返回前台</a> -->
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  created() {
    this.$bus.$emit('setLoading');
    const url = `${process.env.VUE_APP_APIPATH}/auth/check`;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

    if (token !== '') {
      this.$http.post(url, { api_token: token }).then((response) => {
        if (response.data.success === true) {
          this.$router.push('/admin/products');
        }
      }).catch(() => {
        // 清除cookie
        document.cookie = 'token=;expires=; path=/';
        this.$http.defaults.headers.Authorization = '';
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    } else {
      this.$bus.$emit('setLoading');
    }
  },
  methods: {
    toFron() {
      this.$router.push('/');
    },
    signin() {
      const url = `${process.env.VUE_APP_APIPATH}/auth/login`;
      this.$bus.$emit('setLoading');
      this.$http.post(url, this.user).then((response) => {
        const { token } = response.data;
        const { expired } = response.data;
        // 將取回的token寫入 cookie 並expires 設定api回應的時間
        document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
        this.$toast.success('登入成功');
        this.$router.push('/admin/products');
      }).catch(() => {
        this.$toast.error('登入失敗，請確認帳號密碼是否輸入錯誤');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.div-signin {
    height: 100%;
    display: flex;
}

.form-signin {
    width: 100%;
    max-width: 350px;
    padding: 15px;
    margin: auto;
}
</style>
