# Recipe Finder App

A modern web application to discover delicious recipes from around the world, powered by the Spoonacular API.

![Recipe Finder App](https://spoonacular.com/application-front-end-images/feast-finder.jpg)

## Features

- **Recipe Search**: Search for recipes by keywords, ingredients, or dish names
- **Category Exploration**: Browse recipes by categories (Breakfast, Lunch, Dinner, etc.)
- **Advanced Filtering**: Filter recipes by diet (Vegetarian, Gluten-free, etc.) and cuisine type
- **Recipe Details**: View detailed recipe information including:
  - Ingredients with measurements
  - Step-by-step cooking instructions
  - Nutritional information
  - Cooking time and servings
- **Favorites**: Save your favorite recipes for quick access later
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technologies Used

- **Next.js 15**: React framework with App Router for server-side rendering and routing
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Static typing for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Spoonacular API**: Food and recipe data provider

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recipe-finder-app.git
   cd recipe-finder-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Spoonacular API key:

   ```
   API_KEY=your_spoonacular_api_key
   ```

   > You can obtain a free API key by signing up at [Spoonacular API](https://spoonacular.com/food-api)

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## API Usage

This app uses the [Spoonacular API](https://spoonacular.com/food-api) to fetch recipe data. The free tier has limited daily requests, so be mindful of usage limits when developing and testing.

Key endpoints used:

- `/recipes/complexSearch` - Search recipes with filters
- `/recipes/{id}/information` - Get detailed recipe information

## Deployment

The app can be easily deployed to Vercel or any other Next.js-compatible hosting:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Spoonacular API](https://spoonacular.com/food-api) for providing the recipe data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
