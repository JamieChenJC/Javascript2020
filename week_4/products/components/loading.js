export default {
    template: `
      <div class="d-flex justify-content-center loading-background"   v-if="status" >
      <div class="spinner-border text-warning mt-auto mb-auto"  style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span>
      </div>
    </div>`,
    props: ['defStatus'],
    data(){
      return{
        status: this.defStatus
      }
    },
    created()
    {
      //('對應傳送端的emit方法','接收的參數')
      this.$bus.$on('loadingStatus', (para)=>{
        this.status = para;
      });
    }
}