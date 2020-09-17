import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types';

const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : false,
    loading: true,
    user: null
};

export default function auth(state=initialState, action){
    const { type, payload } = action;

    switch(type){

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                loading : false,
                isAuthenticated : true
            }
        
        case REGISTER_FAIL:
        case AUTH_ERROR : 
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                token: null
            }
        
        default :
            return state
    }
}
