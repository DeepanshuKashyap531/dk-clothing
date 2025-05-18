import { CreateAction } from "../../utils/reducer/reducers.utlis";
import { USER_ACTION_TYPES } from "./user.type";

 export const setCurrentUser = (user) => {
        return  CreateAction( USER_ACTION_TYPES.SET_CURRENT_USER,user);
    };