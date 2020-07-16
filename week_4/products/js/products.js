
//固定的
Vue.prototype.$bus = new Vue();

import loding from '../components/loading.js';
import pagination from '../components/pagination.js';
import deleteModel from '../components/deleteModel.js';
import editModel from '../components/editModel.js';

Vue.component('Loading', loding);
Vue.component('pagesTemplate', pagination);
Vue.component('deleteModelTemplate', deleteModel);
Vue.component('editModelTemplate', editModel);


var app = new Vue({
      // 將 Vue 綁定我們所自訂的元素上
      el: '#app',
      data: {
        user: {
          token: '',
          uuid: 'aa785650-1105-4181-8ecf-37f60de3c516',
        },
        products: [],
        pagination:{},
        tempData:{ imageUrl:[], options: {products:[]}}, //暫存資料
        isNew: false
      },
      created()
      {
        //確認cookie是否有效
        const api = `https://course-ec-api.hexschool.io/api/auth/check`;
        const vm = this;

        //顯示loading...
        vm.$bus.$emit('loadingStatus', true);

        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if ( this.user.token !== '' )
        {
          axios.post(api, {api_token:this.user.token}).then((response) => {
            if ( response.data.success !== true )
            {
              window.location = 'login.html';
            }
            else
            {
              vm.GetProducts();
            }
          }).catch((error) => {
            document.cookie =`token=;expires=; path=/`;
            window.location = 'login.html';
          });
        }
        else {
          window.location = 'login.html';
        }

      },
      methods:{
        GetProducts(page = 1) { //取得某頁的商品資料
          var vm = this;
          var url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;

          //顯示loading...
          vm.$bus.$emit('loadingStatus', true);

          //預設帶入 token
          axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
          axios.get(url)
            .then(function (response) {
              vm.products = response.data.data;
              vm.pagination = response.data.meta.pagination;
            })
            .catch(function (error) {
              document.cookie =`token=;expires=; path=/`;
              window.location = 'login.html';
            })
            .finally(()=>{
              vm.$bus.$emit('loadingStatus', false);
            });
        },
        Action(action, item={}) { //按鈕動作
          this.tempData = item;
          switch(action)
          {
            case 'Add':  //新增資料
              this.isNew = true;
              // 使用 refs 觸發子元件方法
              this.$refs.editModel.getProduct(); //新增商品所以不需要取得詳細資料，故不傳入id值
            break;

            case 'Edit': //修改資料
              this.isNew = false;
              // 使用 refs 觸發子元件方法
             this.$refs.editModel.getProduct(item.id); //透過商品ID取得詳細資料進行修改
            break;

            case 'Delete': //刪除資料
              $('#deleteModel').modal('show');
            break;
          }
        },
        AlertMsg(title, success = true){ //動作完成提示訊息

          let msgBox = document.querySelector('.alertMsg');
          msgBox.innerHTML = `<div class="mt-auto ml-auto mr-auto alretBox" >
                              <div class="alert ${success ? 'alert-success': 'alert-danger'}" role="alert">
                                  ${title}
                                </div>
                            </div>`;
        },
        Logout(){
          document.cookie =`token=;expires=; path=/`;
          window.location = 'login.html';
        }
      }
});