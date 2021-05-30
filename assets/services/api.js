const baseApi = axios.create({
    baseURL: "https://api.covid19api.com/"
});

export async function getSummary() {
    const res = await baseApi.get('summary');
    return res.data;
}

export async function getSummaryOfCountryPeriod(country, from, to) {
    const res = await baseApi.get(`country/${country}?from=${from}T00:00:00Z&to=${to}T00:00:00Z`);
    return res.data;
}