import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {getMovieDetails} from '../constants';

const MovieDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if(!id) {
      return;
    }
    setLoading(true);
    axios.get(getMovieDetails, {
      params: {id}
    }).then((response)=> {
      setDetails(response.data);
      setLoading(false);
    }).catch((err)=> {
      console.log(err)
    });
  }, [id])
  return (
    (loading)
    ? 
      <img class="mx-auto" src="https://media.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif"/>
    :
      <div class="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-6xl">
        <div class="md:flex">
          <div class="md:shrink-0">
            <img class="md:w-48 h-full object-cover md:w-full" src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.original_title}/>
          </div>
          <div class="flex flex-col p-8">
          <h3 class="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200 movie--title">{details.original_title}</h3>
            <span class="movie--year text-xl lg:text-sm text-gray-200 lg:mb-4">{details.release_date}</span>
            <span class="movie--runtime text-xl lg:text-sm text-gray-200 lg:mb-4">Runtime: {details.runtime} mins</span>
            <p class="mt-2 text-slate-500">{details.overview}</p>
          </div>
        </div>
      </div>
  )
};

export default MovieDetails;