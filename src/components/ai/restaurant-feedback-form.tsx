'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { handleFeedbackAnalysis, type FeedbackAnalysisState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : 'Analyze My Feedback'}
    </Button>
  );
}

export function RestaurantFeedbackForm() {
  const initialState: FeedbackAnalysisState = null;
  const [state, dispatch] = useFormState(handleFeedbackAnalysis, initialState);

  const getSentimentStyling = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return {
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/20',
        };
      case 'negative':
        return {
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/20',
        };
      default:
        return {
          bgColor: 'bg-muted/50',
          textColor: 'text-muted-foreground',
          borderColor: 'border-border',
        };
    }
  };

  const sentimentStyling = getSentimentStyling(state?.analysis?.sentiment);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary"/>
          AI-Powered Feedback Analysis
        </CardTitle>
        <CardDescription>
          Share your experience. Our AI will analyze your feedback and suggest improvements for the restaurant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              name="feedback"
              placeholder="Tell us about your experience..."
              required
              rows={5}
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

        {state?.analysis && (
          <div className="mt-6 space-y-4">
            <h3 className="font-headline text-xl font-semibold">Analysis Results:</h3>
            <div className={`rounded-lg border p-4 ${sentimentStyling.borderColor} ${sentimentStyling.bgColor}`}>
              <p className="font-semibold">
                Sentiment: <span className={`capitalize font-bold ${sentimentStyling.textColor}`}>{state.analysis.sentiment}</span>
              </p>
            </div>
            <div className="prose prose-sm prose-invert max-w-none rounded-md border bg-muted/30 p-4 whitespace-pre-wrap">
              <p className="font-semibold text-foreground mb-2">Suggestions for the Restaurant:</p>
              {state.analysis.suggestions}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
