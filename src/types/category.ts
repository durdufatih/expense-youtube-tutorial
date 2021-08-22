import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
    data: Category[],
    loading: boolean,
    error: string,
}

export interface Category {
    id: number,
    name: string,
    type: "income" | "expense",
    color: string
}
export interface CategoryFrom {
    name: string,
    type: "income" | "expense",
    color?: string
}

interface GET_START {
    type: "GET_CATEGORIES_START";
}

interface GET_SUCCESS {
    type: "GET_CATEGORIES_SUCCESS";
    payload: Category[];
}

interface GET_ERROR {
    type: "GET_CATEGORIES_ERROR";
}

interface ADD_START {
    type: "ADD_CATEGORY_START";
}

interface ADD_SUCCESS {
    type: "ADD_CATEGORY_SUCCESS";
    payload: Category;
}

interface ADD_ERROR {
    type: "ADD_CATEGORY_ERROR";
}

interface EDIT_START {
    type: "EDIT_CATEGORY_START";
}

interface EDIT_SUCCESS {
    type: "EDIT_CATEGORY_SUCCESS";
    payload: Category;
}

interface EDIT_ERROR {
    type: "EDIT_CATEGORY_ERROR";
}

interface DELETE_START {
    type: "DELETE_CATEGORY_START";
}

interface DELETE_SUCCESS {
    type: "DELETE_CATEGORY_SUCCESS";
    payload: number;
}

interface DELETE_ERROR {
    type: "DELETE_CATEGORY_ERROR";
}

export type CategoryAction =
    GET_START |
    GET_SUCCESS |
    GET_ERROR |
    ADD_START |
    ADD_SUCCESS |
    ADD_ERROR |
    EDIT_ERROR |
    EDIT_START |
    EDIT_SUCCESS |
    DELETE_ERROR |
    DELETE_START |
    DELETE_SUCCESS;;
export type CategoryDispatch = ThunkDispatch<CategoryState, void, CategoryAction>;

