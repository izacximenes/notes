
import { toast } from "react-toastify";
import api from "./api";

export const TOKEN_KEY = "@notes-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = async () => {
  await api.delete('/logout').then(() => {
    localStorage.removeItem(TOKEN_KEY);
  })
  window.location.href = '/login'

};
interface UserInfo {
  name: string
  email: string
}
export const updateUserInfo = async () => {
  if(!isAuthenticated()){
    return null;
  }

  try {
    const response = await api.get<UserInfo>('/info');
    return response.data
  } catch (error) {
    toast("user info loading error", {
      type: 'error'
    })

    return null
  }


};