export const dataReducer = (state, action) => {
  console.log("payload: ",JSON.stringify(action.payload));
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "APPLY_FILTERS":
      return {
        ...state,
        age: action.payload.age,
        gender: action.payload.gender,
        date: action.payload.date,
      };
    default:
      return state;
  }
};
