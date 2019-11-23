import auth from "../services/auth";
import router from "@/router/index";
 
export default {
    namespaced: true,

    state: {
        user: auth.getUser(),
        token: auth.getToken(),
        login: auth.isLogin(), 
        loading: false,
        errors: {},
        message: null
    },

    mutations: { 
        logout(state) { 
            auth.logout();

            state.user = null;
            state.token = null;
            state.login = null;
            state.loading = false;
             
            router.push("/login");
        },

        login(state) {  
            state.user = auth.getUser();
            state.token = auth.getToken();
            state.login = auth.isLogin();  
            router.push("/dashboard");
        },

        loading(state) {
            state.loading = true;
            state.errors = {};
        },

        errors(state, errors) {
            state.loading = false;
            state.errors = errors;
        }, 
    },

    actions: { 

        login: async ({ commit }, param) => { 
            commit("loading");

            try { 
                await auth.login(param);
                commit("login");  
                
            } catch (errors) {
                commit("errors", errors);
            }
        },
 
 
    }
};
