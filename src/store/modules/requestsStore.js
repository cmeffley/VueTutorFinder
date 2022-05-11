export default {
    namespaced: true,
    state() {
        return {
            requests: [],
        }
    },
    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload);
        },
    },
    actions: {
        contactTutor(context, payload) {
            const newRequest = {
                id: new Date().toISOString(),
                coachId: payload.coachId,
                userEmail: payload.email,
                message: payload.message
            }
            context.commit('addRequest', newRequest);
        },
    },
    getters: {
        getRequests(state, _, _2, rootGetters) {
            const coachId = rootGetters.userId;
            return state.requests.filter(req => req.coachId === coachId);
        },
        hasRequests(_, getters) {
            return getters.getRequests && getters.getRequests.length > 0;
        }
    },
};