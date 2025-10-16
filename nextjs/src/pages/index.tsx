import { Loading } from '@/components/common/Loading';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MovieList } from '@/components/MovieList';
import { usePopularMovies } from '@/hooks/queries/usePopularMovies';
import Head from 'next/head';

export default function Home() {
  const { data: movies, isLoading } = usePopularMovies();

  if (isLoading === true) {
    return <Loading />;
  }

  if (movies == null || movies.length === 0) {
    return <div>영화 정보를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      <Head>
        <title>SSR로 버무린 영화 리뷰</title>
        <meta name="description" content="최신 영화 목록을 확인해보세요!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="wrap">
        <Header featuredMovie={movies[0]} />
        <MovieList movies={movies} />
        <Footer />
      </div>
    </>
  );
}
