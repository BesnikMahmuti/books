export const bookContext = (state = {}, { type, payload }) => {
  switch (type) {
    case "SAVE_BOOK_CONTEXT":
      return state = payload
    default:
      return state;
  }
};
