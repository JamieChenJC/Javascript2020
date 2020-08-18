<template>
  <div  class="modal fade" id="delCouponModel"
        tabindex="-1" role="dialog" aria-labelledby="delCouponModellLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content rounded border-0">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModelLabel">刪除優惠券</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{coupon.title}}</strong> 優惠券（刪除後將無法恢復）。
                </div>
                <div class="modal-footer">
                <button type="button"
                        class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button"
                        class="btn btn-danger" @click="Delete()">
                        確定刪除
                </button>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
/* global $ */
export default {
  props: {
    coupon: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    Delete() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.coupon.id}`;
      this.$bus.$emit('setLoading');
      this.$http.delete(url).then(() => {
        $('#delCouponModel').modal('hide');
        this.$emit('emitPages');
        this.$toast.success(`優惠券 ${this.coupon.title} 刪除成功`);
      }).catch(() => {
        this.$toast.error(`優惠券 ${this.coupon.title} 刪除失敗`);
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>
