import auth from "./auth";
import _ from "lodash";

export default {
    hasAccess(module) {
        let moduleAccess = auth.getModuleAccess();

        if(module === "engagement.survey" || module === "customer.stores") {

            let topups = auth.getEnabledTopUps();

            return topups.includes("reports")
                ? true
                : false;
        }

        let user = auth.getUser();
        if (user.role === "admin") {
            return true;
        }
        return moduleAccess.indexOf(module) !== -1;
    },
    isTopUpEnable(module) {
        if (auth.getUser().role === "admin") {
            return true;
        }
        return auth.getEnabledTopUps().indexOf(module) !== -1;
    },
    showSideBarIcon(sidebarModule) {
        let moduleIcon = _.findIndex(auth.getModuleAccess(), function(data) {
            return data.includes(sidebarModule + ".");
        });
        return moduleIcon !== -1;
    }
};
