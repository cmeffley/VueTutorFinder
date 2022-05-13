import { createStore } from 'vuex';

import tutorStore from "./modules/tutorStore.js";
import requestsStore from './modules/requestsStore.js';
import authStore from './modules/authStore.js';

const store = createStore({
    modules: {
        tutors: tutorStore,
        requests: requestsStore,
        auth: authStore
    },
});

export default store;