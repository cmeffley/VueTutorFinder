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
        setRequests(state, payload) {
            state.requests = payload;
        },
    },
    actions: {
       async contactTutor(context, payload) {
            const newRequest = {
                userEmail: payload.email,
                message: payload.message
            }
            const response = await fetch(`https://vue-http-demo-11f98-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
              });

              const responseData = await response.json(); // because there is now a firebase key
              
      
              if (!response.ok) {
                const error = new Error(response.message || 'Failed to get data');
                throw error;
              }
              newRequest.id = responseData.name;
              newRequest.coachId = payload.coachId;
      
              context.commit('addRequest', newRequest);
        },
        async loadRequests(context) {
            const coachId = context.rootGetters.userId;
            const response = await fetch(`https://vue-http-demo-11f98-default-rtdb.firebaseio.com/requests/${coachId}.json`);
            const responseData = await response.json();
    
            if(!response.ok) {
              const error = new Error(response.message || 'Failed to get data');
              throw error;
            }
            const requests = [];
            for (const key in responseData) {
              const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
              };
              requests.push(request);
            }
            context.commit('setRequests', requests);
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