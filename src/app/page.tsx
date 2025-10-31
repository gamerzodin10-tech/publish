import Image from 'next/image';
import { restaurants } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RestaurantCard } from '@/components/restaurant-card';
import { RestaurantSuggestionForm } from '@/components/ai/restaurant-suggestion-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const topRestaurants = restaurants.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] text-center flex flex-col justify-center items-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            FoodBuzz
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Order, Rate, and Donate - The Foodie Way
          </p>
           <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#restaurants">Explore Restaurants</Link>
          </Button>
        </div>
      </section>
      
      {/* AI Restaurant Suggestion */}
      <section className="w-full max-w-5xl mx-auto p-4 md:p-8">
        <RestaurantSuggestionForm />
      </section>

      {/* Top Rated Restaurants */}
      <section id="restaurants" className="w-full bg-background/80 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            Top Rated Restaurants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
