import itemService from "../services/item.js";  
import notification from '../services/notification.js';

export default {
    namespaced: true,
    state: { 
        loading: false,
        errors: null,
        todoList: [],
        completedList: [],
        logs: [],
        item: {
            name : null, 
        },
        uuid : null
    },
    mutations: { 
        loading(state) {
            state.loading = true;
        },
        errors(state, errors) {
            state.errors = errors;
            state.loading = false;
        }, 
        todoList(state, data) {
            state.todoList = data;
            state.loading = false; 
        },
        completedList(state, data) {
            state.completedList = data;
            state.loading = false; 
        },

        logs(state, data) {
            state.logs = data;
            state.loading = false; 
        },

        setItem(state, value) {  
            state.item.name = value.name;  
        },

        setUuid(state, uuid){
            state.uuid = uuid;
        }
        
    }, 
    actions: {
        async getTodoList({ commit, state }) {
            commit("loading");

            try { 
                let response = await itemService.getTodoList();   
                await commit("todoList", response.list); 
            } catch (errors) {
                commit("errors", errors);
            }
        },

        async getCompletedList({ commit, state }) {
            commit("loading");

            try { 
                let response = await itemService.getCompletedList();   
                await commit("completedList", response.list); 
            } catch (errors) {
                commit("errors", errors);
            }
        },

        addItem: async ({ commit, state }) => {
            commit("loading"); 
            try { 
                let response = await itemService.addItem(
                    state.item, 
                );  
                console.log(response.message); 
            } catch (errors) {    
                commit("errors", errors); 
            }
        },  
        
        deleteItem:  async ({ commit, state }) => {
            commit("loading");

            try { 
                let response = await itemService.deleteItem(state.uuid);   
                console.log(response);
            } catch (errors) {
                commit("errors", errors);
            }
        },
        
        completeItem:  async ({ commit, state }) => {
            commit("loading");

            try { 
                let response = await itemService.completeItem(state.uuid);   
                console.log(response);
            } catch (errors) {
                commit("errors", errors);
            }
        },

        incompleteItem:  async ({ commit, state }) => {
            commit("loading");

            try { 
                let response = await itemService.incompleteItem(state.uuid);   
                console.log(response);
            } catch (errors) {
                commit("errors", errors);
            }
        },

        async getLogs({ commit, state }) {
            commit("loading");

            try { 
                let response = await itemService.getLogs();   
                await commit("logs", response.list); 
            } catch (errors) {
                commit("errors", errors);
            }
        },
        
    }, 

}