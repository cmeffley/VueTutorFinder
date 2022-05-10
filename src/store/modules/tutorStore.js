export default {
    namespaced: true,
    state() {
        return {
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
    },
    actions: {
      addTutorAction(context, data) {
        const tutorData = {
          id: context.rootGetters.userId,
          firstName: data.first,
          lastName: data.last,
          description: data.desc,
          hourlyRate: data.rate,
          areas: data.areas
        };
        context.commit('addTutorMutation', tutorData);
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
    },
};
