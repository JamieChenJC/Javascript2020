<template>
  <header class="header">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white shadow ">
      <a class="navbar-brand" href="#/admin/products">
          <img src="../../assets/logo.png" alt="Coffeein" style="width:167px">
      </a>
        <a class="ml-auto text-dark" href="#" @click="toFron()">回前台</a>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toFron() {
      // 清空 Authorization
      this.$http.defaults.headers.Authorization = '';
      // 返回前台
      this.$router.push('/');
    },
  },
};
</script>
