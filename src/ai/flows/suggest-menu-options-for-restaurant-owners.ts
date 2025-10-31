// filename: src/ai/flows/suggest-menu-options-for-restaurant-owners.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest menu options for restaurant owners based on restaurant ratings and user feedback.
 *
 * It exports:
 * - `suggestMenuOptions`: An async function that takes restaurant ratings and user feedback as input and returns menu option suggestions.
 * - `SuggestMenuOptionsInput`: The input type for the `suggestMenuOptions` function.
 * - `SuggestMenuOptionsOutput`: The output type for the `suggestMenuOptions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMenuOptionsInputSchema = z.object({
  restaurantName: z.string().describe('The name of the restaurant.'),
  restaurantRatings: z.number().describe('The average rating of the restaurant (out of 5).'),
  userFeedback: z.string().describe('User feedback and comments about the restaurant.'),
});
export type SuggestMenuOptionsInput = z.infer<typeof SuggestMenuOptionsInputSchema>;

const SuggestMenuOptionsOutputSchema = z.object({
  menuSuggestions: z.string().describe('Suggested menu options based on ratings and feedback.'),
});
export type SuggestMenuOptionsOutput = z.infer<typeof SuggestMenuOptionsOutputSchema>;

export async function suggestMenuOptions(input: SuggestMenuOptionsInput): Promise<SuggestMenuOptionsOutput> {
  return suggestMenuOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMenuOptionsPrompt',
  input: {schema: SuggestMenuOptionsInputSchema},
  output: {schema: SuggestMenuOptionsOutputSchema},
  prompt: `You are a restaurant menu consultant. Based on the restaurant's ratings and user feedback, suggest new menu options to improve customer satisfaction.

Restaurant Name: {{{restaurantName}}}
Restaurant Ratings: {{{restaurantRatings}}}
User Feedback: {{{userFeedback}}}

Suggest specific menu items, considering both popular and unpopular feedback themes. Be concise.`,
});

const suggestMenuOptionsFlow = ai.defineFlow(
  {
    name: 'suggestMenuOptionsFlow',
    inputSchema: SuggestMenuOptionsInputSchema,
    outputSchema: SuggestMenuOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
