import { Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import AIChat from "@/components/ai-chat";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-4 py-16 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold">Disability Accomodations Advocate</h1>
        <p>This is a user-facing description of our tool. We'll explain what it is, who it's for, and how to interact with it.</p>
        <Alert className="mb-4">
          <Info />
          <AlertTitle>
            Generative AI can make mistakes.
          </AlertTitle>
          <AlertDescription>
            Double-check important information. You'll get to remove, alter, or clarify pieces of the conversation before submitting it for your disability specialist to review.
          </AlertDescription>
        </Alert>
        <AIChat />
      </main>
    </div>
  );
}
