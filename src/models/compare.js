export default {
  namespace: 'compare',
  state: {
    orgs: [],
  },
  effects: {
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  },
};
