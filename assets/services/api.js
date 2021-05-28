const baseApi = axios.create({
    baseURL: "https://api.covid19api.com/"
});

export async function getSummary() {
    const res = await baseApi.get('summary');
    return res.data;
}