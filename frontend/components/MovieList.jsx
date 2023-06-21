import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MovieTile from './MovieTile';
import {getPopularMovies, searchMovies} from '../constants';

const MovieList = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [imgArray, setImgArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(1);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disablePrevButton, setDisablePrevButton] = useState(false);
  // const [sort_by, setSort_by] = useState("popularity");
  // const [order, setOrder] = useState("desc");
  function handleChange(event) {
    setQuery(event.target.value);
  }
  function getMovies(api) {
    setLoading(true);
    const params = getSearchParams();
    console.log(params);
    axios.get(api, {
      params: {
        ...params
      }
    }).then((response)=> {
      setLoading(false);
      setImgArray(response.data.results);
      setTotalPages(Math.min(response.data.pages, 500));
      setTotalEntries(Math.min(response.data.items, 10000));
      if(page>=Math.min(response.data.pages, 500)) setDisableNextButton(true);
      else setDisableNextButton(false);
      if(page==1) setDisablePrevButton(true);
      else setDisablePrevButton(false);
    }).catch((err)=> {
      console.log(err)
    });
  }
  function handleSearch() {
    page = 1;
    setPage(1);
    getMovies(searchMovies);
  }
  function getSearchParams(){
    const params = {page}
    if (query)
      params.query = query
    return params
  }
  function goToNextPage() {
    setPage(page+=1);
    if (query)
      getMovies(searchMovies);
    else
      getMovies(getPopularMovies);
  }
  function goToPrevPage() {
    setPage(page-=1);
    if (query)
      getMovies(searchMovies);
    else
      getMovies(getPopularMovies);
  }
  useEffect(()=> {
    getMovies(getPopularMovies);
  }, [])
  
  return (
    <div className='max-w-[1240px] mx-auto text-center py-10'>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Movie DB</h1>
      <div>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" name="query" value={query} onChange={handleChange} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies" required/>
          <button type="button" onClick={handleSearch} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
      <div className='max-w-[1240px] mx-auto text-center py-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-4'>
          {
            (loading)
            ? 
              <img class="mx-auto" src="https://media.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif"/>
            :
              (
                (imgArray.length==0) 
                ? 
                  <h6 class="mb-1 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white">No Movies Found</h6>
                : 
                  imgArray.map(img => <MovieTile movieData={img} key={img.id} />)
              )
          }   
        </div>
      </div>
      <div className='flex flex-col text-left my-2'>
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-900 dark:text-white">{Math.min(totalEntries, (page-1)*20+1)}</span> to <span class="font-semibold text-gray-900 dark:text-white">{Math.min(totalEntries, page*20)}</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalEntries}</span> Entries
        </span>
      </div>
      <div className="flex flex-row mx-auto te">
        <button type="button" onClick={goToPrevPage} disabled={disablePrevButton} className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
          <div className="flex flex-row align-middle">
            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <p className="ml-2">Prev</p>
          </div>
        </button>
        <button type="button" onClick={goToNextPage} disabled={disableNextButton} className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
          <div className="flex flex-row align-middle">
            <span className="mr-2">Next</span>
            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default MovieList