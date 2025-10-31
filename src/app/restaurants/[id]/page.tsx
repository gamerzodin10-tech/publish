import Image from 'next/image';
import { notFound } from 'next/navigation';
import { restaurants, type Restaurant } from '@/lib/data';
import { StarRating } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign, MessageCircle, Utensils } from 'lucide-react';
import { RestaurantFeedbackForm } from '@/components/ai/restaurant-feedback-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = getRestaurant(params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={restaurant.image.imageUrl}
          alt={`A photo of ${restaurant.name}`}
          fill
          className="object-cover"
          priority
          data-ai-hint={restaurant.image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Header */}
      <div className="container mx-auto -mt-24 md:-mt-32 relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">{restaurant.cuisine}</Badge>
                  <h1 className="font-headline text-3xl md:text-5xl font-bold">{restaurant.name}</h1>
                  <p className="mt-2 text-muted-foreground">{restaurant.description}</p>
                  <div className="mt-4 flex items-center gap-4 flex-wrap">
                    <StarRating rating={restaurant.rating} />
                    <span className="text-sm text-muted-foreground">{restaurant.reviewsCount} reviews</span>
                     <TipDialog />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu"><Utensils className="w-4 h-4 mr-2" />Menu</TabsTrigger>
            <TabsTrigger value="reviews"><MessageCircle className="w-4 h-4 mr-2" />Reviews</TabsTrigger>
            <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Our Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurant.menu.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
               <CardHeader>
                <CardTitle className="font-headline text-2xl">What People Are Saying</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                     <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${review.author}`} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{review.author}</p>
                        <StarRating rating={review.rating} starClassName="w-4 h-4" />
                      </div>
                      <p className="text-muted-foreground mt-1">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <RestaurantFeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </article>
  );
}


function TipDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Tip Restaurant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-headline">Send a Tip</DialogTitle>
                    <DialogDescription>
                        Show your appreciation for the great food and service!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input id="amount" defaultValue="$5.00" className="col-span-3" />
                    </div>
                </div>
                 <Button type="submit">Send Tip</Button>
            </DialogContent>
        </Dialog>
    )
}
