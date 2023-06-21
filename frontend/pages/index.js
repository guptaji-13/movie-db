import dynamic from 'next/dynamic'
const MovieList = dynamic(() => import('../components/MovieList'));

export default function Home() {
  return <MovieList />;
}
