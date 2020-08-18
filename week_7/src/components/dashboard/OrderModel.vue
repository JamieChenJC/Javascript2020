<template>
  <div  class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="orderModallLabel"
        aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="orderModallLabel">
            客戶資料
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label for="userName" class="col-sm-3 col-form-label">收件人姓名</label>
            <div class="col-sm-9">
              <input type="text" readonly
                    class="form-control-plaintext"
                    id="userName"
                    :value="tempData.user.name">
            </div>
          </div>

          <div class="form-group row">
            <label for="userTel" class="col-sm-3 col-form-label">收件人電話</label>
            <div class="col-sm-9">
              <input type="text" readonly
                    class="form-control-plaintext"
                    id="userTel"
                    :value="tempData.user.tel">
            </div>
          </div>

          <div class="form-group row">
            <label for="userEmail" class="col-sm-3 col-form-label">Email</label>
            <div class="col-sm-9">
              <input type="text" readonly
                    class="form-control-plaintext"
                    id="userEmail"
                    :value="tempData.user.email">
            </div>
          </div>

          <div class="form-group row">
            <label for="userAddress" class="col-sm-3 col-form-label">收件人地址</label>
            <div class="col-sm-9">
              <input type="text" readonly
                    class="form-control-plaintext"
                    id="userAddress"
                    :value="tempData.user.address">
            </div>
          </div>

          <div class="form-group row">
            <label for="message" class="col-sm-3 col-form-label">留言</label>
            <div class="col-sm-9">
              <input type="text" readonly
                    class="form-control-plaintext"
                    id="message"
                    :value="tempData.message">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      tempData: {
        user: {},
      },
    };
  },
  methods: {
    getOrderDetails(id = 0) {
      this.$bus.$emit('setLoading');
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      this.$http.get(url).then((response) => {
        this.tempData = response.data.data;
        $('#orderModal').modal('show');
      }).catch(() => {
        this.$toast.error('無法取得資料');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>
