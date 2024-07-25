export function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);
    
    // Define month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Extract day, month, and year
    const day = date.getUTCDate()+1;
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    // Define suffixes for day
    const daySuffixes = ["th", "st", "nd", "rd"];
    const relevantDigits = (day % 100) > 10 && (day % 100) < 20 ? 0 : day % 10;
    const daySuffix = daySuffixes[relevantDigits] || daySuffixes[0];

    // Return formatted date string
    return `${day}${daySuffix} of ${month} ${year}`;
}


export function getDriveName(driver){
    return driver.name + " " + driver.surnames
}

export const getStatusColor = (status) => {
    switch (status) {
      case 'WAITING':
        return '#FF9C01';
      case 'ACCEPTED':
        return '#6366f1';
      case 'REJECTED':
        return '#ec4899';
      default:
        return '#FFFFFF'; // default color if status is unknown
    }
  };