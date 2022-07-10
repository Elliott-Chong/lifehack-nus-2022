const initialState = {
  user: null,
  treasured: [],
  inventory: [],
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
    case "update_inventory":
      const { Class_names_identified } = payload;

      // [shirt, bottle, bottle]
      // items = [{name: shirt, count: 1}, {name: bottle, count: 2}]
      let items = [];
      for (let item of Class_names_identified) {
        if (items.some((i) => i.name == item)) {
          for (let i of items) {
            if (i.name == item) {
              i.count++;
            }
          }
        } else {
          items.push({ name: item, count: 1 });
        }
      }

      return { ...state, inventory: items };
    default:
      return state;
  }
};
export { initialState, reducer };
