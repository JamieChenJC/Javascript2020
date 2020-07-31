<template>
    <div>
     <Loading :active.sync="isLoading"></Loading>
      <h2>這是後台產品列表</h2>
      <table>
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>商品描述</th>
          </tr>
        </thead>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.title}}</td>
          <td>{{item.content}}</td>
          <td><router-link :to="`/admin/Product/${item.id}`" >商品明細</router-link></td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      products: [],
    };
  },
  mounted() {
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得產品資料
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的產品資料
      this.products = result.data.data;
    }).catch(() => {
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
