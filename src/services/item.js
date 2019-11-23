import api from "./api";
export default { 

    getTodoList() {         
        return new Promise((resolve, reject) => {
            api.get(
                "item/list/incomplete", 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 

    getCompletedList() {         
        return new Promise((resolve, reject) => {
            api.get(
                "item/list/completed", 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 

    addItem(detail) { 
        return new Promise((resolve, reject) => {
            api.post(
                "item/add",
                detail, 
            ).then(response => {
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    },   
    
    deleteItem(uuid) {         
        return new Promise((resolve, reject) => {
            api.get(
                "item/delete/" + uuid, 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 

    completeItem(uuid) {         
        return new Promise((resolve, reject) => {
            api.get(
                "item/complete/" + uuid, 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 

    incompleteItem(uuid) {         
        return new Promise((resolve, reject) => {
            api.get(
                "item/incomplete/" + uuid, 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 

    getLogs() {         
        return new Promise((resolve, reject) => {
            api.get(
                "transaction/logs", 
            ).then(response => {                
                return resolve(response);
            })
            .catch((error) => {   
                return reject(error);
            });
        });
    }, 
    
}
