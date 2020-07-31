<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>訂單列表</h2>
      <table>
        <thead>
          <tr>
            <th>訂單金額</th>
            <th>付款方式</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{item.amount}}</td>
          <td>{{item.payment}}</td>
          <td>{{item.paid}}</td>
          <td><router-link :to="`/admin/Order/${item.id}`" >訂單明細</router-link></td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
  props: ['token'],
  data() {
    return {
      isLoading: true,
      orders: [],
    };
  },
  mounted() {
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得訂單資料
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的訂單資料
      this.orders = result.data.data;
    }).catch(() => {
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
