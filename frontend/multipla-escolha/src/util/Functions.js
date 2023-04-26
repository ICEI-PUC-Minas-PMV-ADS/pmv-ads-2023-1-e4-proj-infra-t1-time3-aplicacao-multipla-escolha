export function switchBoolean(boolean) {
    if (boolean == true) return false;
    if (boolean == false) return true;
    return null; 
}

export function formatarData(data, showHours = false) {

    if (data == null) return "Sem prazo";

    let separateData = data.split("-");

    let newData = separateData[2].substr(0, 2) + "/" + separateData[1] + "/" + separateData[0].substr(2,4);

    if (showHours) {
        newData += " - " + separateData[2].substr(3,5);
    }

    return newData;
}