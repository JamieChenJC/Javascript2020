<template>
  <div  class="modal fade"
        id="couponModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="couponModallLabel"
        aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="couponModallLabel">
            {{isnew?"新增優惠券":`編輯 ${tempData.title} 優惠券`}}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <validation-observer v-slot="{ invalid }" ref="form">
          <form @submit.prevent="Edit">
            <div class="modal-body">
              <div class="form-group">
                <validation-provider name="標題" rules="required"
                  v-slot="{ errors, classes}">
                  <label for="title">標題</label>
                  <input  type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          v-model="tempData.title"
                          :class="classes">
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider name="優惠碼" rules="required"
                  v-slot="{ errors, classes}">
                  <label for="code">優惠碼</label>
                  <input  type="text"
                          class="form-control"
                          id="code"
                          placeholder="請輸入優惠碼"
                          v-model="tempData.code"
                          :class="classes">
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider name="折扣百分比" rules="required"
                  v-slot="{ errors, classes}">
                  <label for="percent">折扣百分比</label>
                  <input  type="number"
                          class="form-control"
                          id="percent"
                          placeholder="請輸入折扣百分比"
                          v-model="tempData.percent"
                          :class="classes">
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider name="到期日" rules="required"
                  v-slot="{ errors, classes}">
                  <label for="date">到期日</label>
                  <input  type="date"
                          class="form-control"
                          id="date"
                          placeholder="到期日"
                          v-model="deadlineDate"
                          :class="classes">
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider name="到期時間" rules="required"
                  v-slot="{ errors, classes}">
                  <label for="time">到期時間</label>
                  <input  type="time"
                          class="form-control"
                          id="time"
                          step="1"
                          placeholder="到期時間"
                          v-model="deadlineTime"
                          :class="classes">
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                  <div class="form-check">
                      <input  type="checkbox"
                              id="productsEnabled"
                              class="form-check-input"
                              v-model="tempData.enabled">
                      <label  class="form-check-label"
                              for="productsEnabled">是否啟用</label>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="invalid">確認</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  data() {
    return {
      tempData: { },
      isnew: false,
      deadlineDate: '',
      deadlineTime: '',
    };
  },
  methods: {
    getCoupon(id = 0) {
      this.$refs.form.reset();

      this.$bus.$emit('setLoading');
      if (id === 0) {
        this.isnew = true;
        this.tempData = {};
        this.deadlineDate = '';
        this.deadlineTime = '';
        $('#couponModal').modal('show');

        this.$bus.$emit('setLoading');
      } else {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${id}`;
        this.$http.get(url).then((response) => {
          this.isnew = false;
          this.tempData = response.data.data;
          [this.deadlineDate, this.deadlineTime] = this.tempData.deadline.datetime.split(' ');
          $('#couponModal').modal('show');
        }).catch(() => {
        }).finally(() => {
          this.$bus.$emit('setLoading');
        });
      }
    },
    Edit() {
      let url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let type = 'post';
      if (!this.isnew) {
        url += `/${this.tempData.id}`;
        type = 'patch';
      }

      this.tempData.deadline_at = `${this.deadlineDate} ${this.deadlineTime}`;

      this.$bus.$emit('setLoading');
      this.$http[type](url, this.tempData).then(() => {
        this.$emit('emitPages');
        this.$toast.success(`優惠券 ${this.tempData.title} ${this.isnew ? '新增' : '修改'}成功`);
        $('#couponModal').modal('hide');
      }).catch(() => {
        this.$toast.success(`優惠券 ${this.tempData.title} ${this.isnew ? '新增' : '修改'}失敗`);
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>
