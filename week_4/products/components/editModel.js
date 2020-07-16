export default {
    template: `
    <div class="modal fade" id="editModel" tabindex="-1" role="dialog" aria-labelledby="editModellLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                  <h5 class="modal-title" id="editModellLabel">{{isnew?"新增商品":"編輯商品"}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                <button type="button" class="btn btn-primary btn-sm" @click="AddImage()">新增圖片連結</button>
                                <button type="button" class="btn btn-primary btn-sm" @click="UploadImage()">上傳圖片</button>
                                <input id="customFile" ref="file" type="file" class="d-none form-control" @change="UploadFile">
                                </div>
                                <template  v-for="(item, key) in tempData.imageUrl">
                                    <div class="form-group" :key="key">
                                        <label :for="'imageUrl'+key">輸入圖片網址</label>
                                        <button type="button" class="btn btn-sm btn-outline-danger" @click="DelImage(key)"><i class="fa fa-trash"></i></button>
                                        <input type="text" class="form-control" :id="'imageUrl'+key" placeholder="輸入圖片網址" v-model="tempData.imageUrl[key]">
                                    </div>
                                    <img :src="tempData.imageUrl[key]" alt="" class="img-fluid">
                                </template>
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="productsTitle">標題</label>
                                    <input type="text" class="form-control" id="productsTitle" placeholder="請輸入標題" v-model="tempData.title">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="productsCategory">分類</label>
                                        <input type="text" class="form-control" id="productsCategory" placeholder="請輸入分類" v-model="tempData.category">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="productsUnit">單位</label>
                                        <input type="text" class="form-control" id="productsUnit" placeholder="請輸入單位" v-model="tempData.unit">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempData.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="productsPrice">售價</label>
                                        <input type="number" class="form-control" id="productsPrice" placeholder="請輸入售價" v-model="tempData.price">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="productsContent">產品描述</label>
                                    <textarea id="productsContent" type="text" placeholder="請輸入產品描述" class="form-control" v-model="tempData.content"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="productsDescription">說明內容</label>
                                    <textarea id="productsDescription" type="text" placeholder="請輸入說明內容" class="form-control" v-model="tempData.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="productsEnabled" v-model="tempData.enabled">
                                        <label class="form-check-label" for="productsEnabled">是否啟用</label>
                                    </div>
                                </div>
                                <hr/>
                                <div class="form-group">
                                    <label>加購商品項目</label>
                                    <select v-model="optionIndex">
                                        <option value="-1" > 請選擇 </option>
                                        <option :value="key" v-for="(item, key) in products ">{{ item.title }}</option>
                                    </select>
                                    <button type="button" class="btn btn-primary btn-sm" @click="AddOptions()">新增加購項目</button>
                                    <template v-if="tempData.options" >
                                        <div class="form-group" v-for="(item, key) in tempData.options.products" :key="key">
                                            <label>{{item.title}}</label>
                                            <label>原價：<span style='font-family: Arial;' >{{item.origin_price}} </span></label>
                                            <label>加購價：<input type="number" style='font-family: Arial;' placeholder="請輸入加購價" v-model="item.price"></label>
                                            <button type="button" class="btn btn-sm btn-outline-danger" @click="DelOptions(key)"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" @click="Edit()">確認</button>
                </div>
              </div>
            </div>
        </div>`,
    props: ['products','user','isnew'],
    data(){
      return{
        optionIndex:'-1', //加購商品使用的index
        tempData:{imageUrl:[], options: {products:[]}}, //暫存資料
      }
    },
    methods:{
        getProduct( id = 0 ){//取得商品詳細資料
          var vm = this;
          if ( id === 0 ) //新增商品，把tempData清空
          {
            vm.tempData ={imageUrl:[], options: {products:[]}};
            $('#editModel').modal('show');
          }
          else //編輯商品，透過API取得商品完整資料
          {
            var url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`
            //顯示loading...
            vm.$bus.$emit('loadingStatus', true);
            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            axios.get(url)
              .then(function (response) {
                vm.tempData =  Object.assign({ imageUrl:[''], options: {products:[]}}, response.data.data);
                $('#editModel').modal('show');
              })
              .catch(function (error) {
                console.log(error)
              })
              .finally(()=>{
                vm.$bus.$emit('loadingStatus', false);
              });
          }
        },
        Edit() { //新增/修改資料
            const vm = this;
            let url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            let type = 'post';
            //顯示loading...
            vm.$bus.$emit('loadingStatus', true);

            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${vm.user.token}`;
            if ( !vm.isnew )
            {
                url +=`/${vm.tempData.id}`;
                type = 'patch';
            }

            axios[type](url, vm.tempData)
                .then(function (response) {
                  $('#editModel').modal('hide');
                  vm.$emit('pushgetproducts');
                  vm.$emit('pushalertmsg',`${vm.isnew?"新增商品":"編輯商品"}成功`);
                })
                .catch(function (error) {
                  vm.$emit('pushalertmsg',`${vm.isnew?"新增商品":"編輯商品"}失敗`, false);
                  vm.$bus.$emit('loadingStatus', false);
                });
                
          },
          AddImage() { //增加圖片。最多五張圖
            if ( this.tempData.imageUrl.length < 5)
              this.tempData.imageUrl.push('');
            else
              alert('圖片最多只能五張唷!!');
          },
          DelImage(index){
            this.tempData.imageUrl.splice(index, 1);
          },
          AddOptions(){ //針對某個商品新增加購商品
            if ( this.optionIndex === '-1' )
            {
              alert('請選擇加購商品');
              return;
            }
  
            if ( this.tempData.options.products.length == 3 )
            {
              alert('加購商品選項最多只能三項唷');
              return;
            }
  
            this.tempData.options.products.push({
                                                id:this.products[this.optionIndex].id, 
                                                title:this.products[this.optionIndex].title, 
                                                origin_price:this.products[this.optionIndex].origin_price,
                                                price:this.products[this.optionIndex].price});
            this.optionIndex = '-1';
  
          },
          DelOptions(index){ //刪除加購商品
            this.tempData.options.products.splice(index, 1);
          },
          UploadImage(){
            if ( this.tempData.imageUrl.length < 5)
              this.$refs.file.dispatchEvent(new MouseEvent('click'));  // 使用 refs 觸發子元件方法
           else
              alert('圖片最多只能五張唷!!');
          },
          UploadFile() {
            const vm = this;
            const uploadedFile = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append('file', uploadedFile);
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
            vm.$bus.$emit('loadingStatus', true);
            axios.post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then((response) => {
              if (response.status === 200) {
                this.tempData.imageUrl.push(response.data.data.path);
              }
            }).catch((error,response) => {
              console.log('上傳不可超過 2 MB');
            }).finally(()=>{
              //隱藏loading...
              vm.$bus.$emit('loadingStatus', false);
            });
          }
    }
}