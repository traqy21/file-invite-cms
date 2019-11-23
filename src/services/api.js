import _ from "lodash";
import axios from "axios";
import store from "../store";

let APIURL = "http://localhost:7000"; 

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const API = axios.create({
    baseURL: APIURL,
    timeout: 29000
});

const POST = (uri, params, headers = {}) => {
    return new Promise((resolve, reject) => {
        API.post(uri, params, { headers })
            .then(response => { 
                resolve(response.data);
            })
            .catch(error => { 
                error = error.response; 
                let errors = {};

                switch (error.status) {
                    case 422:
                        _.each(
                            error.data,
                            (item, key) => (errors[key] = _.head(item))
                        );

                        reject({
                            status: error.status,
                            errors
                        });

                        break;
                    case 404:
                    case 401:
                        reject({
                            status: error.status,
                            errors: {
                                message: error.data.message
                            }
                        });
                        break;
                    case 419:
                        store.commit("auth/logout");
                        break;
                    case 400:
                        reject({
                            status: error.status,
                            errors: {
                                message: error.data.message
                            }
                        });
                        break;
                    default:
                        reject({
                            status: 500,
                            errors: {
                                message:
                                    "Something went wrong, please try again"
                            }
                        });
                }
            });
    });
};

const GET = (uri, headers = null) => {
    return new Promise((resolve, reject) => {
        API.get(uri, {
            headers
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                error = error.response;
                switch (error.status) {
                    case 419:
                        store.commit("auth/logout");
                        break;
                    default:
                        reject({
                            status: 500,
                            errors: {
                                message:
                                    "Something went wrong, please try again"
                            }
                        });
                }
            });
    });
};

const DELETE = (uri, headers = null) => {
    return new Promise((resolve, reject) => {
        API.delete(uri, {
            headers
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                error = error.response;
                switch (error.status) {
                    case 419:
                        store.commit("auth/logout");
                        break;
                    case 400:
                        reject({
                            status: 400,
                            errors: {
                                message: error.data.message
                            }
                        });
                        break;
                    default:
                        reject({
                            status: 500,
                            errors: {
                                message:
                                    "Something went wrong, please try again"
                            }
                        });
                }
            });
    });
};

const MULTIPLE_DELETE = (uri, data, headers = null) => {
    return API.delete(uri, {
        headers,
        data
    });
};

export default {
    post: POST,
    get: GET,
    delete: DELETE,
    multipleDelete: MULTIPLE_DELETE
};
