import Vue from "vue";

export default {
    success(message) {
        Vue.notify({
            group: "notification",
            type: "success",
            title:
                "<i class='icon-success'></i>Success<i class='icon-close'></i>",
            text: message,
            speed: 500,
            duration: 5000
        });
    },
    error(message) {
        Vue.notify({
            group: "notification",
            type: "error",
            title: "<i class='icon-error'></i>Error<i class='icon-close'></i>",
            text: message,
            speed: 5000,
            duration: 5000
        });
    },
    warning(message) {
        Vue.notify({
            group: "notification",
            type: "warn",
            title:
                "<i class='icon-warning'></i>Warning<i class='icon-close'></i>",
            text: message,
            speed: 500,
            duration: 5000
        });
    },
    info(message) {
        Vue.notify({
            group: "notification",
            type: "info",
            title:
                "<i class='icon-info'></i>Information<i class='icon-close'></i>",
            text: message,
            speed: 500,
            duration: 5000
        });
    }
};
