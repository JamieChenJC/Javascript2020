
//固定的
Vue.prototype.$bus = new Vue();

Vue.component('loading', VueLoading); //全域註冊

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
        cartCount:0,
        updataProductCount:0,
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
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('updataCartCount', (para)=>{
          this.cartCount = para;
        });
        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('updataProductCount', (para)=>{
          this.updataProductCount = para;
        });

      },
      methods:{
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
        }
      }
});