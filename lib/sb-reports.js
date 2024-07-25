import { SPRING_BACKEND_URL } from "./spring-backend-config";
import axios from 'axios';
import { getAccessToken } from "./sb-token";
import { defaulReportFilter } from "../utils/report-utils";

export async function getReports(context, filter){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'report' + filter
  console.log(url)
    const response = await axios.get(url, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}


export async function acceptReport(context, reportId, damages){
  const accessToken = await getAccessToken(context)
  const authHeader = 'Bearer ' + accessToken
  const url = SPRING_BACKEND_URL+'report/accept/' + reportId
  const body = {
    damages
  }
  const header = {
    Authorization: authHeader
  }
  await axios.delete(url, {headers: header, data: body})
      .then(response => (response.data))
      .catch(error => {
        throw new error.message
      })
}


export async function rejectReports(context, reportId){
  const accessToken = await getAccessToken(context)
  const url = SPRING_BACKEND_URL+'report/reject/' + reportId
  const authHeader = 'Bearer ' + accessToken
    const response = await axios.delete(url, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}

export async function openReport(context, newReport){
  const accessToken = await getAccessToken(context)
  console.log("THe new report " + JSON.stringify(newReport))
  const url = SPRING_BACKEND_URL+'report'
  const authHeader = 'Bearer ' + accessToken
    const response = await axios.post(url, newReport, {
        headers: {
          Authorization: authHeader,
        },
      });
    
    return response.data
}



