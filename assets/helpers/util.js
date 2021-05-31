export function formatNumber(data) {
    return data.toLocaleString('PT-br');
}

export function calcMedia(data) {

    let d = 0;
    data.map((item) => {
        d += item;
    });

    let newArray = [];
    let media = d / data.length;
    for (let i = 0; i < data.length; i++) {
        newArray.push(media);
    }
    return newArray;
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
            data.map((item) => {
                newArray.push(item.Deaths)
            });
            break;
        case "Recovered":
            data.map((item) => {
                newArray.push(item.Recovered)
            });
            break;
    }
    return newArray;
}