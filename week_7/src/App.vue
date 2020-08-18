<template>
  <div id="app">
    <Loading :active.sync="isLoading" />
    <router-view/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    // ('對應傳送端的emit方法','接收的參數')
    this.$bus.$on('setLoading', () => {
      this.setLoading();
    });
  },
  methods: {
    setLoading() {
      this.isLoading = !this.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';

html, body {
    height : 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height : 100%;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.v-notices {
  z-index: 99999;
}

.v-toast{
  max-width: 300px;
}
</style>
