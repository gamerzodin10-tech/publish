import Image from 'next/image';
import Link from 'next/link';
import type { Restaurant } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './star-rating';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={restaurant.image.imageUrl}
              alt={`Photo of ${restaurant.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={restaurant.image.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">{restaurant.cuisine}</Badge>
          <CardTitle className="font-headline text-2xl mb-2 truncate">{restaurant.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{restaurant.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
             <StarRating rating={restaurant.rating} />
             <span className="text-sm text-muted-foreground">{restaurant.reviewsCount} reviews</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
