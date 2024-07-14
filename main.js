//const API_KEY = `52a44242974f42108a4b865ae7206ff6`
let newsList = [];
const menus = document.querySelectorAll(".menus button, .side-menu-list button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let firstPage;
let lastPage;
let totalPages;




const getNews = async () => {
  try {
    url.searchParams.set("page",page);
    url.searchParams.set("pageSize",pageSize);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd",data);
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
    render();
    pagiNationRender();
    
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
  page = 1;
  
  await getNews();
  

};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  page = 1;
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

const pagiNationRender=()=>{
  let pagiNationHTML= ``;
  totalPages = Math.ceil(totalResults/pageSize);

  const pageGroup = Math.ceil(page/groupSize);


  lastPage = pageGroup * groupSize;

  
  
  if(lastPage>totalPages){
    lastPage = totalPages;
  }



  firstPage = lastPage - (groupSize - 1)<=0? 1:lastPage - (groupSize - 1);



 
 if (page > 1) {
  pagiNationHTML +=
  `<li class="page-item" onclick="moveToPrev()"><a class="page-link">&lt;&lt;</a></li>
   <li class="page-item" onclick="moveToPage(${page - 1})"><a class="page-link">이전</a></li>`;
}

for(let i=firstPage;i<=lastPage;i++){
    pagiNationHTML += `<li class="page-item ${i===page?"active": ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
}

if (page < totalPages) {
  pagiNationHTML += 
  `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link">다음</a></li>
   <li class="page-item" onclick="moveToNext()"><a class="page-link">&gt;&gt;</a></li>`;
}



document.querySelector(".pagination").innerHTML = pagiNationHTML;

};

const moveToPage = (pageNum) => {
  console.log("ga",pageNum);
  page = pageNum;
  getNews();
};

const moveToPrev = () => {
  if(page !=1){
    page =1;
  }
  getNews();
};

const moveToNext = () => {
  if(page != totalPages){
    page = totalPages;
  }
  
  getNews();
};

getLatestNews();