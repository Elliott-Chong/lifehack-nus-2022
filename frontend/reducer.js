const initialState = {
  user: null,
  treasured: [
    { name: "bottle", count: 3 },
    { name: "shirt", count: 5 },
  ],
  inventory: [
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "bottle", count: 10 },
    { name: "shirt", count: 56 },
    { name: "shirt", count: 56 },
  ],
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
