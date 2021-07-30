import React, {useState} from 'react';
import './MovieRow.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export default ({title, items}) => {

    const [scrollx, setScrollx] = useState(-400);

    const handleLeftArrow = () =>{
        let x = scrollx + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollx(x);
    }
    const handleRightArrow = () =>{
        let x = scrollx - Math.round(window.innerWidth / 2);
        let listW= items.results.length * 150;
        if((window.innerWidth - listW > x)){
            x = (window.innerWidth - listW) - 60;
        }
        setScrollx(x)
    }

  return (
  <div className= "movieRow">
      <h2>{title}</h2>
        <div className="movieRow--Left" onClick={handleLeftArrow}>
            <NavigateBeforeIcon style={{fontSize: 50}}/>
        </div>
        <div className="movieRow--Rigth" onClick={handleRightArrow}>
            <NavigateNextIcon style={{fontSize: 50}}/>
        </div>

          <div className="movieRow--Listarea">
              <div className="moviewRow--list" style={{
                  marginLeft: scrollx,
                  width: items.results.length * 150

              }}>
              {items.results.length > 0 && items.results.map((item,key)=>(
                  <div key={key} className="movieRow--Item">
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                  </div>
              ))}
              </div>

          </div>
      
  </div>);
}