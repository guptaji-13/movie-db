import React from 'react';
import { useRouter } from 'next/router'

const MovieTile = ({movieData: { id, poster_path, original_title, release_date }}) => {
  const router = useRouter();
  return (
    <div className='relative' onClick={() => router.push(`/movie/${id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt='image'
      />
      {/* Overlay */}
      <div className='flex justify-center w-full h-full items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group'>
      <p className='text-gray-300 hidden group-hover:block'>
        <p>{original_title}</p>
        <p> {release_date}</p>
      </p>
      </div>
    </div>
  );
};

export default MovieTile;
