import dynamic from 'next/dynamic'
const MovieDetails = dynamic(() => import("../../components/MovieDetails"));

export default function Movie() {
  return <MovieDetails />;
}