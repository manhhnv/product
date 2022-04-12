import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_GET_ITEMS,
  CART_MINUS_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../contants/cartContains";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      if (state.cartItems.length !== 0) {
        const item = state.cartItems.find((i) => i._id === action.payload._id);
        if (item) {
          const newCartItems = state.cartItems.map((_item) => {
            if (_item._id === item._id) {
              _item.quantity += 1;
            }

            return _item;
          });

          return {
            ...state,
            cartItems: newCartItems,
          };
        }
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
            isOrder: false,
          },
        ],
      };
    case CART_DELETE_ITEM:
      const newCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        cartItems: newCartItems,
      };
    case CART_MINUS_ITEM:
      const minusProducts = state.cartItems.map((_item) => {
        if (_item._id === action.payload) {
          _item.quantity -= 1;
        }

        return _item;
      });

      return {
        ...state,
        cartItems: minusProducts,
      };
    case CART_SAVE_SHIPPING_ADDRESS : 
    
      return {
        ...state,
        shippingAddress : action.payload,
      }

    case CART_GET_ITEMS : 

    return {
      ...state,
      cartItems:action.payload,
    }

    default:
      return state;
  }
};
