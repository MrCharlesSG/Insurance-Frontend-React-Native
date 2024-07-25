import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setNewSession } from "../context/SessionMaintainerGlobalProvider";
import { EXPIRATION_TIME_ACCESS_TOKEN, EXPIRATION_TIME_TOKEN, SPRING_BACKEND_URL } from "./spring-backend-config";

function decodeToken(tokenResponse){
    if (!tokenResponse || typeof tokenResponse !== 'object' || !tokenResponse.accessToken || !tokenResponse.token) {
        throw new Error('Token Response is not correct');
    }

    const now = new Date().toISOString();
    console.log(now)
    return {
        token: tokenResponse.token,
        accessToken: tokenResponse.accessToken,
        token_date: now,
        accessToken_date: now
    };
}


async function refreshToken(tokenObject) {
  try {
      const response = await axios.post(SPRING_BACKEND_URL + 'auth/api/v1/refreshToken', {
          token: tokenObject.token
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
}


async function saveToken(token) {
  await AsyncStorage.setItem('accessToken', token.accessToken);
  await AsyncStorage.setItem('token', token.token);
  await AsyncStorage.setItem('token_date', token.token_date);
  await AsyncStorage.setItem('accessToken_date', token.accessToken_date);
  console.log("Token Saved")
}

export async function saveSession(response, username, context) {
  const decodedTokens = decodeToken(response);
  console.log("Saving session " + JSON.stringify(decodedTokens) + " and username " + username);
  setNewSession(username, decodedTokens, context);
  await AsyncStorage.setItem('username', username);
  await saveToken(decodedTokens);
}

async function saveRefreshedSessionAndReturn(refreshedTokens, tokenDate){
  const tokens = {
    token:refreshedTokens.token,
    accessToken: refreshedTokens.accessToken,
    token_date:tokenDate,
    accessToken_date: Date.now()
  }

  await saveToken(tokens)
  return tokens
}

export async function getAccessToken(context) {
   
  const { tokens, setTokens, setIsLogged} = context
  
  if (isTokenExpired(tokens)) {
    throw new Error("Session has Expired. Need to log in again");
  }

  if(isAccessTokenExpired(tokens) ){
    try {
      const refreshedTokens = await refreshToken(tokens)
      const newTokens = await saveRefreshedSessionAndReturn(refreshedTokens, tokens.token_date)
      setTokens(newTokens)
      setIsLogged(true)
      return newTokens.accessToken
    } catch (error) {
      setIsLogged(false)
      setTokens(null)
      throw new Error("Could not refresh your session. You will need to log in again.")
    }
  }
  
  return tokens.accessToken  
}


  export function isTokenExpired(tokenObject) {
    const tokenDate = new Date(tokenObject.token_date).getTime();
    const now = Date.now();

    return now - tokenDate > EXPIRATION_TIME_TOKEN;
}

export function isAccessTokenExpired(tokenObject) {
    const accessTokenDate = new Date(tokenObject.accessToken_date).getTime();
    const now = Date.now();

    return now - accessTokenDate > EXPIRATION_TIME_ACCESS_TOKEN;
}

async function getTokenObject() {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const token = await AsyncStorage.getItem('token');
  const token_date = await AsyncStorage.getItem('token_date');
  const accessToken_date = await AsyncStorage.getItem('accessToken_date');
  const username = await AsyncStorage.getItem('username');

  if (!accessToken || !token || !token_date || !accessToken_date || !username) {
      throw new Error('Not Authenticated');
  }

  return {
    accessToken,
    token,
    token_date,
    accessToken_date
  };
}


export async function getUserTokensAndName() {
  
  const tokenObject = getTokenObject()
  if (isTokenExpired(tokenObject) || isAccessTokenExpired(tokenObject)) {
      throw new Error('Not Authenticated');
  }

  return {
      token: tokenObject,
      username
  };
}

export async function removeSession() {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('token_date');
    await AsyncStorage.removeItem('accessToken_date');
    await AsyncStorage.removeItem('username' )
    console.log("Token Removed");
  } catch (error) {
    console.error("Error removing tokens: ", error);
  }
}