import { createStore } from 'vuex';

import tutorStore from "./modules/tutorStore.js";

const store = createStore({
    modules: {
        tutors: tutorStore,
    }
});

export default store;