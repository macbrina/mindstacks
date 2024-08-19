import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { FlashProvider } from "@/app/_context/FlashContext";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import Analytics from "@/app/_components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://mindstacks.com"),
  title: {
    template: "%s - MindStacks",
    default: "MindStacks: Premium Flashcard Creation Tool",
  },
  other: {
    keywords:
      "MindStacks, flashcards, educational tools, study aids, learning resources, AI-powered flashcards, card generator, study tools, exam preparation, learning apps, educational technology",
  },
  author: "Precious Mbaekwe",
  description:
    "MindStacks offers a powerful platform for creating premium flashcards with ease. Use our AI-powered tool to generate engaging study materials, tailored to your learning needs. Perfect for students, educators, and anyone looking to enhance their study sessions.",
  openGraph: {
    title: "MindStacks: Premium Flashcard Creation Tool",
    description:
      "MindStacks offers a powerful platform for creating premium flashcards with ease. Use our AI-powered tool to generate engaging study materials, tailored to your learning needs. Perfect for students, educators, and anyone looking to enhance their study sessions.",
    images: [
      {
        url: "https://mindstacks.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MindStacks Flashcard Creation",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "MindStacks",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindStacks: Premium Flashcard Creation Tool",
    description:
      "MindStacks offers a powerful platform for creating premium flashcards with ease. Use our AI-powered tool to generate engaging study materials, tailored to your learning needs. Perfect for students, educators, and anyone looking to enhance their study sessions.",
    images: ["https://mindstacks.com/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Analytics />
          <NextTopLoader showSpinner={false} color="#42A5F5" />
          <ToastContainer />
          <FlashProvider>{children}</FlashProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
