import { getSummary } from "../services/api.js";
import { formatNumber } from "../helpers/util.js"

(() => {
    (async () => {
        let summary = await getSummary();
        populateGlobal(summary);
    })()
})()

function populateGlobal(data) {
    let summaryGlobal = data.Global;
    let summaryCountries = data.Countries;

    let [confirmedE, deathE, recoveredE, dateE] = document.querySelectorAll("#confirmed, #death, #recovered, #date");

    //KPI
    confirmedE.innerText = formatNumber(summaryGlobal.TotalConfirmed);
    deathE.innerText = formatNumber(summaryGlobal.TotalDeaths);
    recoveredE.innerText = formatNumber(summaryGlobal.TotalRecovered);
    dateE.innerText = `${summaryGlobal.Date}`; //utilizar dados já contidos no campo e date-fns

    //Gráfico de pizza
    let pizza = new Chart(document.getElementById("pizza"), {
        type: 'pie',
        data: {
            labels: ["Confirmados", "Recuperados", "Mortes"],
            datasets: [
                {
                    data: [summaryGlobal.NewConfirmed, summaryGlobal.NewRecovered, summaryGlobal.NewDeaths],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCD56"]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                }
            }
        }
    });

    //Ordenando por total de mortes, e pegando da posição 0 a 10
    let top10DeathsOfCountries = _.slice(_.orderBy(summaryCountries, 'TotalDeaths', 'desc'), 0, 10);

    //Países
    let countries = top10DeathsOfCountries.map((item) => {
        let countries = [];
        countries.push(item.Country);

        return countries;
    });

    //Total de mortes
    let totalDeaths = top10DeathsOfCountries.map((item) => {
        let totalDeaths = [];
        totalDeaths.push(parseInt(item.TotalDeaths));

        return totalDeaths;
    });

    //Gráfico de TOP 10
    let bars = new Chart(document.getElementById("barras"), {
        type: 'bar',
        data: {
            labels: [
                countries[0], countries[1], countries[2], countries[3], countries[4], countries[5], countries[6], countries[7], countries[8], countries[9]
            ],
            datasets: [
                {
                    label: "Número de Mortes",
                    data: [parseInt(totalDeaths[0]), parseInt(totalDeaths[1]), parseInt(totalDeaths[2]), parseInt(totalDeaths[3]), parseInt(totalDeaths[4]), parseInt(totalDeaths[5]), parseInt(totalDeaths[6]), parseInt(totalDeaths[7]), parseInt(totalDeaths[8]), parseInt(totalDeaths[9])],
                    backgroundColor: "rgb(153, 102, 255)"
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Total de Mortes por país - Top 10'
                },
            }
        }
    });
}