import RenderHandler from "./render.handler.js";
import StorageHandler from './storage.handler.js';

(()=>{
    'use strict';

    let watchlist = StorageHandler.Get('watchlist') ? StorageHandler.Get('watchlist') : [];
    const clearBtn = document.getElementById('clear-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    clearBtn.addEventListener('click', Clear);
    function Clear(){
        clearBtn.disabled = true;
        watchlist = [];
        StorageHandler.Remove('watchlist');
        clearBtn.disabled = false;
        RenderHandler('main', watchlist, 'watchlist');
    }

    function SetRemoveItemBtns(){
        if(watchlist.length > 0){
            const btns = document.querySelectorAll('.btn-watchlist');
            btns.forEach( btn => { 
                btn.addEventListener('click', RemoveItem );
            })
        
            function RemoveItem(item){
                const id = item.target.getAttribute('data-id');
                watchlist = watchlist.filter( movie => movie.imdbID !== id);
                StorageHandler.Add('watchlist', watchlist);
                RenderHandler('main',  watchlist, 'watchlist');
                SetRemoveItemBtns();

                toast.classList.add('d-inline-block');
                toastMsg.textContent = 'The movie has been removed from the watchlist';
                setTimeout(()=>{
                    toast.classList.remove('d-inline-block');
                    toastMsg.textContent = '';
                }, 1500)
            }
        }
    }

    RenderHandler('main', watchlist, 'watchlist');
    SetRemoveItemBtns();

})();