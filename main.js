//const API_KEY = `52a44242974f42108a4b865ae7206ff6`
let news=[]
const getLatestNews = async () => {
   // const url = new URL(`https://kp-news-api.netlify.app/top-headlines`);
    let url = `https://kp-news-api.netlify.app/top-headlines`
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles
    console.log("rrrrr",news);
}

getLatestNews();