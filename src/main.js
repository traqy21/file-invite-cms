/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import Croppa from "vue-croppa";
import auth from "./services/auth";
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import velocity from "velocity-animate"; 
import permission from "./services/user.permission";
import VueTruncate from "vue-truncate-filter";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import "@/assets/css/custom.css";

Vue.use(PaperDashboard);
Vue.use(BootstrapVue);
Vue.use(Croppa);
Vue.use(VueMomentJS, moment); 
Vue.use(VueTruncate);  

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!auth.getUser()) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else {
        if (!auth.getUser()){ 
           next(); 
       }  else{ 
            next({
                path: "/"
            });
       }
           
    }
});

/* eslint-disable no-new */  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
