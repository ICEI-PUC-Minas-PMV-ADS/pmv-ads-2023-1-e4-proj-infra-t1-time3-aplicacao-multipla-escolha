export function switchBoolean(boolean) {
  if (boolean == true) return false;
  return true;
}

export function formatarData(data, showHours = false) {

    if (data == null) {
      return "Sem prazo";
    }

    let dateInUtc = new Date(data).toString().substring(0,25) + "UTC";

    let formatedDate = new Date(dateInUtc);

    let displayDate = (formatedDate.getDate() < 10 ? "0" : "") + formatedDate.getDate() + '/' + ((formatedDate.getMonth() + 1) < 10 ? "0" : "") + (formatedDate.getMonth() + 1) + '/' + formatedDate.getFullYear();

    if (showHours) {
      displayDate = displayDate + " " + (formatedDate.getHours() < 10? "0" : "") +formatedDate.getHours() + ':' + (formatedDate.getMinutes() < 10? "0" : "") + formatedDate.getMinutes();
    }

    return displayDate;
}

export function encurtarTexto(descricao, maxLength) {
    if (descricao.length > maxLength) {
        descricao = descricao.substr(0, maxLength) + "...";
    }
    return descricao;
}