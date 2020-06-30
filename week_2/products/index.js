
  var obj = {
    data: {
      uuid: 'aa785650-1105-4181-8ecf-37f60de3c516',
      category:'',
      products: [],
    },
    getData: function() {
      var vm = this;
      var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;

      //顯示loading...
      document.querySelector('.loading-background').style="";

      axios.get(url)
        .then(function (response) {
          vm.data.products = response.data.data;
          vm.sortData();
        })
        .catch(function (error) {
          console.log('串接API發生錯誤', error);
        })
    },
    sortData: function() {
      const sortWay = document.getElementById('productSort').value;
      const keyWord = document.getElementById('keyWord').value;
      let products =  this.data.products;

       //排序
      if ( sortWay == 1 )
       products = products.sort( (a,b) => a.price > b.price ? 1:-1);
      else
       products = products.sort( (a,b) => a.price < b.price ? 1:-1);

      //關鍵字
      if ( keyWord != "")
      {
        products = products.filter( (item) =>   item.title.indexOf(keyWord) >=0 );
      }

      //商品分類
      if ( this.data.category != "")
      {
        products = products.filter( (item) =>   item.category==this.data.category );
      }

      this.data.products = products;

      this.render();

    },
    render: function() {

      let productCount = document.getElementById('productCount');
      var app = document.getElementById('list');
      var products = this.data.products;
      var str = '';

      productCount.innerHTML = products.length;
      products.forEach(function(item) {
        str +=`<div class="col-10 col-md-3 mb-5 mr-auto ml-auto">
                <div class="border border-warning rounded">
                  <img class="rounded-lg mb-2" src="${ item.imageUrl[0] }" style='width:100%'>
                  <h5 class="ml-2">${ item.title }</h5>
                  <p class="ml-2">${ item.content }</p>
                  <div class="col-12 price-box"> 
                    <del>TWD${ item.origin_price }</del> 
                    <spen>優惠 ${ item.price }</spen>
                  </div>
                  <div class="col-12 button-box mb-3"> 
                    <button type="button" class="btn btn-outline-warning">加入購物車</button>
                    <button type="button" class="btn btn-warning">直接購買</button>
                  </div>
                  </div>
                </div>`;
      });
      
      app.innerHTML = str;

      //隱藏loading...
      document.querySelector('.loading-background').style="display:none !important";  
    }
  }



//監聽事件
  document.getElementById('productSort').addEventListener('change',
    function(e){
    obj.getData();
  });

  document.getElementById('keySearch').addEventListener('click',
    function(e){
    obj.getData();
  });

  document.querySelector('.nav-sort').addEventListener('click', function(e){
    var elems = document.querySelectorAll('.nav-sort>a');
    elems.forEach(function(item) {
      item.classList.remove("active");
    });
    e.target.classList.add("active");

    obj.data.category = e.target.dataset.category;
    obj.getData();
  });


//取得資料
obj.getData();

