import { getSummary, getSummaryOfCountryPeriod } from "../services/api.js";
import { formatNumber, calcStatus, calcMedia } from "../helpers/util.js";

(() => {
    (async () => {
        let summary = await getSummary();
        populateCombo(summary.Countries);
        populateKpi();
    })()
})();

let linhas = new Chart(document.getElementById("linhas"));

function populateKpi() {
    let [dateStartE, dateEndE, comboCountryE, comboDataE, kpiConfirmedE, kpiDeathsE, kpiRecoveredE] = document.querySelectorAll("#date_start, #date_end, #cmbCountry, #cmbData, #kpiconfirmed, #kpideaths, #kpirecovered");

    document.getElementById("filtro").addEventListener("click", async function () {
        //pegando um dia a menos para fazer o calculo
        let dateInitial = dateFns.addDays(dateStartE.value, -1);

        let summaryOfCountry = await getSummaryOfCountryPeriod(comboCountryE.value, dateInitial, dateEndE.value);
        console.log(summaryOfCountry);

        let dateArray = [];
        let summaryArray = calcStatus(summaryOfCountry, comboDataE.value);

        //Array com as datas e total por dia
        summaryOfCountry.map((item) => {
            let date = new Date(item.Date);
            //Ajuste de timezone
            let dateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000)

            dateArray.push(dateFns.format(dateOnly, "YYYY-MM-DD"));
        });

        //Retirando primeiro elemento usado somente para calculo
        dateArray = _.slice(dateArray, 1, dateArray.length);

        // Separando por números diários
        let total = [];
        for (var i = 1; i < summaryArray.length; i++) {
            let val = summaryArray[i] - (summaryArray[i - 1])
            total.push(val);
        }

        //Media
        let media = calcMedia(total);

        let tagNum;
        let tagMedia;

        switch (comboDataE.value) {
            case "Confirmed":
                tagNum = "Número de Confirmados";
                tagMedia = "Média de Confirmados";
                break;
            case "Deaths":
                tagNum = "Número de Mortes";
                tagMedia = "Média de Mortes";
                break;
            case "Recovered":
                tagNum = "Número de Recuperados";
                tagMedia = "Média de Recuperados"
                break;
        }

        //Ultimo registro para os KPI
        let lastCountryRegister = _.findLast(summaryOfCountry);

        kpiConfirmedE.innerText = formatNumber(lastCountryRegister.Confirmed);
        kpiDeathsE.innerText = formatNumber(lastCountryRegister.Deaths);
        kpiRecoveredE.innerText = formatNumber(lastCountryRegister.Recovered);

        linhas.destroy();
        linhas = new Chart(document.getElementById("linhas"), {
            type: "line",
            data: {
                //Eixo X
                labels: dateArray,
                //Eixo Y
                datasets: [
                    //total
                    {
                        label: tagNum,
                        data: total,
                        backgroundColor: "#DDD",
                        borderColor: "rgb(255,143,19)",
                    },
                    //média
                    {
                        label: tagMedia,
                        data: media,
                        backgroundColor: "#DDD",
                        borderColor: "rgb(255,10,10)",
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Curva Diária de Covid-19'
                    },
                }
            }
        });
        linhas.update();
    });
}

function populateCombo(data) {
    //Pegando combo de País
    let comboE = document.getElementById("cmbCountry");

    data.map((item) => {
        let optionE = document.createElement("option");
        optionE.value = item.Slug;
        optionE.text = item.Country;
        comboE.appendChild(optionE);
    });
}

function updateGraph() {

}