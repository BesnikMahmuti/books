export const bookActions = (state = {}, { type, payload }) => {
  switch (type) {
    case "UPDATE_BOOK":
      return (state = payload);
    case "DELETE_BOOK":
      return (state = {
          bookDeleted: payload.status,
          bookId: payload.id
      });
    default:
      return state;
  }
};
