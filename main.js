//const API_KEY = `52a44242974f42108a4b865ae7206ff6`
let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`)



const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
    render();
    }
    else {
      throw new Error(data.message);
    }
    
  } catch (error) {
    errorRender(error.message);
  }
  
}

const getLatestNews = async () =>{
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
  await getNews();
    
}

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
  await getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  await getNews();
};


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

  const onErrorImg = (e) => {
	e.target.src = "noimages.png";
}

const render = () => {
    const newsHTML = newsList.map((news)=>
        `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}" onerror="this.src='noimages.png'"/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description==null||news.description==""?"내용 없음":news.description.length>200?news.description.substring(0,200)+'...':news.description}</p>
        <div>${news.source.name=='[Removed]'||news.source.name==null?"no source":news.source.name} * ${moment(news.publishedAt).startOf('day').fromNow()}</div>
    </div>
</div>`).join("");
    
    document.getElementById("news-board").innerHTML=newsHTML;
};

const errorRender =(errorMessage)=>{
  const errorHTML = 
    `<div class="alert alert-danger" role="alert">${errorMessage}</div>`;

    document.getElementById("news-board").innerHTML=errorHTML
};



getLatestNews();