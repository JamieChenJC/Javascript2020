<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>這裡是購物車</h2>
        <div v-if="!isLoading">
          <div v-if="cart.list.length">
            <table>
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>商品價格</th>
                  <th>數量</th>
                </tr>
            </thead>
              <tr v-for="(item) in cart.list" :key="item.id">
                <td>{{item.product.title}}</td>
                <td>{{item.product.price}}</td>
                <td>{{item.quantity}}</td>
              </tr>
            </table>
            <h3>總金額 {{cart.totalPrice }} </h3>
          </div>
          <div v-else>
              <h2>目前購物車是空的....</h2>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      cart: {
        list: [],
        totalPrice: 0,
      },
    };
  },
  mounted() {
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得內容
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的購物車資料
      this.cart.list = result.data.data;
      this.cart.totalPrice = 0;
      // 累加總金額
      this.cart.list.forEach((item) => {
        this.cart.totalPrice += (item.product.price * item.quantity);
      });
    }).catch(() => { // err
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
