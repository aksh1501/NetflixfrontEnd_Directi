function whole()
{

  fetch('https://demo0376970.mockable.io/movieslist',{
    method: "GET"
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        entirePage(data);
        createMapping(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


const ApiKey="109daa35";

let showTitle,releaseDate,description;

let movieDetails=new Map();

function createMapping(data){
  const allShows=data["shows"];

  // console.log(allShows);

  allShows.forEach((show)=>{
    // console.log(show['imdbID']);
    GetMovieInfo(ApiKey ,show['imdbID'],movieDetails);
  });
  // console.log(movieDetails);
}

function GetMovieInfo(api,id,cache){

  let url='http://www.omdbapi.com/?apikey='+api+'&i='+id;
  fetch(url,{
    method: "GET"
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        // console.log(id,data);
        // console.log(cache);
        cache[id]=data;
      });
    }
  )
  .catch(function(err) {
    console.log("idk");
    console.log('Fetch Error :-S', err);
  });

}
  // console.log(varbl);





function entirePage(objectFromJson){

    function showTemplate(show) 
    {
        return `<li class="flex-item">
            <article class="showContent">
            <img class="showImage" src="./img/posters/${show.poster}">
            <h3 class="showTitle">${show.title}</h3>
            <h4 class="releaseYear">(${show.year} )</h4>
            <h5 class="noShow">${show.imdbID}</h4>
            <h6 class="noShow">${show.trailer}</h4>
            <p class="showDescription">${show.description}</p>
            </article>
        </li>`;

  }

  function handleClick()
  {
    console.log(movieDetails);
    // console.log(arguments[0]["target"].getElementsByTagName('h6')[0].innerText);
    const imdbId=arguments[0]["target"].getElementsByTagName('h5')[0].innerText;
    // console.log(imdbId);
    // const showTitle=arguments[0]["target"].getElementsByTagName('h3')[0].innerHTML; 
    const showTitle=movieDetails[imdbId]['Title'];  
    // const releaseDate=arguments[0]["target"].getElementsByTagName('h4')[0].innerHTML; 
    const releaseDate=movieDetails[imdbId]['Released']
    // const description=arguments[0]["target"].getElementsByTagName('p')[0].innerHTML;  
    const description=movieDetails[imdbId]['Plot'];  
    
    const imagePath=arguments[0]["target"].getElementsByTagName('img')[0].src;
    
    const trailer=arguments[0]["target"].getElementsByTagName('h6')[0].innerText;

    console.log(trailer);

    const trailerUrl="https://www.youtube-nocookie.com/embed/"+trailer;

    const rating=movieDetails[imdbId]['Ratings'][0].Value;

    // console.log(movieDetails[imdbId]['Ratings'][0]);
    // console.log(blk.getElementsByTagName("h3")[0].innerHTML,"clicked");
    const pageView=document.getElementsByClassName("flex-container")[0];
   
    pageView.classList.add("noShow");

    document.getElementById("entireContent").innerHTML=`
    <ul class="moviePage">
      <li class="titlePageHead">${showTitle}</li>
      <li class="releaseDate">${releaseDate}</li>
      <li class="rating">Rating ${rating}</li>
      <li>
        <img class="titleImage" src=${imagePath}>
      </li>
      <li>${description}</li>
    </div>
    <p align="center"><iframe class="trailerVideo" src=${trailerUrl} fullscreen=""></iframe></p>`;
  
  }

  
  const showData=objectFromJson['shows'];

//adding a better naming for the id of search element
document.getElementById("entireContent").innerHTML=`<ul id="myul" class="flex-container">
${showData.map(showTemplate).join("")}
</ul>`;

const movieBlock=document.querySelectorAll(".flex-item");

// console.log(movieBlock);

movieBlock.forEach((blk)=>{
  // console.log(blk.getElementsByTagName("h3")[0].innerHTML);
  // console.log(blk);
  blk.removeEventListener('click',handleClick);
  blk.addEventListener('click',handleClick);
});

//adding event handler in the javascript file
let searchKey=document.getElementsByClassName("my-input")[0];

let searchImplementation=function(){
    let inputText, filteredText, ulElementData, liElementData, idx, aElementData, eachShowTitle;

        inputText = document.getElementsByClassName("my-input")[0];
        // console.log(input);
        filteredText = inputText.value.toUpperCase();
        ulElementData = document.getElementById("myul");
        liElementData = ulElementData.getElementsByTagName("li");

        for (idx = 0; idx < liElementData.length; idx++) {
            aElementData = liElementData[idx].getElementsByTagName("h3")[0];
            eachShowTitle = aElementData.textContent || aElementData.innerText;

            if (eachShowTitle.toUpperCase().indexOf(filteredText) > -1) {
                liElementData[idx].style.display = "";
            }
            else {
                liElementData[idx].style.display = "none";
            }
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function debounced() { 
            var context = this;
            console.log(context);
            var args = arguments;
      
            function later() {
              func.apply(context, args);
            }
            if (timeout) {
              clearInterval(timeout);
            }
            timeout = setTimeout(later, wait);
        }
      }

    var debouncedSearch=debounce(searchImplementation,700);


    searchKey.oninput=() => {
        let textEntered=searchKey.value;
        
        if(textEntered!=='' && textEntered.length>=2)
        {
            debouncedSearch();
        }

    }
}

}

whole();