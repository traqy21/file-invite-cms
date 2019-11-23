<template>
  <div>  

    <div class="row"> 
      <div class="col-md-12">
        <card class="card" title="Logs"> 
          <b-row no-gutters v-for="(data, index) in logs" :key="index">
            <b-col sm="12">
              <p><strong>{{ data.created_at}}:</strong> &nbsp {{ data.message}}</p>
            </b-col>
          </b-row>
        </card>
      </div>
    </div> 
 
  </div>
</template>
<script> 

import { mapState, mapGetters} from "vuex"; 
export default {
  components: { 
  }, 
  data() {
    return {    
    };
  },
  created() {
      this.initPage();
  },
  computed: { 
    ...mapState("item", [ 
        "logs",
        "loading", 
        "errors"
    ]),
  }, 
  methods: { 
      async initPage() {  
          await this.getLogs(); 
          
      }, 
      async getLogs() { 
          await this.$store.dispatch("item/getLogs");
      },
 
      //errors
      errorMessage(field) {   
          if (this.errors == null) {
              return "";
          }    
          return this.errors.errors[field];
      },
      
      isValid(field) { 
          if (this.errors == null) {
              return false;
          } 
          return this.errors.errors[field] ? false : true;
      },

      isValidText(field) { 
          if (this.errors == null) {
              return "";
          }
          return "is-invalid";
      },

  }
};
</script>
<style>
</style>
