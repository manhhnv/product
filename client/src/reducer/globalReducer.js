import { LINK_ACTIVE_GLOBAL } from "../contants/GlobalContains";

export const activeGlobalReducer = (state = {}, action) => {
  switch (action.type) {
    case LINK_ACTIVE_GLOBAL:
      return {
        type: action.payload,
      };

    default:
      return state;
  }
};
