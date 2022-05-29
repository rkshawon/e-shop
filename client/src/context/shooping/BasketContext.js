import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    basket : [],
}
export const BasketContext = createContext(INITIAL_STATE)

export const BasketContextProvider = ({children}) =>{
    const [state, dispatchB] = useReducer(Reducer, INITIAL_STATE)

    return(
        <BasketContext.Provider value={{
            basket: state.basket,
            dispatchB
        }}>
            {children}
        </BasketContext.Provider>
    )
}