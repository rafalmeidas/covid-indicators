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
    let summaryCountriesFilter = [];

    summaryCountries.map((item)=> {
        summaryCountriesFilter.push(item.Country[item.TotalDeaths])
    });

    console.log(summaryCountriesFilter);

    let [confirmedE, deathE, recoveredE, dateE] = document.querySelectorAll("#confirmed, #death, #recovered, #date");

    confirmedE.innerText = formatNumber(summaryGlobal.TotalConfirmed);
    deathE.innerText = formatNumber(summaryGlobal.TotalDeaths);
    recoveredE.innerText = formatNumber(summaryGlobal.TotalRecovered);
    dateE.innerText = `${summaryGlobal.Date}`; //utilizar dados já contidos no campo e date-fns

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

    let bars = new Chart(document.getElementById("barras"), {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: "##9966FF"
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
                    text: 'Total de Mortes por país - TOP 10'
                }
            }
        }
    });
}