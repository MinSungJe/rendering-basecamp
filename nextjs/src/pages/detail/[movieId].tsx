import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Home from '..';
import { useMovieDetailModal } from '@/hooks/useMovieDetailModal';
import { moviesApi } from '@/api/movies';

export default function MovieDetailPage() {
  return (
    <>
      <Home />
      <DetailPageOpenModal />
    </>
  );
}

function DetailPageOpenModal() {
  const { movieId } = useParams();
  const { openMovieDetailModal } = useMovieDetailModal();
  const onceRef = useRef(false);

  useEffect(() => {
    if (movieId == null || onceRef.current === true) {
      return;
    }
    (async () => {
      onceRef.current = true;
      const movieDetail = await moviesApi.getDetail(Number(movieId));
      openMovieDetailModal(movieDetail.data);
    })();
  }, [movieId, openMovieDetailModal]);

  return null;
}
