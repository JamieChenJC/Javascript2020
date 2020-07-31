<template>
  <div class="home">
    <Loading :active.sync="isLoading"></Loading>
    <div id="nav">
      <a class="nav-link" href="#" @click="toFron()">回前台</a> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/orders">訂單列表</router-link> |
      <router-link to="/admin/coupons">優惠券列表</router-link> |
      <router-link to="/admin/storages">圖片儲存列表</router-link> |
      <a class="nav-link" href="#" @click="Logout()">登出</a>
    </div>
    <router-view :token="token" v-if="checkStatus"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      token: '',
      checkStatus: false,
    };
  },
  created() {
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/auth/check`;
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.Authorization = `Bearer ${this.token}`;
    this.checkStatus = false;

    if (this.token !== '') {
      // 顯示Loging...
      this.isLoading = true;
      // 呼叫API確認cookie是否有效
      this.$http.post(url, { api_token: this.token }).then((response) => {
        this.checkStatus = response.data.success;
      }).finally(() => {
        if (this.checkStatus !== true) {
          // 清除cookie
          document.cookie = 'token=;expires=; path=/';
          this.$http.defaults.headers.Authorization = '';
          // 導回登入頁面
          this.$router.push('/Login');
        }
        // 隱藏Loging...
        this.isLoading = false;
      });
    } else {
      // 清除cookie
      document.cookie = 'token=;expires=; path=/';
      this.$http.defaults.headers.Authorization = '';
      // 導回登入頁面
      this.$router.push('/Login');
    }
  },
  methods: {
    toFron() {
      // 清空 Authorization
      this.$http.defaults.headers.Authorization = '';
      // 返回前台
      this.$router.push('/');
    },
    Logout() {
      // 顯示Loging...
      this.isLoading = true;
      // 清空 Authorization
      this.$http.defaults.headers.Authorization = '';
      // 清除cookie
      document.cookie = 'token=;expires=; path=/';
      // 導回登入頁面
      this.$router.push('/Login');
    },
  },
};
</script>
