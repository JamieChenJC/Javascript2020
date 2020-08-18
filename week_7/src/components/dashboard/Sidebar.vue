<template>
  <div class="position-fixed backend-menu pl-2">
      <!-- 功能選單 -->
      <ul class="nav flex-column ">
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/products">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/orders">
              <i class="fas fa-file-signature"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/coupons">
              <i class="fas fa-tags"></i>
              優惠券列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/storages">
              <i class="far fa-images"></i>
              圖片儲存列表
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="#" @click.prevent="Logout()">
              <i class="fas fa-sign-out-alt"></i>
              登出
            </a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: String,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    Logout() {
      this.$bus.$emit('setLoading');
      const url = `${process.env.VUE_APP_APIPATH}/auth/logout`;
      this.$http.post(url, { api_token: this.token }).then(() => {
        this.$toast.success('登出成功');
        // 清空 Authorization
        this.$http.defaults.headers.Authorization = '';
        // 清除cookie
        document.cookie = 'token=;expires=; path=/';
        // 導回登入頁面
        this.$router.push('/');
      }).catch(() => {
        // 清除cookie
        document.cookie = 'token=;expires=; path=/';
        this.$http.defaults.headers.Authorization = '';
      }).finally(() => {
        // 隱藏Loging...
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.backend-menu .nav-link.active  {
    border-left: .25rem solid #f5a637;
}

.backend-menu .nav-link:hover {
    color: #f5a637 !important;
    font-weight: 700;
}

.nav-link {
    display: block;
    padding: 1rem 1rem;
}
</style>
