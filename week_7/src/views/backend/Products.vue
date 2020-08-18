<template>
    <div>
      <div class="text-right mb-3">
        <button type="button" class="btn btn-primary" @click="Action('Add')"> 建立新的產品</button>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th width="100">分類</th>
            <th >產品名稱</th>
            <th width="100">原價</th>
            <th width="100">特價</th>
            <th width="100">狀態</th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <th scope="row">{{item.category}}</th>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price}}</td>
            <td class="text-right">{{item.price}}</td>
            <td :class="!item.enabled ? 'text-danger' :'text-success' ">
              {{item.enabled ? '啟用':'未啟用'}}
            </td>
            <td><div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="Action('Edit',item)">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="Action('Delete',item)">刪除</button>
              </div></td>
          </tr>
        </tbody>
      </table>
       <!-- 分頁 -->
       <Pagination
        :pagination="pagination"
        @emitPages="getProducts" />
      <!-- 刪除 -->
      <DelProductModel
        ref='delProductModel'
        :pruduct="tempData"
        @emitPages="getProducts" />
      <!-- 新增/編輯 -->
      <ProductModel
        ref='productModel'
        :pruduct="tempData"
        @updateProducts="getProducts" />
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';
import DelProductModel from '@/components/dashboard/DelProductModel.vue';
import ProductModel from '@/components/dashboard/ProductModel.vue';

export default {
  components: {
    Pagination,
    DelProductModel,
    ProductModel,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempData: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}&paged=10`;
      this.$bus.$emit('setLoading');
      this.$http.get(url).then((result) => {
        this.products = result.data.data;
        this.pagination = result.data.meta.pagination;
      }).catch(() => {
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
    Action(action, item = {}) { // 按鈕動作
      this.tempData = item;
      switch (action) {
        case 'Add': // 新增資料
          this.isNew = true;
          // 使用 refs 觸發子元件方法
          this.$refs.productModel.getProduct(); // 新增商品所以不需要取得詳細資料，故不傳入id值
          break;
        case 'Edit': // 修改資料
          this.isNew = false;
          // 使用 refs 觸發子元件方法
          this.$refs.productModel.getProduct(item.id); // 透過商品ID取得詳細資料進行修改
          break;
        case 'Delete': // 刪除資料
          $('#delProductModel').modal('show');
          break;
        default:
          break;
      }
    },
  },
};
</script>
