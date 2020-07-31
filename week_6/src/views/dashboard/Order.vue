<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>這是訂單明細頁</h2>
      <span v-if="isRady"> {{order.user.email}} </span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      isRady: false,
      order: {},
    };
  },
  mounted() {
    const { id } = this.$route.params;
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得訂單資料
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的訂單資料
      this.order = result.data.data;
      this.isRady = true;
    }).catch(() => {
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
