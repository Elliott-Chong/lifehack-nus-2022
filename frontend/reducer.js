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
    case 'update_inventory':
      const {items_detected} = payload

      // [shirt, bottle, bottle]
// items = [{name: shirt, count: 1}, {name: bottle, count: 2}]
let items = []
for (let item of items_detected) {
  if (items.any(i => i.name == item)) {
    for (let i of items) {
      if (i.name == item) {
        i.count++
      }
    }

  }
}

      return {...state, inventory: items}
    default:
      return state;
  }
};
export { initialState, reducer };
