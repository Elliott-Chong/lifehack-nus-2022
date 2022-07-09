const initialState = {
  user: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_user":
      const { displayName, photoURL, email } = payload;
      return {
        ...state,
        user: {
          displayName,
          photoURL,
          email,
        },
      };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
};
export { initialState, reducer };
