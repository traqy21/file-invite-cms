<template>
  <div>  

    <div class="row">
      <div class="col-md-6">

         <card class="card" title="To-do List"> 
           <b-row>
             <b-col sm="8">
               <b-form-group label="" 
                    label-for="name"  
                    :invalid-feedback="errorMessage('name')"
                    :state="isValid('name')"
                         >  
                    <b-form-input
                        id="name"
                        type="text"
                        placeholder="Add item"   
                        class="custom-input"                    
                        v-model="form.name" 
                        ref="name">
                    </b-form-input>  
                </b-form-group> 
             </b-col>
             <b-col sm="4">
               <p-button type="warning"
                                size="sm"
                                @click.native.prevent="addItem"
                            >
                        <i class="ti-plus"></i> Add
                    </p-button>
             </b-col>
           </b-row>
            <b-row no-gutters v-for="(data, index) in todoList" :key="index">
              <b-col sm="8">
                <b-row >
                    <b-col>
                         <b-form-checkbox
                          :id="data.uuid" 
                          name="checkbox" 
                          :value="data.uuid" 
                          :checked="data.is_completed"
                          @change="check($event, data.uuid)"
                        >  
                        <p>{{ data.name }}</p>
                        </b-form-checkbox>
                        
                    </b-col> 
                    
                </b-row>
              </b-col> 
            </b-row>   
          </card>

      </div>
      <div class="col-md-6">
        
         <card class="card" title="Completed"> 
            <b-row no-gutters v-for="(data, index) in completedList" :key="index">
              <b-col sm="8">
                <b-row >
                    <b-col sm="10">  

                      <div class="custom-control custom-checkbox">
                        <input 
                          :id="data.uuid" 
                          type="checkbox" 
                          :name="data.name" 
                          autocomplete="off" 
                          class="custom-control-input" 
                          :value="data.uuid"
                          :checked="data.is_completed"
                          @change="checkCompleted($event, data.uuid, index)"
                          >
                        <label :for="data.uuid" class="custom-control-label">
                          <p><strike>{{ data.name }}</strike></p>
                        </label>
                      </div> 
                    </b-col> 
                    <b-col sm="2">
                      <p-button type="danger"
                                size="sm"
                                  @click.native.prevent="deleteItem(index, data.uuid)"
                              >
                          <i class="ti-trash"></i>
                      </p-button>
                    </b-col>
                    
                </b-row>
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
       form: {
         name: null,
       }
    };
  },
  created() {
      this.initPage();
  },
  computed: { 
    ...mapState("item", [
        "todoList",  
        "completedList",
        "logs",
        "loading", 
        "errors"
    ]),
  }, 
  methods: { 
      async initPage() { 
          await this.getTodoList();  
          await this.getCompletedList(); 
          await this.getLogs(); 
          
      },
      async getTodoList() { 
          await this.$store.dispatch("item/getTodoList");
      },
      async getCompletedList() { 
          await this.$store.dispatch("item/getCompletedList");
      },
      async getLogs() { 
          await this.$store.dispatch("item/getLogs");
      },


      check: async function(event){ 
        if(event != false){ 
          this.$store.commit("item/setUuid", event);
          await this.$store
          .dispatch("item/completeItem")
          .then(() => { 
              if(this.errors == null) {
                this.initPage();
              }
          });   

        }
      },

      addEvent ({ type, target }) {
        const event = {
            type,
            isCheckbox: target.type === 'checkbox',
            target: {
              value: target.value,
              checked: target.checked
            }
        }
        this.events.push(event)
      },


      checkCompleted: async function(e, uuid, index){  
        const checked = e.target.checked; 
        if(!checked){
             
            this.$store.commit("item/setUuid", uuid);
            await this.$store
            .dispatch("item/incompleteItem")
            .then(() => { 
                if(this.errors == null) { 
                      
                }
            });  

            await this.getTodoList();  

            this.completedList.splice(
                index,
                1
            );
        } else {
            this.initPage();      
        }
         
      },
       

      //inputs  
      addItem: async function() {  
          this.$store.commit("item/setItem", this.form);
          await this.$store
          .dispatch("item/addItem")
          .then(() => { 
              if(this.errors == null) {
                
              }
          });  
          this.form.name = null;
          this.initPage();
      },  

      deleteItem: async function(index, uuid) { 
        
        this.$store.commit("item/setUuid", uuid);
        await this.$store
          .dispatch("item/deleteItem")
          .then(() => { 
              if(this.errors == null) { 
                
              }
          });  

        this.completedList.splice(
            index,
            1
        );
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
