
import RequestHandler from "./request.handler.js";
import StorageHandler from "./storage.handler.js";
import RenderHandler from "./render.handler.js";
import IntroHandler from "./intro.handler.js";

(() => {

    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    const watchlistCount = document.getElementById('watchlist-count');
    const searchBox = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-btn');
    const storedElements = StorageHandler.Get('movies');
    let watchlistCounter = StorageHandler.Get('watchlist') ? StorageHandler.Get('watchlist').length : 0 ;
    let searches = storedElements ? storedElements : [];
    searchBtn.addEventListener('click', Search);
    clearBtn.addEventListener('click', Clear);
    searchBox.addEventListener('keypress', PressEnter);
    IntroHandler(true);

    function PressEnter(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            searchBtn.click();
        }
    }
    
    async function Search() {
        searchBtn.disabled = true;
        IntroHandler(false)

        if(searchBox.value){
            const obj = await RequestHandler(searchBox.value.trim());
            searchBox.value = '';
            if(obj === false){
                IntroHandler(true, 'not-found');
                RenderHandler('main', searches);
                searchBtn.disabled = false;
                return;
            }
            
            searches = obj;
            StorageHandler.Add('movies', searches);
            RenderHandler('main', searches);
            SetWatchlistButtons();
        }
        searchBtn.disabled = false;
    }

    function Clear(){
        clearBtn.disabled = true;
        searches = [];
        StorageHandler.Remove('movies');
        clearBtn.disabled = false;
        IntroHandler(true)
        RenderHandler('main', searches);
        // watchlistCounter = 0;
        // watchlistCount.classList.remove('d-flex');
        // watchlistCount.textContent = '';
    }

    function SetWatchlistButtons(){
       
        if(watchlistCounter){
            watchlistCount.classList.add('d-flex');
            watchlistCount.textContent = watchlistCounter;
        }

        if(searches.length > 0 ){
            IntroHandler(false)
            const stored = StorageHandler.Get('watchlist');
            const arr = stored ? stored : [];
            const watchlistBtns = document.querySelectorAll('.btn-watchlist');
            watchlistBtns.forEach( btn => {
                btn.addEventListener('click', AddToWatchList );
            });

            function AddToWatchList(event){
                event.target.disabled = true;
                const id = event.target.getAttribute('data-id');
                const obj = searches.find( item => item.imdbID === id);
                if(arr.some(movie => movie?.imdbID === id) === false){
                    arr.unshift(obj);
                    StorageHandler.Add('watchlist', arr);
                    toast.classList.add('d-inline-block');
                    toastMsg.textContent = `The movie "${obj?.Title}" has been added to the watchlist`;
                    watchlistCount.classList.add('d-flex');
                    watchlistCount.textContent = ++watchlistCounter;
                    setTimeout(()=>{
                        toast.classList.remove('d-inline-block');
                        toastMsg.textContent = '';
                        event.target.disabled = false;
                    }, 1500)
                }
                else{
                    toast.classList.add('d-inline-block');
                    toastMsg.textContent = `This movie is already on the watchlist`;
                    setTimeout(()=>{
                        toast.classList.remove('d-inline-block');
                        toastMsg.textContent = '';
                        event.target.disabled = false;
                    }, 1500)
                }
            }
        }
    }

    
    RenderHandler('main', searches);
    SetWatchlistButtons();


})();