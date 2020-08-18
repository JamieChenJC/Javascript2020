<template>
    <div>
      <div class="text-right mb-3">
        <button type="button" class="btn btn-primary" @click="Action('Add')">新增優惠券</button>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th>名稱</th>
            <th>折扣碼</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in coupons" :key="item.id">
            <th scope="row">{{item.title}}</th>
            <td>{{item.code}}</td>
            <td>{{item.percent}}</td>
            <td>{{item.deadline.datetime}}</td>
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
        @emitPages="getCoupons" />
      <!-- 刪除 -->
      <Del-Coupon-Model
        ref='delCouponModel'
        :coupon="tempData"
        @emitPages="getCoupons" />
      <!-- 新增/編輯 -->
      <Coupon-Modal
        ref='couponModal'
        @emitPages="getCoupons" />
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';
import DelCouponModel from '@/components/dashboard/DelCouponModel.vue';
import CouponModal from '@/components/dashboard/CouponModal.vue';

export default {
  components: {
    Pagination,
    DelCouponModel,
    CouponModal,
  },
  data() {
    return {
      coupons: [],
      pagination: {},
      tempData: {},
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}&paged=10`;
      this.$bus.$emit('setLoading');
      this.$http.get(url).then((result) => {
        this.coupons = result.data.data;
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
          // 使用 refs 觸發子元件方法
          this.$refs.couponModal.getCoupon(); // 新增所以不需要取得詳細資料，故不傳入id值
          break;
        case 'Edit': // 修改資料
          // 使用 refs 觸發子元件方法
          this.$refs.couponModal.getCoupon(item.id); // 透過ID取得詳細資料進行修改
          break;
        case 'Delete': // 刪除資料
          $('#delCouponModel').modal('show');
          break;
        default:
          break;
      }
    },
  },
};
</script>
