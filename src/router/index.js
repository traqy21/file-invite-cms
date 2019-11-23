import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue"; 
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";

Vue.use(VueRouter); 

// configure router
// const router = new VueRouter({
//   routes, // short for routes: routes
//   linkActiveClass: "active"
// });

// export default router;

export default new VueRouter({
  mode: "history",  
  linkActiveClass: "active",
  routes: [ 

    {
      path: "/",
      component: DashboardLayout,
      redirect: "/item",
      children: [ 
        {
          path: "item",
          name: "item",
          component: () => import("@/views/Item.vue"),
          meta: {
              requireAuth: false
          }
        },
        {
          path: "logs",
          name: "logs",
          component: () => import("@/views/Logs.vue"),
          meta: {
              requireAuth: false
          }
        },
        
      ]
    },
    { path: "*", component: NotFound } 
    
  ],

});