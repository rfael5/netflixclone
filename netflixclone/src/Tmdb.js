//Esse arquivo terá todas as informações para a requisição da API

const API_KEY = '40be86dbdeaeeb0a178eb9d75d5c4c97';
const API_BASE = 'https://api.themoviedb.org/3';

/* 
TIPOS DE FILMES/SERIES QUE IREMOS BUSCAR
- originais da netflix
- recomendados(trending)
- em alta(top rated)
- ação
- comedia
- terror
- romance
- documentários

*/

//Função que estabelece um padrão para fazer as requisições na API
const basicFetch = async (endpoint) => {

    //busca a url com a informação necessária passada como parâmetro
    const rec = await fetch(`${API_BASE}${endpoint}`);

    //converte a informação buscada para json
    const json = await rec.json();

    return json;
}

export default {
    //Função que busca e retorna as séries e seus generos específicos para o sistema
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trendings',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
},
//Função que busca as informações das séries, como descrição, número de temporadas, avaliação, etc.
//Essas informações serão mostradas na série em destaque no topo da página.
getMovieInfo: async (movieId, type) => {
    let info = {};

    if(movieId) {
        switch(type) {
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                
            break;

            case 'tv':
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);

            break;

            default:
                info = null;
                break;
        }
    }

    return info;
}
}