const API_KEY = ``
const getLatestNews = async () => {
    const url = new URL(
        `https://kp-news-api.netlify.app/`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log("rrrrr",response);
}

getLatestNews();