import jwt_decode from 'jwt-decode'
export const validateToken = (token) => {
    const now = Math.round(new Date().getTime() / 1000);
    const decodeToken = jwt_decode(token);
    const isValid = decodeToken && now < decodeToken.exp;
    return isValid; 
}