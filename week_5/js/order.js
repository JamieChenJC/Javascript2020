// 匯入語系檔案
import zh_TW from './zh_TW.js';

//固定的
Vue.prototype.$bus = new Vue();

Vue.component('loading', VueLoading); //全域註冊

//*****驗證使用*****
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);
// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
//******************

Vue.filter('toCurrency', function (num) {
  var parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + parts.join('.');
});

var app = new Vue({
      // 將 Vue 綁定我們所自訂的元素上
      el: '#app',
      data: {
        user: {
          token: '',
          uuid: 'aa785650-1105-4181-8ecf-37f60de3c516',
        },
        form: {
          name:'',
          tel:'',
          email:'',
          address:'',
          payment:'',
          message:''
        },
        cart:{list:[], totalPrice:0},
        cartCount:0,
        isLoading:true,
        cartLoging:true
      },
      created()
      {
        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('AlertMsg', (title, success = true)=>{
          this.AlertMsg(title, success);
        });

         //('對應傳送端的emit方法','接收的參數')
         this.$bus.$on('isLoading', (para)=>{
          this.isLoading = para;
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('cartLoging', (para)=>{
          this.cartLoging = para;
          this.isLoading = para;
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('updataCartCount', (para)=>{
          this.cartCount = para;
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('updatacart', (para)=>{
          this.cart = para;
        });
      },
      methods:{
        updataQuantity(id, num) {
          this.$bus.$emit('updataQuantity', id, num);
        },
        deleteProduct(id = 0) {
          this.$bus.$emit('deleteProduct', id);
        },
        openCart() {
            $('#cartModel').modal('show');
        },
        AlertMsg(title, success = true){ //動作完成提示訊息
          let msgBox = document.querySelector('.alertMsg');
          msgBox.innerHTML = `<div class="mt-auto ml-auto mr-auto alretBox" >
                              <div class="alert ${success ? 'alert-success': 'alert-danger'}" role="alert">
                                  ${title}
                                </div>
                            </div>`;
        },
        submitForm() {
          this.isLoading = true;

          const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/orders`;
    
          axios.post(url, this.form).then(() => {
              this.isLoading = false;
              this.AlertMsg('已完成訂單');
              this.$bus.$emit('getCart');
          }).catch((error) => {
              this.isLoading = false;
              this.AlertMsg(error.response.data.errors,false);
          });
        }
      }
});