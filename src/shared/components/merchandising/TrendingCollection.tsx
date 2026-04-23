/**
 * Horizontal list section wrapper.
 */
import { Link } from "react-router-dom";

type TrendingCollectionProps = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  to: string;
};

export function TrendingCollection(props: TrendingCollectionProps) {
  const { name, imageSrc, imageAlt, to } = props;

  return (
    <article className="flex flex-col items-center gap-3">
      <Link to={to} className="w-full" aria-label={`Voir ${name}`}>
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-black/5">
          <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      </Link>
      <h3 className="text-center text-lg font-bold text-black-80">{name}</h3>
    </article>
  );
}
