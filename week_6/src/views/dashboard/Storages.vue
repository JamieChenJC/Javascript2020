<template>
    <div>
      <Loading :active.sync="isLoading"></Loading>
      <h2>圖片列表</h2>
      <table>
        <thead>
          <tr>
            <th>圖片預覽</th>
          </tr>
        </thead>
        <tr v-for="(item) in storages" :key="item.id">
          <td><img  style='width:100px' :src="item.path"></td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
  props: ['token'],
  data() {
    return {
      isLoading: true,
      storages: [],
    };
  },
  mounted() {
    // 宣告API
    const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
    // 顯示Loging...
    this.isLoading = true;
    // 呼叫API取得檔案列表
    this.$http.get(url).then((result) => {
      // 取得伺服器端回傳的檔案列表
      this.storages = result.data.data;
    }).catch(() => {
      // 錯誤訊息
    }).finally(() => {
      // 隱藏Loging...
      this.isLoading = false;
    });
  },
};
</script>
