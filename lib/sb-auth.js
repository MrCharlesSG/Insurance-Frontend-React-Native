import { SPRING_BACKEND_URL } from "./spring-backend-config";
import axios from 'axios';
import { getAccessToken, removeSession, saveSession } from "./sb-token";
import { Alert } from "react-native";

export async function signIn(username, password, context) {
    try {
      const response = await axios.post(SPRING_BACKEND_URL+'auth/api/v1/login', {
        username,
        password,
      });
      saveSession(response.data, username, context)
      return response
    } catch (error) {
      throw new Error(error);
    }
  }

export async function logOut(context) {
  try {
    const accessToken = await getAccessToken(context)
    const authHeader = 'Bearer ' + accessToken
    const response = await axios.post(SPRING_BACKEND_URL+'auth/api/v1/logout', null, {
      headers: {
          Authorization: authHeader,
        },
    });
    const {setIsLogged} = context
    setIsLogged(false)
    await removeSession()
    return response
  } catch (error) {
    throw new Error(error.message);
  }
}


  



