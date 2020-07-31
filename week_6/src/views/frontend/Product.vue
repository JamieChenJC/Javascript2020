<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>這裡是前台商品明細</h2>
      {{product.title}}
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      product: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得內容
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的產品資料
      this.product = result.data.data;
    }).catch(() => { // err
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
