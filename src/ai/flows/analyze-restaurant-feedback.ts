'use server';

/**
 * @fileOverview A flow to analyze restaurant feedback, categorize sentiment, and provide suggestions for improvement.
 *
 * - analyzeRestaurantFeedback - A function that handles the feedback analysis process.
 * - AnalyzeRestaurantFeedbackInput - The input type for the analyzeRestaurantFeedback function.
 * - AnalyzeRestaurantFeedbackOutput - The return type for the analyzeRestaurantFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRestaurantFeedbackInputSchema = z.object({
  feedback: z.string().describe('The feedback text provided by the user.'),
});
export type AnalyzeRestaurantFeedbackInput = z.infer<typeof AnalyzeRestaurantFeedbackInputSchema>;

const AnalyzeRestaurantFeedbackOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the feedback.'),
  suggestions: z.string().describe('Suggestions for the restaurant to improve.'),
});
export type AnalyzeRestaurantFeedbackOutput = z.infer<typeof AnalyzeRestaurantFeedbackOutputSchema>;

export async function analyzeRestaurantFeedback(
  input: AnalyzeRestaurantFeedbackInput
): Promise<AnalyzeRestaurantFeedbackOutput> {
  return analyzeRestaurantFeedbackFlow(input);
}

const analyzeRestaurantFeedbackPrompt = ai.definePrompt({
  name: 'analyzeRestaurantFeedbackPrompt',
  input: {schema: AnalyzeRestaurantFeedbackInputSchema},
  output: {schema: AnalyzeRestaurantFeedbackOutputSchema},
  prompt: `Analyze the following restaurant feedback and determine its sentiment (positive, negative, or neutral). Also, provide suggestions for the restaurant to improve.

Feedback: {{{feedback}}}

Sentiment:
Suggestions: `,
});

const analyzeRestaurantFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeRestaurantFeedbackFlow',
    inputSchema: AnalyzeRestaurantFeedbackInputSchema,
    outputSchema: AnalyzeRestaurantFeedbackOutputSchema,
  },
  async input => {
    const {output} = await analyzeRestaurantFeedbackPrompt(input);
    return output!;
  }
);
