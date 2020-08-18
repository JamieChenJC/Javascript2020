<template>
  <div  class="modal fade"
        id="editModel"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editModellLabel"
        aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="editModellLabel">
            {{isnew?"新增商品":`編輯 ${tempData.title} 商品`}}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <validation-observer v-slot="{ invalid }" ref="form">
          <form @submit.prevent="Edit">
            <div class="modal-body">
              <div class="row">
                  <div class="col-sm-4">
                      <div class="form-group">
                        <button type="button"
                                class="btn btn-primary btn-sm mr-2"
                                @click="AddImage()">新增圖片連結</button>
                        <button type="button"
                                class="btn btn-primary btn-sm"
                                @click="UploadImage()">上傳圖片</button>
                        <input  id="customFile"
                                ref="file"
                                type="file"
                                class="d-none form-control"
                                @change="UploadFile">
                      </div>
                      <template  v-for="(item, key) in tempData.imageUrl">
                          <div class="form-group" :key="key">
                              <label :for="'imageUrl'+key">輸入圖片網址</label>
                              <button type="button"
                                      class="btn btn-sm btn-outline-danger"
                                      @click="DelImage(key)">
                                      <i class="fa fa-trash"></i>
                              </button>
                              <input  type="text"
                                      class="form-control"
                                      :id="'imageUrl'+key"
                                      placeholder="輸入圖片網址"
                                      v-model.trim="tempData.imageUrl[key]">
                              <img :src="tempData.imageUrl[key]"
                                alt="" class="img-fluid">
                          </div>
                      </template>
                  </div>
                  <div class="col-sm-8">
                      <div class="form-group">
                        <validation-provider name="標題" rules="required"
                          v-slot="{ errors, classes}">
                          <label for="productsTitle">標題</label>
                          <input  type="text"
                                  class="form-control"
                                  id="productsTitle"
                                  placeholder="請輸入標題"
                                  v-model="tempData.title"
                                  :class="classes">
                          <!-- 錯誤訊息 -->
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-row">
                          <div class="form-group col-md-6">
                            <validation-provider name="分類" rules="required"
                              v-slot="{ errors, classes}">
                              <label for="productsCategory">分類</label>
                              <input  type="text"
                                      class="form-control"
                                      id="productsCategory"
                                      placeholder="請輸入分類"
                                      v-model="tempData.category"
                                      :class="classes">
                              <!-- 錯誤訊息 -->
                              <span class="invalid-feedback">{{ errors[0] }}</span>
                            </validation-provider>
                          </div>
                          <div class="form-group col-md-6">
                              <validation-provider name="單位" rules="required"
                              v-slot="{ errors, classes}">
                              <label for="productsUnit">單位</label>
                              <input  type="text"
                                      class="form-control"
                                      id="productsUnit"
                                      placeholder="請輸入單位"
                                      v-model="tempData.unit"
                                      :class="classes">
                              <!-- 錯誤訊息 -->
                              <span class="invalid-feedback">{{ errors[0] }}</span>
                              </validation-provider>
                          </div>
                      </div>
                      <div class="form-row">
                          <div class="form-group col-md-6">
                            <validation-provider name="原價" rules="required"
                              v-slot="{ errors, classes}">
                              <label for="origin_price">原價</label>
                              <input  type="number"
                                      class="form-control"
                                      id="origin_price"
                                      placeholder="請輸入原價"
                                      v-model="tempData.origin_price"
                                      :class="classes">
                              <!-- 錯誤訊息 -->
                              <span class="invalid-feedback">{{ errors[0] }}</span>
                              </validation-provider>
                          </div>
                          <div class="form-group col-md-6">
                            <validation-provider name="售價" rules="required"
                              v-slot="{ errors, classes}">
                              <label for="productsPrice">售價</label>
                              <input  type="number"
                                      class="form-control"
                                      id="productsPrice"
                                      placeholder="請輸入售價"
                                      v-model="tempData.price"
                                      :class="classes">
                              <!-- 錯誤訊息 -->
                              <span class="invalid-feedback">{{ errors[0] }}</span>
                              </validation-provider>
                          </div>
                      </div>
                      <div class="form-group">
                          <validation-provider name="說明內容" rules="required"
                              v-slot="{ errors, classes}">
                          <label for="productsDescription">說明內容</label>
                          <textarea type="text"
                                    id="productsDescription"
                                    placeholder="請輸入說明內容"
                                    class="form-control"
                                    v-model="tempData.description"
                                    :class="classes"></textarea>
                          <!-- 錯誤訊息 -->
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                          </validation-provider>
                      </div>
                      <div class="form-group">
                        <validation-provider name="說明內容" rules="required"
                          v-slot="{ errors, classes}">
                          <label for="productsContent">產品描述</label>
                          <vue-editor
                            id="content"
                            v-model="tempData.content"
                            :class="classes" />
                          <!-- 錯誤訊息 -->
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                          </validation-provider>
                      </div>
                      <div class="form-group">
                          <div class="form-check">
                              <input  type="checkbox"
                                      id="productsEnabled"
                                      class="form-check-input"
                                      v-model="tempData.enabled">
                              <label  class="form-check-label"
                                      for="productsEnabled">是否啟用</label>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="invalid">確認</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import { VueEditor } from 'vue2-editor/dist/vue2-editor.core';

