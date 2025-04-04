import { createStore } from "vuex";
import auth from "./modules/auth";
import general from "./modules/general";
import errors from "./modules/errors";
import secret from "./modules/secret";

export default createStore({
    modules: {
        general,
        errors,
        secret,
        auth,
    },
});