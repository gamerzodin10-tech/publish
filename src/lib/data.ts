import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: ImagePlaceholder;
  menu: MenuItem[];
  reviews: Review[];
}

const allImages = PlaceHolderImages;

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Ladle',
    cuisine: 'Italian',
    rating: 4.8,
    reviewsCount: 254,
    description: 'Authentic Italian cuisine with a modern twist. All our pasta is handmade daily.',
    image: allImages.find(i => i.id === 'italian-pasta')!,
    menu: [
      { name: 'Spaghetti Carbonara', price: '$18', description: 'Classic carbonara with pancetta and a creamy egg sauce.' },
      { name: 'Margherita Pizza', price: '$15', description: 'Fresh mozzarella, basil, and san marzano tomatoes.' },
      { name: 'Tiramisu', price: '$9', description: 'Ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.' },
    ],
    reviews: [
      { id: 1, author: 'Jane D.', rating: 5, comment: 'The best Carbonara I have ever had! Absolutely divine.' },
      { id: 2, author: 'John S.', rating: 4, comment: 'Great atmosphere and lovely staff. The pizza was good, but not the best in town.' },
    ],
  },
  {
    id: '2',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    rating: 4.9,
    reviewsCount: 412,
    description: 'Experience the art of sushi with our fresh, high-quality ingredients sourced from around the world.',
    image: allImages.find(i => i.id === 'sushi-platter')!,
    menu: [
      { name: 'Dragon Roll', price: '$22', description: 'Eel and cucumber topped with avocado and tobiko.' },
      { name: 'Tuna Sashimi', price: '$25', description: 'Thick slices of premium bluefin tuna.' },
      { name: 'Miso Soup', price: '$5', description: 'Traditional Japanese soup with tofu, seaweed, and scallions.' },
    ],
    reviews: [
      { id: 1, author: 'Mike T.', rating: 5, comment: 'Incredibly fresh fish. The quality is unmatched. A must-visit for sushi lovers.' },
      { id: 2, author: 'Emily R.', rating: 5, comment: 'Beautiful presentation and delicious rolls. Pricey but worth it for a special occasion.' },
    ],
  },
  {
    id: '3',
    name: 'Smokey\'s BBQ',
    cuisine: 'American',
    rating: 4.6,
    reviewsCount: 380,
    description: 'Slow-smoked meats, classic sides, and a lively atmosphere. A true taste of Southern BBQ.',
    image: allImages.find(i => i.id === 'bbq-ribs')!,
    menu: [
      { name: 'Full Rack of Ribs', price: '$30', description: 'Fall-off-the-bone pork ribs with our signature BBQ sauce.' },
      { name: 'Pulled Pork Sandwich', price: '$16', description: 'Slow-smoked pulled pork on a brioche bun.' },
      { name: 'Mac & Cheese', price: '$8', description: 'Creamy, cheesy, and baked to perfection.' },
    ],
    reviews: [
      { id: 1, author: 'Chris P.', rating: 5, comment: 'The ribs are legendary! Huge portions and so flavorful.' },
      { id: 2, author: 'Sarah K.', rating: 4, comment: 'Loved the food, but it was a bit loud. Great for groups.' },
    ],
  },
  {
    id: '4',
    name: 'Green Leaf Cafe',
    cuisine: 'Vegan',
    rating: 4.7,
    reviewsCount: 198,
    description: 'Creative and delicious plant-based dishes that will delight vegans and non-vegans alike.',
    image: allImages.find(i => i.id === 'vegan-salad')!,
    menu: [
      { name: 'Quinoa Power Bowl', price: '$17', description: 'Quinoa, roasted vegetables, avocado, and a lemon-tahini dressing.' },
      { name: 'Beyond Burger', price: '$19', description: 'A plant-based patty with all the classic fixings.' },
      { name: 'Avocado Chocolate Mousse', price: '$10', description: 'A rich and creamy dessert that is surprisingly healthy.' },
    ],
    reviews: [
      { id: 1, author: 'Laura W.', rating: 5, comment: 'As a vegan, this is my happy place. So many amazing options!' },
      { id: 2, author: 'Tom H.', rating: 4, comment: 'I am not vegan but the burger was surprisingly good. I will be back.' },
    ],
  },
    {
    id: '5',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.5,
    reviewsCount: 510,
    description: 'Vibrant, authentic Mexican street food. Tacos, burritos, and the best margaritas in town.',
    image: allImages.find(i => i.id === 'mexican-tacos')!,
    menu: [
      { name: 'Al Pastor Tacos', price: '$14', description: 'Marinated pork tacos with pineapple, onions, and cilantro.' },
      { name: 'Carne Asada Burrito', price: '$17', description: 'Grilled steak, rice, beans, and salsa in a flour tortilla.' },
      { name: 'Guacamole & Chips', price: '$11', description: 'Freshly made guacamole with crispy corn tortilla chips.' },
    ],
    reviews: [
      { id: 1, author: 'Maria G.', rating: 5, comment: 'Reminds me of my grandmother\'s cooking. Truly authentic and delicious.' },
      { id: 2, author: 'David L.', rating: 4, comment: 'Fun place with great tacos. Can get very busy on weekends.' },
    ],
  },
  {
    id: '6',
    name: 'The Spice Route',
    cuisine: 'Indian',
    rating: 4.8,
    reviewsCount: 355,
    description: 'A culinary journey through the diverse and aromatic flavors of India.',
    image: allImages.find(i => i.id === 'indian-curry')!,
    menu: [
      { name: 'Chicken Tikka Masala', price: '$20', description: 'Grilled chicken chunks in a rich, creamy tomato sauce.' },
      { name: 'Lamb Vindaloo', price: '$22', description: 'A spicy and tangy lamb curry from Goa.' },
      { name: 'Garlic Naan', price: '$5', description: 'Soft, fluffy flatbread topped with garlic and butter.' },
    ],
    reviews: [
      { id: 1, author: 'Aarav P.', rating: 5, comment: 'Best Indian food I\'ve had outside of India. The flavors are complex and perfectly balanced.' },
      { id: 2, author: 'Jessica B.', rating: 5, comment: 'The Tikka Masala is to die for! So creamy and flavorful.' },
    ],
  },
];
