
export default function CardComponent (props, watchlist) {

    if(watchlist === 'watchlist'){
        return `
        <div class="card ">
                <img class="card-img" src="${props?.Poster}" alt="${props?.Title}">
                <div class="card-content">
                    <div class="card-header">
                        <div class="mb-1 d-flex align-items-center">
                            <h1 class="card-title" title="${props?.Title}">${props?.Title}</h1>
                            <h6 class="card-year">${props?.Year}</h6>
                            <span class="star-icon">
                                <i class="ri-star-fill"></i>
                                ${props?.imdbRating}
                            </span>
                        </div>
                        <div class="elements-list">
                            <time>${props?.Runtime}</time>
                            <span class="tag-list" title="${props?.Genre}">
                                ${props?.Genre}
                            </span>
                            <button class="btn-watchlist" data-id="${props?.imdbID}">
                                <i class="ri-indeterminate-circle-fill ri-xl"></i>
                               Remove
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p title="${props?.Plot}">
                          ${props?.Plot} 
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    else{
        return `
        <div class="card ">
            <img class="card-img" src="${props?.Poster}" alt="${props?.Title}">
            <div class="card-content">
                <div class="card-header">
                    <div class="mb-1 d-flex align-items-center">
                        <h1 class="card-title" title="${props?.Title}">${props?.Title}</h1>
                        <h6 class="card-year">${props?.Year}</h6>
                        <span class="star-icon">
                            <i class="ri-star-fill"></i>
                            ${props?.imdbRating}
                        </span>
                    </div>
                    <div class="elements-list">
                        <time>${props?.Runtime}</time>
                        <span class="tag-list" title="${props?.Genre}">
                            ${props?.Genre}
                        </span>
                        <button class="btn-watchlist" data-id="${props?.imdbID}">
                            <i class="ri-add-circle-fill ri-xl"></i>
                            Watchlist
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <p title="${props?.Plot}">
                    ${props?.Plot} 
                    </p>
                </div>
            </div>
        </div>
        `;

    }

    
}