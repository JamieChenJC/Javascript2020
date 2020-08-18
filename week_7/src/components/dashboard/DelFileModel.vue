<template>
  <div  class="modal fade" id="delFileModel"
        tabindex="-1" role="dialog" aria-labelledby="delFileModellLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content rounded border-0">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModelLabel">刪除圖片</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                  <img class="img-fluid" style='width:100px' :src="storage.path">
                    是否刪除圖片（刪除後將無法恢復）。
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
    storage: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    Delete() {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${this.storage.id}`;
      this.$bus.$emit('setLoading');
      this.$http.delete(url).then(() => {
        $('#delFileModel').modal('hide');
        this.$emit('emitPages');
        this.$toast.success('圖片刪除成功囉');
      }).catch(() => {
        this.$toast.error('圖片刪除失敗');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>
