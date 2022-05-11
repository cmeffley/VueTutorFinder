import { createStore } from 'vuex';

import tutorStore from "./modules/tutorStore.js";
import requestsStore from './modules/requestsStore.js';

const store = createStore({
    modules: {
        tutors: tutorStore,
        requests: requestsStore
    },
    state() {
        return {
            userId: 'c3',
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
    },
});

export default store;