export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'toggleModal':
      return { ...state, showModal: action.showModal };
    default:
      return state;
  }
};
