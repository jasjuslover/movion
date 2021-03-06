import React from 'react';
import './Poster.css';
import Rating from '../Rating/Rating';
import image from '../../images/icon/image.svg';


function Poster({movie, inGallery, more}) {

    if(more !== null){
        return(
            <a href={more}>
                <div class="explore center">
                    <h5>See All</h5>
                </div>
            </a>
        );
    }

    return(
        <a href={`/movie/${movie.id}`} className={(inGallery) ? 'poster' : 'poster poster-grid'}>
            {
                (movie.poster ===  null) ? 
                (<div class="default-poster">
                    <img src={image} alt="Poster"/>
                </div>
                ) : 
                (<div class="image">
                    <img src={movie.poster} alt="Poster"/>
                </div>)
            }
            <h5 class="title">{movie.title}</h5>
            <div class="chorizontal">
                <Rating rate={movie.rate}/>
                <h5 class="year">{movie.releaseYear}</h5>
            </div>
        </a>
    );
}
Poster.defaultProps = {
    movie: {
        poster: null,
        title: '',
        releaseYear: ''
    },
    inGallery: true,
    more: null,
}
export default Poster;