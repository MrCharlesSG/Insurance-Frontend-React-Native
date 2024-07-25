import { SPRING_BACKEND_URL } from "./spring-backend-config";
import axios from 'axios';
import { getAccessToken } from "./sb-token";

export async function getDrivers(context){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  console.log(authHeader)
    const response = await axios.get(SPRING_BACKEND_URL+'driver', {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}

export async function getDriversByVehicle(context, vehicle){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'driver/byVehicle?plate='+vehicle
    const response = await axios.get(url, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}

export async function getDriversByEmail(context, email){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'driver/byEmail?email=' + email
    const response = await axios.get(url, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}

export async function createDriver(context, driver){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'driver'
    const response = await axios.post(url, driver, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}

export async function associateDriverByEmail(context, email){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'driver/associate'
  console.log(url)
  console.log(email)
  const response = await axios.post(url, { email: email }, {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json'
    },
  });
    
    return response.data
}

export async function dissociateDriverByEmail(context, email){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'driver/disassociate'
  console.log(url)
  console.log(email)
  const response = await axios.delete(url, {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json'
    },
    data:{
      email
    }
  });
    
    return response.data
}



