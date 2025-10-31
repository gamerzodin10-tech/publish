'use server';

import { z } from 'zod';
import { suggestRestaurantsBasedOnPreferences } from '@/ai/flows/suggest-restaurants-based-on-preferences';
import { analyzeRestaurantFeedback } from '@/ai/flows/analyze-restaurant-feedback';
import { suggestMenuOptions } from '@/ai/flows/suggest-menu-options-for-restaurant-owners';

// Schema for restaurant suggestion form
const restaurantSuggestionSchema = z.object({
  userPreferences: z.string().min(1, 'Preferences are required.'),
  location: z.string().min(1, 'Location is required.'),
});

// Initial state for restaurant suggestion
export type RestaurantSuggestionState = {
  formErrors?: string[];
  suggestion?: string;
  error?: string;
} | null;

export async function handleRestaurantSuggestion(
  prevState: RestaurantSuggestionState,
  formData: FormData
): Promise<RestaurantSuggestionState> {
  const validatedFields = restaurantSuggestionSchema.safeParse({
    userPreferences: formData.get('userPreferences'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      formErrors: validatedFields.error.flatten().fieldErrors.userPreferences || validatedFields.error.flatten().fieldErrors.location,
    };
  }
  
  try {
    const result = await suggestRestaurantsBasedOnPreferences({
      ...validatedFields.data,
      userRatings: 'User likes Italian and Japanese food, rated a local pizzeria 4/5.', // Mocked for demonstration
    });
    return { suggestion: result.suggestedRestaurants };
  } catch (e) {
    return { error: 'AI Suggestion failed. Please try again later.' };
  }
}

// Schema for feedback analysis
const feedbackSchema = z.object({
  feedback: z.string().min(10, 'Feedback must be at least 10 characters long.'),
});

export type FeedbackAnalysisState = {
    formErrors?: string[];
    analysis?: {
        sentiment: 'positive' | 'negative' | 'neutral';
        suggestions: string;
    };
    error?: string;
} | null;

export async function handleFeedbackAnalysis(
  prevState: FeedbackAnalysisState,
  formData: FormData
): Promise<FeedbackAnalysisState> {
    const validatedFields = feedbackSchema.safeParse({
        feedback: formData.get('feedback'),
    });

    if (!validatedFields.success) {
        return {
            formErrors: validatedFields.error.flatten().fieldErrors.feedback,
        };
    }

    try {
        const result = await analyzeRestaurantFeedback(validatedFields.data);
        return { analysis: result };
    } catch (e) {
        return { error: 'Failed to analyze feedback. Please try again.' };
    }
}


// Schema for menu suggestions for owners
const menuSuggestionSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required."),
    restaurantRatings: z.coerce.number().min(1).max(5),
    userFeedback: z.string().min(10, "Please provide some user feedback."),
});

export type MenuSuggestionState = {
    formErrors?: {
        restaurantName?: string[];
        restaurantRatings?: string[];
        userFeedback?: string[];
    };
    suggestion?: string;
    error?: string;
} | null;

export async function handleMenuSuggestion(
    prevState: MenuSuggestionState,
    formData: FormData
): Promise<MenuSuggestionState> {
    const validatedFields = menuSuggestionSchema.safeParse({
        restaurantName: formData.get('restaurantName'),
        restaurantRatings: formData.get('restaurantRatings'),
        userFeedback: formData.get('userFeedback'),
    });
    
    if (!validatedFields.success) {
        return {
            formErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const result = await suggestMenuOptions(validatedFields.data);
        return { suggestion: result.menuSuggestions };
    } catch (e) {
        return { error: 'Failed to generate menu suggestions. Please try again.' };
    }
}
