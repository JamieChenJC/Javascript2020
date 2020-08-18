<template>
  <div class="home">
    <Header />
    <section style="margin-top: 100px;">
        <Sidebar :token="token"/>
        <!-- 內容區塊 -->
        <div style="margin-left: 200px;" >
            <main class=" mr-5">
              <router-view :token="token" v-if="checkStatus" />
            </main>
        </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/dashboard/Header.vue';
import Sidebar from '@/components/dashboard/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar,
  },
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
      this.$bus.$emit('setLoading');
      // 呼叫API確認cookie是否有效
      this.$http.post(url, { api_token: this.token }).then((response) => {
        this.checkStatus = response.data.success;
      }).finally(() => {
        if (this.checkStatus !== true) {
          // 清除cookie
          document.cookie = 'token=;expires=; path=/';
          this.$http.defaults.headers.Authorization = '';
          // 導回登入頁面
          this.$router.push('/');
        }
        // 隱藏Loging...
        this.$bus.$emit('setLoading');
      });
    } else {
      // 清除cookie
      document.cookie = 'token=;expires=; path=/';
      this.$http.defaults.headers.Authorization = '';
      // 導回登入頁面
      this.$router.push('/');
    }
  },
};
</script>
