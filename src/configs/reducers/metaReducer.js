export const appReducer = (state, action) => {
  switch (action.type) {
    case 'toggleModal':
      return { ...state, showModal: action.showModal };
    default:
      return state;
  }
};
