export default {
    template: `
        <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled : pagination.current_page == 1 } ">
            <a class="page-link" href="#" tabindex="-1" :aria-disabled="pagination.current_page == 1" aria-label="Previous" @click="GetProducts(pagination.current_page-1)">
             <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <template  v-for=" (pages, index) in pagination.total_pages" >
            <li class="page-item"  :class="{active: pagination.current_page == pages}" :key="index">
              <a class="page-link" href="#"  @click="GetProducts(pages)" >{{pages}}</a>
            </li>
          </template>
          <li class="page-item" :class="{ disabled : pagination.current_page == pagination.total_pages } ">
            <a class="page-link" href="#" :aria-disabled="pagination.current_page == pagination.total_pages" aria-label="Next" @click="GetProducts(pagination.current_page+1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>`,
      props: ['pagination'],
    methods:{
      GetProducts: function(pages){
         this.$emit('pushsomething', pages);
      }
    }
  }