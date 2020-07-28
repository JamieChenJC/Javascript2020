Vue.component('cartModelTemplate', {
    template: `
    <div class="modal fade " id="cartModel" tabindex="-1" role="dialog" aria-labelledby="cartModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content rounded border-0">
                <div class="modal-header ">
                <h5 class="modal-title" id="cartModelLabel">購物車</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body" v-if="cart.list.length">
                    <div class="mb-3 text-right">
                        <button type="button" class="my-auto mr-3 btn btn-sm btn-outline-danger" @click='deleteProduct()'><i class="fa fa-trash"></i>刪除所有商品</button>
                    </div>
                    <div class="media mb-2" v-for='(item, key) in cart.list' :key='key'>
                        <button type="button" class="my-auto mr-3 btn btn-sm btn-outline-danger" @click='deleteProduct(item.product.id)'><i class="fa fa-trash"></i></button>
                        <img  style='width:100px' :src="item.product.imageUrl[0]" class="my-auto mr-3" :alt="item.product.title">
                        <div class="media-body">
                            <div class="w-100">
                                <div>
                                    <h6>{{item.product.title}}</h6>
                                    <strong class="text-sm">$ {{ item.product.price }}</strong>
                                    <small class="d-block text-muted">
                                    <button type="button" class="btn btn-link" @click='updataQuantity(item.product.id, item.quantity-1)'><i class="fa fa-minus"></i></button>
                                    {{item.quantity}}
                                    <button type="button" class="btn btn-link" @click='updataQuantity(item.product.id, item.quantity+1)'><i class="fa fa-plus"></i></button>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body" v-else>
                    <strong class="text-sm">購物車是空的</strong>
                </div>
                <div class="modal-footer">
                <strong class="text-left text-sm">總計$ {{ cart.totalPrice }}</strong>
                <a class="btn btn-warning" href="order.html" role="button">前往結帳</a>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            cart:{list:[], totalPrice:0},
        };
    },
    props: ['user'],
    created()
    {
        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('getCart', ()=>{
            this.getCart();
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('updataQuantity', (id, number = 0)=>{
            this.updataQuantity(id, number);
        });

        //('對應傳送端的emit方法','接收的參數')
        this.$bus.$on('deleteProduct', (id)=>{
            this.deleteProduct(id);
        });

        this.getCart();
    },
    methods:{
        getCart() {
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/shopping`;

            this.$bus.$emit('cartLoging', true);

           return axios.get(url).then((response) => {
                this.cart.list = response.data.data;
                this.cart.totalPrice = 0;
                // 累加總金額
                this.cart.list.forEach((item) => {
                    this.cart.totalPrice += item.product.price;
                });
                this.$bus.$emit('updataCartCount', this.cart.list.length);
                this.$bus.$emit('cartLoging', false);
                this.$bus.$emit('updatacart', this.cart );
            });
        },
        updataQuantity(id, number = 0){
            // 避免商品數量低於 0 個
            if(number <= 0) 
            {
                this.$bus.$emit('AlertMsg','商品數量不能小於1',false);
                return;
            }
            this.$bus.$emit('isLoading', true);
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/shopping`;

            const data = {
                product: id,
                quantity: number,
            };

            axios.patch(url, data).then(() => {
                this.$bus.$emit('isLoading', false);
                this.getCart();
            });
        },
        deleteProduct(id){
            this.$bus.$emit('isLoading', true);

            let url =  `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/shopping/${id}`;

            if ( id === 0)
            {
                url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/shopping/all/product`;
            }

            axios.delete(url).then(() => {
                this.$bus.$emit('isLoading', false);
                this.getCart();
            });
        }
    }
});