const app = {
  state: {
    loading: true
  },
  mutations: {
    OPEN_LOADING: state => {
      state.loading = true;
    },
    CLOSE_LOADING: state => {
      state.loading = false;
    }
  },
  actions: {
    openLoading: ({ commit }) => {
      commit('OPEN_LOADING');
    },
    closeLoading: ({ commit }) => {
      commit('CLOSE_LOADING');
    }
  }
};

export default app;
