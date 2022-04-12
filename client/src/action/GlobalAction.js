import { LINK_ACTIVE_GLOBAL } from "../contants/GlobalContains";


export const activeGlobal = (type) => dispatch => {
    dispatch({
        type : LINK_ACTIVE_GLOBAL,
        payload : type,
    });
};