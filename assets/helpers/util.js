export function formatNumber(data) {
    return data.toLocaleString('PT-br');
}

export function calcMedia() {

}

export function calcStatus(data, status) {

    let newArray = [];

    switch (status) {
        case "Confirmed":
            data.map((item) => {
                newArray.push(item.Confirmed)
            });
            break;
        case "Deaths":
            console.log("deaths");
            data.map((item) => {
                newArray.push(item.Deaths)
            });
            break;
        case "Recovered":
            console.log("recovered");
            data.map((item) => {
                newArray.push(item.Recovered)
            });
            break;
    }
    return _.sum(newArray);
}