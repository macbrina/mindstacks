# MindStacks

MindStacks is a powerful flashcard generation platform designed to enhance your learning experience. With features like unlimited collections, dashboard analytics, and support for multiple languages, MindStacks makes it easy to create and manage personalized flashcards.

## Features

- **Unlimited Collections:** Create as many flashcard collections as you need, without any limits.
- **10 Flashcards Generation:** Generate up to 10 flashcards at a time, tailored to your learning needs.
- **Dashboard Analytics:** Monitor your progress with insightful analytics and visualizations on your dashboard.
- **Track Progress:** Keep track of your learning journey and see how you're improving over time.
- **4+ Languages Supported:** Generate flashcards in multiple languages, including English, Spanish, French, and more.
- **Difficulty Selection:** Customize the difficulty level of your flashcards to match your learning pace.

## Getting Started

To get started with MindStacks, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/macbrina/mindstacks.git
   ```

2. **Install dependencies:**

   ```bash
   cd mindstacks
   npm install
   ```

3. **Run the development server:**
   Start the development server to see MindStacks in action:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser to view the app.

4. **Build the project:**
   When you're ready to deploy, build the project using:

   ```bash
   npm run build
   ```

   Then start the production server:

   ```bash
   npm run start
   ```

## Dependencies

MindStacks relies on the following major dependencies:

- Next.js: Framework for building the user interface.
- Firebase: Backend as a service for managing data and authentication.
- Stripe: Integration for handling payments and subscriptions.
- MUI: Material-UI components for a sleek, modern design.
- OpenAI: For generating AI-powered flashcards.
- React Toastify: For managing notifications.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

<pre>
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y29uY3JldGUtcmluZ3RhaWwtNTQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_DhWrUj5GeHIQ7oYlz0HsJOpgOx8I5f41L79Bc9Y8kJ
OPENAI_API_KEY=sk-EsfhyuMQR_GpTS6_j4ImwPfA3ZNoWKjE74tU8p8ofqT3BlbkFJKAE909D5OQxAAJInAo6KhB8pVtk0EiDgC028Kfkw8A
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-225PC2SVPV
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51IFwsoEjsAwpWztbRmRcblSWQWBqyog3s4qky0dNHyfsS6ZEoIkaarnggN9sCxx9McVgYHttlgUVwuP8lRDwVEex00VdDBl7fq
STRIPE_SECRET_KEY=sk_test_51IFwsoEjsAwpWztbXsMiheiQp6bqhyiCOeEPlloWZV0CaLlBEYpfsGcSt48RsOBYQWWUXIDeorH6gtyBbHpadWq700tEh2DieA
STRIPE_WEBHOOK_SECRET=whsec_ZjPDFLSL9uXi2eJxUMla57D2OR6F670X
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1PpbjIEjsAwpWztbuxyNMH5p
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBTcoBWBcTW2ZYEWkFiEnowbm9ApWrTUw8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flashcard-7f46c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=flashcard-7f46c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flashcard-7f46c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID=525693748459
NEXT_PUBLIC_FIREBASE_APP_ID=1:525693748459:web:26edee4e6df87f381b2aae
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-225PC2SVPV

```
</pre>

## License

This project is a personal project and is not licensed for public or commercial use. You are not permitted to copy, distribute, or modify any part of this project without explicit permission from the author.

## Contact

For more information or questions, feel free to reach out at [preciousmbaekwe@gmail.com].
