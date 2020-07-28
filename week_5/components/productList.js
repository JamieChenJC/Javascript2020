Vue.component('productListTemplate', {
    template:   `<div id='list' class='row'>
        <div class='col-10 col-md-3 mb-5 mr-auto ml-auto' v-for='(item, key) in products' :key='key'>
            <div class='border border-warning rounded'>
                <img class='rounded-lg mb-2' :src='item.imageUrl[0]' style='width:100%'>
                <h5 class='ml-2'>{{ item.title }}</h5>
                <p class='ml-2'>{{ item.content }}</p>
                <div class='col-12 price-box'> 
                    <del>TWD{{ item.origin_price }}</del> 
                    <span>優惠 {{ item.price }}</span>
                </div>
                <div class='col-12 button-box mb-3'> 
                    <button type='button' class='btn btn-outline-warning'>查看更多</button>
                    <button type='button' class='btn btn-warning' @click=addToCart(item.id)>加入購物車</button>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            products: [],
            pagination:{},
        };
    },
    props: ['user'],
    created()
    {
        this.getData();
    },
    methods:{
        getData() {
            const vm = this;
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/products`;
            this.$bus.$emit('isLoading', true);
            axios.get(url)
              .then(function (response) {
                vm.products = response.data.data;
                vm.pagination = response.data.meta.pagination;
                vm.$bus.$emit('isLoading', false);
                vm.$bus.$emit('updataProductCount', vm.pagination.total);
              })
              .catch(function (error) {
                console.log('串接API發生錯誤', error);
              })
        },
        addToCart(id, quantity = 1) {
         
            this.$bus.$emit('isLoading', true);

            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/shopping`;
            const cart = {
              product: id,
              quantity,
            };
      
            axios.post(url, cart).then(() => {
               this.$bus.$emit('isLoading', false);
               this.$bus.$emit('AlertMsg','加入購物車成功');
               this.$bus.$emit('getCart');
            }).catch((error) => {
               this.$bus.$emit('isLoading', false);
               this.$bus.$emit('AlertMsg', error.response.data.errors,false);
            });
        }
    }
});