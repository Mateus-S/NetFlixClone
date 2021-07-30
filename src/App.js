import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MoviewRow from './Components/MovieRow';
import FeatureMovie from './Components/FeatureMovie';
import Header from './Components/Header';
export default() =>{

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(()=> {
    const loadAll = async() =>{
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
    setMovieList(list);
      //Pegando o Featured

      let originals = list.filter(i=>i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeatureData(chosenInfo)
      console.log(chosenInfo);

    }
    loadAll()
  },[]);

  useEffect(()=> {
    const scrollListener =() =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className="page" >
      
      <Header black = {blackHeader}/>
      {
      featureData &&
      <FeatureMovie item={featureData}/>
      }

      <section className="lists">
        {
          movieList.map((item,key)=>(
            <MoviewRow key={key} title={item.title} items={item.items} />
          ))
        }
      </section>

      <footer>
        Um aprendizado sobre React Css Html e API feitos por Mateus Santos  <br/>
        Direitos de Imagem e API para NetFlix e TMDB.ORG <br/>
        Creditos ao Professor Bonieky Lacerda!!!

      </footer>
      { movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"></img>
        </div>
      }
    </div>
  )
}