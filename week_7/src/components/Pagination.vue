<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled : pagination.current_page == 1 } ">
        <a  class="page-link" href="#"
            tabindex="-1"
            :aria-disabled="pagination.current_page == 1"
            aria-label="Previous" @click="emitPages(pagination.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for=" (pages, index) in pagination.total_pages"
          class="page-item"
          :class="{active: pagination.current_page == pages}"
          :key="index">
        <a class="page-link" href="#"  @click="emitPages(pages)" >{{pages}}</a>
      </li>
      <li class="page-item"
          :class="{ disabled :
                    pagination.current_page == pagination.total_pages
                ||  pagination.total_pages == 0 } ">
        <a  class="page-link" href="#"
            :aria-disabled="pagination.current_page == pagination.total_pages"
            aria-label="Next" @click="emitPages(pagination.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    emitPages(pages) {
      this.$emit('emitPages', pages);
    },
  },
};
</script>
