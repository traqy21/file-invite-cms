<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/" name="Items" icon="ti-panel"/>
        <sidebar-link to="/logs" name="Logs" icon="ti-view-list-alt"/>
        
      </template>
      
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>
 
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>  
import DashboardContent from "./Content.vue"; 
export default {
  components: {  
    DashboardContent, 
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
