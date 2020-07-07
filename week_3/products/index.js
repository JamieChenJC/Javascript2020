
var app = new Vue({
      // 將 Vue 綁定我們所自訂的元素上
      el: '#app',
      data: {
        uuid: 'aa785650-1105-4181-8ecf-37f60de3c516',
        products: [{
          "id": "eqyGsgIvhPScfPcy7LWv2bKLduLlPmiSPKL14c6Be6LBhJhAIlWaEHuyiJLydSz4",
          "title": "手沖咖啡壺",
          "category": "器具",
          "content": "傳說中的咖啡壺之一",
          "description": "九分滿容量約 1000ml",
          "imageUrl": [
            "https://images.unsplash.com/photo-1455470956270-4cbb357f7052?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          ],
          "enabled": true,
          "origin_price": 7000,
          "price": 6000,
          "unit": "1",
          options: {
            products: [{
              title: '藍山咖啡',
              origin_price: 500,
              price: 400,
            },{
              title: '耶加雪夫咖啡',
              origin_price: 500,
              price: 380,
            }]
          }
        },
        {
          "id": "aTD1mFC98ogT7dnnP2yKMuliOmMxfOGOI6jpJARefxNKgcKd7wdWk6X79go9CeJo",
          "title": "義式咖啡",
          "category": "咖啡豆",
          "content": "入口甘醇，層次感佳",
          "description": "義式咖啡豆1磅(450公克)",
          "imageUrl": [
            "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          ],
          "enabled": true,
          "origin_price": 650,
          "price": 600,
          "unit": "450g"
        },
        {
          "id": "Pp5Sor67yaemYXeohDOk3gLrF441BlNL4o1yT7GESAvCJeteNYO9AdtKqa5rwuoy",
          "title": "耶加雪夫咖啡",
          "category": "咖啡豆",
          "content": "厚重與柔和之間的最佳選擇",
          "description": "耶加雪夫 咖啡豆 450g",
          "imageUrl": [
            "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          ],
          "enabled": true,
          "origin_price": 500,
          "price": 400,
          "unit": "450g",
          options: {
            products: [{
              title: '手沖咖啡壺',
              origin_price: 7000,
              price: 5900,
            }]
          }
        },
        {
          "id": "Fg3Ufi7OAWVeJplhAp8g5rqZnlZVuVOfsIRC8WaW1ZJTqI83lGfhItFFpLdzVKqD",
          "title": "藍山咖啡",
          "category": "咖啡豆",
          "content": "酸苦平衡 柔潤順口",
          "description": "NO.1藍山 咖啡豆 450g",
          "imageUrl": [
            "https://images.unsplash.com/photo-1514542397203-89768ef90e20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          ],
          "enabled": true,
          "origin_price": 500,
          "price": 450,
          "unit": "450g",
          options: {
            products: [{
              title: '手沖咖啡壺',
              origin_price: 7000,
              price: 5900,
            }]
          }
        }],
        tempData:{ imageUrl:[], options: {products:[]}}, //暫存資料
        modalOption:{ //modal視窗參數
          modalTitle:'',
          alterTitle:'',
          isNew :false
        },
        optionIndex:0  //加購商品使用的index
      },
      methods:{
        Action : function(action, item={}) { //按鈕動作
          let temp = Object.assign({ imageUrl:[''], options: {products:[]}}, item);
          this.tempData = JSON.parse(JSON.stringify(temp));
          switch(action)
          {
            case 'Add':
              this.modalOption.modalTitle="編輯產品";
              this.modalOption.isNew = true;
              $('#editModel').modal('show');
            break;

            case 'Edit':
              this.modalOption.modalTitle="編輯產品";
              this.modalOption.isNew = false;
              $('#editModel').modal('show');
            break;

            case 'Delete':
              this.modalOption.modalTitle="刪除商品";
              this.modalOption.isNew = false;
              $('#deleteModel').modal('show');
            break;

            default :
            //...
            break;
          }
        },
        Delete : function() { //刪除資料
          
          this.products.forEach((element, index )=> {
              if ( element.id === this.tempData.id)
              {
                this.products.splice(index, 1);
              }
          });
          $('#deleteModel').modal('hide');

          this.modalOption.alterTitle = "刪除成功";

          this.AlertMsg();
        },
        Edit : function() { //新增/修改資料
          
          if ( this.modalOption.isNew)
          {
            this.modalOption.alterTitle = "新增成功";
            this.tempData.id = new Date().getTime(); 
            this.products.push(this.tempData);
          }
          else
          {
            this.modalOption.alterTitle = "修改成功";
            this.products.forEach((element, index )=> {
                if ( element.id === this.tempData.id)
                {
                 // this.products[index] = this.tempData;

                  //https://pjchender.blogspot.com/2017/05/vue-vue-reactivity.html
                  //試著使用$set
                  this.$set(this.products, index, this.tempData);
                }
            });
          }

          //this.tempData = { imageUrl:[], options: { products:[] } };

          $('#editModel').modal('hide');
          
          this.AlertMsg();
        },
        AddImage : function () { //增加圖片。最多五張圖
          if ( this.tempData.imageUrl.length < 5)
            this.tempData.imageUrl.push('');
          else
            alert('圖片最多只能五張唷!!');
        },
        AlertMsg : function(){ //更新完成的提示

          let msgBox = document.querySelector('.alertMsg');
          msgBox.innerHTML = `<div class="mt-auto ml-auto mr-auto alretBox" >
                              <div class="alert alert-success" role="alert">
                                  ${this.modalOption.alterTitle}
                                </div>
                            </div>`;
        },
        AddOptions : function(){ //針對某個商品新增加購商品

          this.tempData.options.products.push({title:this.products[this.optionIndex].title, 
                                              origin_price:this.products[this.optionIndex].origin_price,
                                              price:this.products[this.optionIndex].price});
        }
    }
});