export default {
    namespaced: true,
    state() {
        return {
          lastFetch: null,
          tutors:  [
                {
                  id: 'c1',
                  firstName: 'Maximilian',
                  lastName: 'Schwarzmüller',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
            ]
        };
    },
    mutations: {
      addTutorMutation(state, payload) {
        state.tutors.push(payload);
      },
      setTutors(state, payload) {
        state.tutors = payload;
      },
      setFetchTimeStamp(state) {
        state.lastFetch = new Date().getTime();
      },
    },
    actions: {
      async addTutorAction(context, data) {
        const userId = context.rootGetters.userId;
        const tutorData = {
          firstName: data.first,
          lastName: data.last,
          description: data.desc,
          hourlyRate: data.rate,
          areas: data.areas
        };

        const response = await fetch(`https://vue-http-demo-11f98-default-rtdb.firebaseio.com/tutors/${userId}.json`, {
          method: 'PUT',
          body: JSON.stringify(tutorData)
        });

        // const responseData = await response.json();

        if (!response.ok) {
          // error
        }

        context.commit('addTutorMutation', {
          ...tutorData,
          id: userId,
        });
      },
      async loadTutors(context, payload) {
        if(!payload.forceRefresh && !context.getters.shouldUpdate) {
          return;
        }

        const response = await fetch(`https://vue-http-demo-11f98-default-rtdb.firebaseio.com/tutors.json`);
        const responseData = await response.json();

        if(!response.ok) {
          const error = new Error(response.message || 'Failed to get data');
          throw error;
        }
        const tutors = [];
        for (const key in responseData) {
          const tutor = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas
          };
          tutors.push(tutor);
        }
        context.commit('setTutors', tutors);
        context.commit('setFetchTimeStamp');
      },
    },
    getters: {
        tutors(state) {
            return state.tutors;
        },
        hasTutors(state) {
            return state.tutors && state.tutors.length > 0;
        },
        isTutor(_, getters, _2, rootGetters) {
          const tutors = getters.tutors;
          const userId = rootGetters.userId;
          return tutors.some(tut => tut.id === userId);
        },
        shouldUpdate(state) {
          const lastFetch = state.lastFetch;
          if(!lastFetch) {
            return true;
          } else {
            const currentTimestamp = new Date().getTime();
            return (currentTimestamp - lastFetch) / 1000 > 60;
          }
        },
    },
};
