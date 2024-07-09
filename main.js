const API_KEY = ``
const getLatestNews = async () => {
    const url = new URL(
        ``
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("rrrrr",response);
}

getLatestNews();