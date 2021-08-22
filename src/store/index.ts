import { combineReducers } from "redux";

import { UserState } from '../types/user';
import { CategoryState } from '../types/category';
import { RecordState } from '../types/record';
import userReducer from './reducers/userReducer'
import categoryReducer from './reducers/categoryRecuder'
import recordReducer from './reducers/recordReducer'

export interface AppState {
    user: UserState;
    categories: CategoryState;
    records: RecordState;
}

const rootReducer = combineReducers<AppState>({
    user: userReducer,
    categories: categoryReducer,
    records: recordReducer,
});

export default rootReducer;