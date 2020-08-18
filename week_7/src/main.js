import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import 'bootstrap';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate'; // 驗證套件
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import router from './router';
// Bus
import './bus';

Vue.config.productionTip = false;

window.$ = $;

// *****驗證使用*****
// input 驗證工具載入
Vue.component('ValidationProvider', ValidationProvider);
// 表單 驗證工具載入
Vue.component('ValidationObserver', ValidationObserver);
// 語系設定
localize('tw', zhTW);
// 安裝所有規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
// Class 設定檔案
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// ******************

// 元件，全域註冊
Vue.component('Loading', Loading);

// 套件加入到Vue的藍圖內(原型內)
Vue.use(VueAxios, axios);
Vue.use(VueToast, {
  // One of the options
  position: 'top-right',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
