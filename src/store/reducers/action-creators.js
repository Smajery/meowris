import {AuthActionCreator} from "./auth/action-creator";
import {MemoryActionCreator} from "./memory/action-creator";

export const AllActionCreators  = {
    ...AuthActionCreator,
    ...MemoryActionCreator,
}
