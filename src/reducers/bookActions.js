export const bookActions = (state = false, { type, payload }) => {
  switch (type) {
    case "UPDATE_BOOK_LIST":
      return (state = payload);
    case "DELETE_BOOK":
      return (state = {
          bookDeleted: payload.status,
          bookId: payload.id
      });
    case "UPDATE_SNACKBAR_MESSAGE":
      return state = payload  
    default:
      return state;
  }
};