export default {
  components: {
    VueEditor,
  },
  props: {
    pruduct: {
      type: Object,
    },
  },
  data() {
    return {
      tempData: {
        imageUrl: [],
      },
      isnew: Boolean,
    };
  },
  methods: {
    getProduct(id = 0) {
      this.$refs.form.reset();
      if (id === 0) {
        this.isnew = true;
        this.tempData = { imageUrl: [] };
        $('#editModel').modal('show');
      } else {
        this.isnew = false;
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;

        this.$bus.$emit('setLoading');

        this.$http.get(url).then((response) => {
          this.tempData = response.data.data;
          $('#editModel').modal('show');
        }).catch(() => {
        }).finally(() => {
          this.$bus.$emit('setLoading');
        });
      }
    },
    Edit() {
      let url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let type = 'post';
      if (!this.isnew) {
        url += `/${this.tempData.id}`;
        type = 'patch';
      }

      this.$bus.$emit('setLoading');
      const checkImg = this.tempData.imageUrl.filter((item) => item.length > 0);
      if (checkImg.length === 0) {
        this.$toast.error('至少要新增一張圖片');
        this.$bus.$emit('setLoading');
      } else {
        this.$http[type](url, this.tempData).then(() => {
          this.$emit('updateProducts');
          this.$toast.success(`商品 ${this.tempData.title} ${this.isnew ? '新增' : '修改'}成功`);
          $('#editModel').modal('hide');
        }).catch(() => {
        }).finally(() => {
          this.$bus.$emit('setLoading');
        });
      }
    },
    AddImage() {
      if (this.tempData.imageUrl.length < 5) {
        this.tempData.imageUrl.push('');
      } else {
        this.$toast.error('圖片最多只能五張唷');
      }
    },
    DelImage(index) {
      this.tempData.imageUrl.splice(index, 1);
    },
    UploadImage() {
      const index = this.tempData.imageUrl.findIndex((item) => item.length === 0);
      if (this.tempData.imageUrl.length < 5 || index >= 0) {
        this.$refs.file.dispatchEvent(new MouseEvent('click')); // 使用 refs 觸發子元件方法
      } else {
        this.$toast.error('圖片最多只能五張唷');
      }
    },
    UploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
      this.$bus.$emit('setLoading');
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.status === 200) {
          const index = this.tempData.imageUrl.findIndex((item) => item.length === 0);
          if (index >= 0) {
            this.$set(this.tempData.imageUrl, index, response.data.data.path);
          } else {
            this.tempData.imageUrl.push(response.data.data.path);
          }
          this.$toast.success('圖片上傳成功');
        }
      }).catch(() => {
        this.$toast.error('圖片上傳失敗，請檢查是不是檔案大小超過 2MB');
      }).finally(() => {
        this.$bus.$emit('setLoading');
      });
    },
  },
};
</script>

<style lang="css">
@import '~vue2-editor/dist/vue2-editor.css';

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
