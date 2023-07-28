import { createContext, useReducer } from "react"

const initialState={
    isAuthenticated: false,
    isInitialized: false, // to show loading spinner when some backend calls are being made. This will be set to true
    user: null
}

export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
})

const handlers = {
    INITIALIZE: (state, action)=>{
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const {user} = action.payload;
        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => {
        return {
            ...state,
            isAuthenticated: false,
            user: null
        };
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthProvider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer);

    const initialize = async () =>{
        try {
            const accessToken = localStorage.getItem("accessToken");
            // if(accessToken)
        } catch (error) {
            
        }
    }
}