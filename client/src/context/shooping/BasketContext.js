import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    basket : JSON.parse(localStorage.getItem("basket")) || [],
}
export const BasketContext = createContext(INITIAL_STATE)

export const BasketContextProvider = ({children}) =>{
    const [state, dispatchB] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }, [state.basket]);

    return(
        <BasketContext.Provider value={{
            basket: state.basket,
            dispatchB
        }}>
            {children}
        </BasketContext.Provider>
    )
}