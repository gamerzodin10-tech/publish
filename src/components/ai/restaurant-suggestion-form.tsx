'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lightbulb, Loader2 } from 'lucide-react';
import { handleRestaurantSuggestion, type RestaurantSuggestionState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : 'Find Restaurants'}
    </Button>
  );
}

export function RestaurantSuggestionForm() {
  const initialState: RestaurantSuggestionState = null;
  const [state, dispatch] = useFormState(handleRestaurantSuggestion, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-accent" />
          AI-Powered Suggestions
        </CardTitle>
        <CardDescription>Tell us what you're craving, and we'll find the perfect spot nearby.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userPreferences">Cuisine or Dish</Label>
            <Input
              id="userPreferences"
              name="userPreferences"
              placeholder="e.g., 'spicy thai curry', 'cozy italian bistro', 'sushi'"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., 'Brooklyn, NY'"
              required
            />
          </div>
          {state?.formErrors && (
            <p className="text-sm font-medium text-destructive">{state.formErrors.join(', ')}</p>
          )}
          <SubmitButton />
        </form>

        {state?.error && (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state?.suggestion && (
          <div className="mt-6">
            <h3 className="font-headline text-xl font-semibold mb-2">Here are your suggestions:</h3>
            <div className="prose prose-sm prose-invert max-w-none rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
              {state.suggestion}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
