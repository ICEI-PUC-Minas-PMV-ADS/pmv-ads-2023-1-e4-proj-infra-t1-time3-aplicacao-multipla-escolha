export function switchBoolean(boolean) {
    if (boolean == true) return false;
    if (boolean == false) return true;
    return null; 
}

export function formatarData(data, showHours = false) {

    let dateInUtc = new Date(data).toString().substring(0,25) + "UTC";

    let formatedDate = new Date(dateInUtc).toLocaleString().replace(",", " -");

    return formatedDate;
}