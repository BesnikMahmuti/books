export const saveBookContext = bookContext => {
    return {
        type: "SAVE_BOOK_CONTEXT",
        payload: bookContext
    }
}

export const deleteBook = (id,status) => {
    return {
        type:"DELETE_BOOK",
        payload: {
            id,
            status
        }
    }
}