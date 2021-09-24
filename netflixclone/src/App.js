import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default() => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  /*
  A função do React 'useEffect' faz o seguinte: Quando a tela carregar, ela executará o código que você colocar dentro dela.    
  */

  useEffect(() => {

    const loadAll = async () => {
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      console.log(list)
      setMovieList(list);

      //Pegando o Featured (filme em destaque no topo do site)
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
    
  }, []);

  //Faz o cabeçalho ficar preto quando você desce a página
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false)
      }

    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);


  return (

    <div className="page">
      
      <Header black={blackHeader} />

    {featuredData &&
      <FeaturedMovie item={featuredData} />
    }



      <section className="lists">

        
        {movieList.map((item,key) => (

         <MovieRow key={key} title={item.title} items={item.items} />
        ))

        }

      </section>
  
      <footer>
        Feito com <span role="img" aria-label="coração">S2</span> pela B7Web<br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos pelo site TheMovieDB
      </footer>

      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://i.pinimg.com/originals/f9/0f/76/f90f7689233948005f465d98ead56d44.gif" alt="Carregando" />
      </div>
      }
      
    </div>
  );
}
