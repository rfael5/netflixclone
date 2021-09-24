import React from 'react';
import './FeaturedMovie.css'

export default ({item}) => {

    //Variável com a primeira data de exibição da série
    let firstDate = new Date(item.first_air_date);

    //Lista que conterá os gêneros da série
    let genres = [];
    for(let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    //Variável que conterá a descrição da série
    let description = item.overview;

    //Corta uma parte da descrição caso esta seja muito grande
    if(description.length > 200) {
        description = description.substring(0, 200) + '...'
    };

    return (
        
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">

                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">
                        {description}
                    </div>
                    <div className="featured--buttons">

                        <a href={`/watch/${item.id}`} className="featured--watchbutton">Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>

                    </div>

                    <div className="featured--genres">
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                    
                </div>
            </div>
        </section>
    );
}