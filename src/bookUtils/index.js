import { DELETE } from "../httpUtils";
import { GET_BOOK } from "../constants";



export const deleteBookFromDB = async (id) => {
    if(!id) return new Error("Please provide the book id");
    return await DELETE(`${GET_BOOK}/${id}`);
}

