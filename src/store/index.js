import { createStore } from 'vuex';

import tutorStore from "./modules/tutorStore.js";

const store = createStore({
    modules: {
        tutors: tutorStore,
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