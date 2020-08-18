<template>
  <div>
    <table class="table table-striped mt-5">
      <thead class="thead-dark">
        <tr>
          <th>下單時間</th>
          <th>購買項目</th>
          <th>付款方式</th>
          <th>訂單金額</th>
          <th>是否付款</th>
          <th>顧客資料</th>
        </tr>
      </thead>
      <tr v-for="(item) in orders" :key="item.id">
        <td>{{item.created.datetime}}</td>
        <td>
          <ul class="list-unstyled">
            <li
              v-for="(product, i) in item.products"
              :key="i"
            >
              {{ product.product.title }} 數量：{{ product.quantity }}
              {{ product.product.unit }}
            </li>
          </ul>
        </td>
        <td>{{item.amount}}</td>
        <td>{{item.payment}}</td>
        <td>
          <div class="custom-control custom-switch">
              <input :id="item.id"
                      v-model="item.paid"
                      type="checkbox"
                      class="custom-control-input"
                      @change="updatePaid(item)">
                <label class="custom-control-label"
                      :for="item.id">
                <strong v-if="item.paid"
                        class="text-success">已付款</strong>
                <span v-else
                      class="text-muted">未付款</span>
                </label>
            </div>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm mr-1"
            @click="Action('Edit',item)">
            <i class="fas fa-search"></i>查看
          </button>
        </td>
      </tr>
    </table>

    <!-- 分頁 -->
    <Pagination
    :pagination="pagination"
    @emitPages="getOrders" />

    <OrderModel
    ref='orderModel'/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModel from '@/components/dashboard/OrderModel.vue';

export default {
  components: {
    Pagination,
    OrderModel,
  },
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}&paged=10`;
      this.$bus.$emit('setLoading');
      this.$http.get(url).then((result) => {
        this.orders = result.data.data;
        this.pagination = result.data.meta.pagination;
      }).catch(() => {
        this.$toast.error('無法取得資料');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
    updatePaid(item) {
      this.$bus.$emit('setLoading');

      let url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;

      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }

      this.$http.patch(url, item.id).then(() => {
        this.$toast.success('付款狀態修改成功');
        this.getOrders();
      }).catch(() => {
        this.$toast.error('付款狀態修改失敗');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
    Action(action, item) { // 按鈕動作
      this.tempData = item;
      switch (action) {
        case 'Edit': // 修改資料
          // 使用 refs 觸發子元件方法
          this.$refs.orderModel.getOrderDetails(item.id); // 透過商品ID取得詳細資料進行修改
          break;
        default:
          break;
      }
    },
  },
};
</script>
