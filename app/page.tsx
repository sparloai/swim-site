import { Hero } from '@/components/home/Hero';
import { FeaturedMusic } from '@/components/home/FeaturedMusic';
import { FilmPromo } from '@/components/home/FilmPromo';
import { ShowsPreview } from '@/components/home/ShowsPreview';
import { PhotoGallery } from '@/components/home/PhotoGallery';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMusic />
      <FilmPromo />
      <PhotoGallery />
      <ShowsPreview />
    </>
  );
}
