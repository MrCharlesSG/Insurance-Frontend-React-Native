import { SPRING_BACKEND_URL } from "./spring-backend-config";
import axios from 'axios';
import { getAccessToken } from "./sb-token";


export async function getVehicleByPlate(context, plate){
    const accessToken = await getAccessToken(context)
    const authHeader = 'Bearer ' + accessToken
    const url = SPRING_BACKEND_URL+'vehicles/byPlate?plate=' + plate
    const header = {
      Authorization: authHeader
    }
    const response = await axios.get(url, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
 }