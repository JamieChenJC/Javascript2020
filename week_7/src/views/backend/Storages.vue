<template>
  <div>
      <table class="table table-striped mt-5">
        <thead class="thead-dark">
          <tr>
            <th>圖片預覽</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in storages" :key="item.id">
            <td><img  style='width:100px' :src="item.path"></td>
            <td><button type="button" class="btn btn-outline-danger btn-sm"
                @click="Delete(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
       <!-- 分頁 -->
       <Pagination
      :pagination="pagination"
      @emitPages="getStorages" />
      <!-- 刪除 -->
      <DelFileModel
        ref='delFileModel'
        :storage="tempData"
        @emitPages="getStorages" />
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';
import DelFileModel from '@/components/dashboard/DelFileModel.vue';

export default {
  components: {
    Pagination,
    DelFileModel,
  },
  data() {
    return {
      storages: [],
      pagination: {},
      tempData: {},
    };
  },
  created() {
    this.getStorages();
  },
  methods: {
    getStorages(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${page}&paged=10`;
      this.$bus.$emit('setLoading');
      this.$http.get(url).then((result) => {
        this.storages = result.data.data;
        this.pagination = result.data.meta.pagination;
      }).catch(() => {
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
    Delete(item) { // 按鈕動作
      this.tempData = item;
      $('#delFileModel').modal('show');
    },
  },
};
</script>
