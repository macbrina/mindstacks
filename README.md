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
# Clerk (Random Placeholder)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_12345ClerkPublicKeyPlaceholder
CLERK_SECRET_KEY=sk_test_12345ClerkSecretKeyPlaceholder

# OpenAI (Random Placeholder)
OPENAI_API_KEY=sk-OpenAIKeyPlaceholder12345

# Google Analytics (Fake ID Format)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-FAKEID1234

# Stripe (Random Placeholder)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_12345StripePublicKey
STRIPE_SECRET_KEY=sk_test_12345StripeSecretKey
STRIPE_WEBHOOK_SECRET=whsec_12345WebhookSecret
NEXT_PUBLIC_STRIPE_PRICE_ID=price_FAKE123456789

# Firebase (Fake Config Example)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaFakeFirebaseKey12345
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-FAKEMEASUREMENT


```
</pre>

## License

This project is a personal project and is not licensed for public or commercial use. You are not permitted to copy, distribute, or modify any part of this project without explicit permission from the author.

## Contact

For more information or questions, feel free to reach out at [preciousmbaekwe@gmail.com].
