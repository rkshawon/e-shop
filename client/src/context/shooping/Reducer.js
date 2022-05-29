const Reducer = (state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return {
              user: null,
              isFetching: true,
              error: false,
            };
        case "LOGIN_SUCCESS":
            return {
              user: action.payload,
              isFetching: false,
              error: false,
            };
        case "LOGIN_FAILURE":
            return {
              user: null,
              isFetching: false,
              error: true,
            };
        case "LOGOUT":
              return {
                user: null,
                isFetching: false,
                error: false,
              };
        case  "ADD_TO_CARD":
            return{
                basket:  [...state.basket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket]
            newBasket= newBasket.filter(b => b.id !== action.id)
            return{
                basket: [...newBasket]
            }
        case 'CHANGE_PRODUCT_QUANTITY':
            let qBasket = [...state.basket]
            qBasket.forEach((b)=>{
                if(b.id === action.id){
                    if(action.quantityType === "plus"){
                        b.quantity = b.quantity < 10 ? b.quantity + .5 : 10
                    }
                        
                    if(action.quantityType === "minus")
                        b.quantity = b.quantity > 1 ? b.quantity - .5 : 1             
                }
            })
            return{
                 basket: [...qBasket]
            }
        default:
            return state
    }
}
export default Reducer;