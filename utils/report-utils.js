import { getUsername } from "../context/SessionMaintainerGlobalProvider"


export const getMyInfoReport = (report, context) =>{
    const username = getUsername(context)
    
    if(report.infoReportDriverA.vehicle.plate == username){
      return report.infoReportDriverA
    }
    return report.infoReportDriverB

  }

  export const getOtherInfoReport = (report, context) =>{
    if(report.infoReportDriverA.vehicle.plate != getUsername(context)){
      return report.infoReportDriverA
    }
    return report.infoReportDriverB
  }

  export const filterReports = (reports, query) => {
    if (!query) return reports;
    const queryLower = query.toLowerCase();

    return reports.filter(report => {
      const dateMatch = new Date(report.date).toLocaleDateString().toLowerCase().includes(queryLower);
      const placeMatch = report.place.toLowerCase().includes(queryLower);
      const detailsMatch = report.details.toLowerCase().includes(queryLower);
      const driverAMatch = report.infoReportDriverA.driver.name.toLowerCase().includes(queryLower) ||
                           report.infoReportDriverA.driver.surnames.toLowerCase().includes(queryLower) ||
                           report.infoReportDriverA.driver.email.toLowerCase().includes(queryLower);
      const driverBMatch = report.infoReportDriverB.driver.name.toLowerCase().includes(queryLower) ||
                           report.infoReportDriverB.driver.surnames.toLowerCase().includes(queryLower) ||
                           report.infoReportDriverB.driver.email.toLowerCase().includes(queryLower);

      return dateMatch || placeMatch || detailsMatch || driverAMatch || driverBMatch;
    });
  };

  export const reportsFilters = [
    { label:"All", value:""},
    { label:"Waiting", value:"/waiting"},
    { label:"Acepted", value:"/accepted"},
    { label:"Rejected", value:"/rejected"},
  ]

  export const defaulReportFilter = { label:"All", value:""}