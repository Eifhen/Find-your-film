

export default async function RequestHandler(movie_title){
    const API_KEY = '8ccca75c';
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie_title}&page=1`;
    const request = await fetch(url);
    const arr = await request.json();

    if(arr.Response === 'False') return false;

    const data = arr.Search.map( item => GetData(API_KEY, item));
    return await Promise.all(data);
}

async function GetData(API_KEY, item){   
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${item.imdbID}&plot=full&page=1`;
    const request =  await fetch(url);
    return await request.json();
}