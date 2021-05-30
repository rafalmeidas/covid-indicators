import { getSummary, getSummaryOfCountryPeriod } from "../services/api.js";
import { formatNumber, calcStatus } from "../helpers/util.js"

(() => {
    (async () => {
        let summary = await getSummary();
        populateCombo(summary.Countries);
        populateKpi();
    })()
})();

function populateKpi() {
    let [dateStartE, dateEndE, comboCountryE, comboDataE, kpiConfirmedE, kpiDeathsE, kpiRecoveredE] = document.querySelectorAll("#date_start, #date_end, #cmbCountry, #cmbData, #kpiconfirmed, #kpideaths, #kpirecovered");

    document.getElementById("filtro").addEventListener("click", async function () {
        let summaryOfCountry = await getSummaryOfCountryPeriod(comboCountryE.value, dateStartE.value, dateEndE.value);
        console.log(summaryOfCountry);

        //Ultimo registro para os KPI
        let lastCountryRegister = _.findLast(summaryOfCountry);

        kpiConfirmedE.innerText = formatNumber(lastCountryRegister.Confirmed);
        kpiDeathsE.innerText = formatNumber(lastCountryRegister.Deaths);
        kpiRecoveredE.innerText = formatNumber(lastCountryRegister.Recovered);

        let linhas = new Chart(document.getElementById("linhas"), {
            type: "line",
            data: {
                //Eixo X
                labels: [],
                //Eixo Y
                datasets: [
                    //total
                    {
                        label: "",
                        data: [],
                        backgroundColor: "rgb(255,143,19)",
                        borderColor: "",
                    },
                    //média
                    {
                        label: "",
                        data: [],
                        backgroundColor: "rgb(255,10,10)",
                        borderColor: "",
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
        })
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