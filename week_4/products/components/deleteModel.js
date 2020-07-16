export default {
    template: `
    <div class="modal fade " id="deleteModel" tabindex="-1" role="dialog" aria-labelledby="deleteModelLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content rounded border-0">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModelLabel">刪除商品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{product.title}}</strong> 商品（刪除後將無法恢復）。
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="Delete()">確定刪除</button>
                </div>
            </div>
        </div>
    </div>`,
    props: ['product', 'user'],
    methods:{
        Delete(){

            var vm = this;
            var url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.product.id}`;
        
            //元件 對 元件
            vm.$bus.$emit('loadingStatus', true);
            
            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            axios.delete(url)
            .then(function (response) {
                $('#deleteModel').modal('hide');
                vm.$emit('pushgetproducts');
                vm.$emit('pushalertmsg', "刪除成功");
            })
            .catch(function (error) {
                vm.$emit('pushalertmsg', "刪除失敗", false);
                //元件 對 元件
                vm.$bus.$emit('loadingStatus', false);
            });
        }
    }
}