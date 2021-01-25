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

export const updateBookList = (books = []) => {
    return {
        type:"UPDATE_BOOK_LIST",
        payload: books
    }
}

export const snackBarContent = (message = "", opened = false) => {
    return {
        type:"UPDATE_SNACKBAR_MESSAGE",
        payload: {
            message,
            opened
        }
    }
}