import { ChefHat } from 'lucide-react';
import { OwnerMenuSuggestionForm } from '@/components/ai/owner-menu-suggestion-form';

export default function OwnerDashboardPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <ChefHat className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Restaurant Owner's Dashboard
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Leverage AI to refine your menu and delight your customers.
        </p>
      </div>
      
      <OwnerMenuSuggestionForm />
    </div>
  );
}
