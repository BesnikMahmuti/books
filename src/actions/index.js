export const saveBookContext = bookContext => {
    console.log(bookContext);
    return {
        type: "SAVE_BOOK_CONTEXT",
        payload: bookContext
    }
}