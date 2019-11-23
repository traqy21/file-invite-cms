import api from "./api";
import SecureLS from "secure-ls";

const ls = new SecureLS({
    encodingType: "rc4",
    isCompression: false,
    encryptionSecret: "Zs%Ma??5Qn,!ZB#_nhM"
});

export default {
    isLogin() {
        return !!this.getUser();
    }, 
    getUser() {
        return ls.get("user");
    },
    getToken() {
        return ls.get("token");
    },
    getHeader() {
        return { Authorization: this.getToken() };
    },
   
    setUser(user) {
        ls.set("user", user);
    },
    setToken(token) {
        ls.set("token", token);
    }, 
    logout() {
        ls.remove("user");
        ls.remove("token");
        ls.remove("moduleAccess");
    },

    login(credential) {
        let self = this; 
        
        return new Promise((resolve, reject) => {
            api.post("auth/login", credential)
                .then(response => {
                    self.setUser(response.user);
                    self.setToken(response.token); 
                    resolve(response);
                })
                .catch(e => {
                    reject(e.errors);
                });
        });
    },

    resetPassword(email) {
        return new Promise((resolve, reject) => {
            api.post("merchant-auth-service/auth/password/reset", {
                email
            })
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    reject(e.errors);
                });
        });
    },

    resetToken(token) {
        return new Promise((resolve, reject) => {
            api.get("merchant-auth-service/auth/password/reset/" + token)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    reject(e.errors);
                });
        });
    },

     
     
};
