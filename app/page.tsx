import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, CircleAlert, Info, RotateCcw, Send, User, Wrench } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

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
        <ScrollArea className="grow w-full h-64 max-h-full rounded-lg border">
          <div className="flex flex-col gap-4 px-4 py-5">
            <div className="w-full flex flex-row justify-end gap-2">
              <p className="max-w-md bg-blue-100 rounded-md p-4">This is an example of user input.</p>
              <div className="bg-blue-100 border rounded-full p-3 h-fit">
                <User size={32} />
              </div>
            </div>
            <div className="w-full flex flex-row gap-2">
              <div className="bg-zinc-200 border rounded-full p-3 h-fit">
                <Bot size={32} />
              </div>
              <p className="max-w-md bg-zinc-200 rounded-md p-4">This is an example of chatbot output. It's significantly longer than the first example.</p>
            </div>
            <div className="w-full flex flex-row justify-end gap-2">
              <p className="max-w-md bg-blue-100 rounded-md p-4">This is another example of user input. It's also fairly long so you can see how the text wraps.</p>
              <div className="bg-blue-100 border rounded-full p-3 h-fit">
                <User size={32} />
              </div>
            </div>
            <div className="w-full flex flex-row gap-2">
              <div className="bg-zinc-200 border rounded-full p-3 h-fit">
                <Bot size={32} />
              </div>
              <p className="max-w-md bg-zinc-200 rounded-md p-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="w-full flex flex-row justify-end gap-2">
              <p className="max-w-md bg-blue-100 rounded-md p-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className="bg-blue-100 border rounded-full p-3 h-fit">
                <User size={32} />
              </div>
            </div>
            <div className="w-full flex flex-row gap-2">
              <div className="bg-zinc-200 border rounded-full p-3 h-fit">
                <Bot size={32} />
              </div>
              <div className="max-w-md bg-zinc-200 rounded-md p-4">
                <Spinner className="size-6" />
              </div>
            </div>
          </div>
        </ScrollArea>
        <Textarea />
        <Button className="w-full">
          Send
          <Send />
        </Button>
        <div className="w-full flex flex-row justify-between gap-4">
          <Dialog>
            <Button variant="outline" className="grow">
              <RotateCcw />
              Reset Conversation
            </Button>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="grow">
                <Wrench />
                Alter System Prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-m">
              <DialogHeader>
                <DialogTitle>Alter System Prompt</DialogTitle>
                <DialogDescription>
                  These instructions are supplied to the Large Language Model (LLM) that powers this
                  tool at the beginning of each new conversation to establish how it should behave.
                </DialogDescription>
              </DialogHeader>
              <Alert>
                <Info />
                <AlertTitle>
                  Generative AI can make mistakes.
                </AlertTitle>
                <AlertDescription>
                  Although LLMs typically adhere quite well to the contents of their
                  system prompts, there is no way to force them to do so.
                </AlertDescription>
              </Alert>
              <Textarea className="max-h-[50svh]" />
              <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>
                  Proceeding will clear your current conversation.
                </AlertTitle>
              </Alert>
              <DialogFooter className="flex-col">
                <Button variant="outline">
                  <RotateCcw />
                  Reset to Default
                </Button>
                <DialogClose asChild>
                  <Button variant="destructive" disabled>Apply Changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
