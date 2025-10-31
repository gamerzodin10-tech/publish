'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleMenuSuggestion, type MenuSuggestionState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : 'Get Menu Suggestions'}
    </Button>
  );
}

export function OwnerMenuSuggestionForm() {
  const initialState: MenuSuggestionState = null;
  const [state, dispatch] = useFormState(handleMenuSuggestion, initialState);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Menu Consultant</CardTitle>
        <CardDescription>
          Enter your restaurant's details and recent feedback to receive AI-generated menu suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input id="restaurantName" name="restaurantName" placeholder="e.g., The Golden Ladle" required />
              {state?.formErrors?.restaurantName && (
                <p className="text-sm font-medium text-destructive">{state.formErrors.restaurantName[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurantRatings">Average Rating (1-5)</Label>
              <Input id="restaurantRatings" name="restaurantRatings" type="number" step="0.1" min="1" max="5" placeholder="e.g., 4.2" required />
              {state?.formErrors?.restaurantRatings && (
                <p className="text-sm font-medium text-destructive">{state.formErrors.restaurantRatings[0]}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="userFeedback">Recent User Feedback</Label>
            <Textarea
              id="userFeedback"
              name="userFeedback"
              placeholder="e.g., 'The pasta was great, but we wish there were more vegetarian options...'"
              required
              rows={5}
            />
            {state?.formErrors?.userFeedback && (
              <p className="text-sm font-medium text-destructive">{state.formErrors.userFeedback[0]}</p>
            )}
          </div>
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
            <h3 className="font-headline text-xl font-semibold mb-2">Our Suggestions:</h3 >
            <div className="prose prose-sm prose-invert max-w-none rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
              {state.suggestion}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
