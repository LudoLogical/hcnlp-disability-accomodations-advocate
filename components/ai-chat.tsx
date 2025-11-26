'use client'

import { Message } from "@/lib/data";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, Bot, BrushCleaning, Info, RotateCcw, Send, User, Wrench } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import clsx from "clsx";
import { defaultSystemPrompt } from "@/lib/constants";
import { doConverse } from "@/lib/aws";
import renderMessage from "./ui/rendered-message";

// Optional TODO: useRef() to call setSelectionRange(length, length) on the textarea for currentSystemPromptInput
// see https://www.geeksforgeeks.org/javascript/how-to-place-cursor-position-at-end-of-text-in-text-input-field-using-javascript/

export default function AIChat() {

  let [systemPrompt, setSystemPrompt] = useState<string>(defaultSystemPrompt);
  let [currentSystemPromptInput, setCurrentSystemPromptInput] = useState<string>(defaultSystemPrompt);
  let [currentMessageInput, setCurrentMessageInput] = useState<string>('');
  let [messages, setMessages] = useState<Message[]>([]);
  let [error, setError] = useState<boolean>(false);

  async function handleSend() {

    if (currentMessageInput === '') {
      return;
    }

    let oldMessages = messages;
    let updatedMessages: Message[] = [...messages, { role: 'user', text: currentMessageInput }];

    setError(false);
    setCurrentMessageInput('');
    setMessages(updatedMessages);

    let response = await doConverse(systemPrompt, updatedMessages);

    if (response === null) {
      setError(true);
      // remove most recent (user) message from messages array
      setMessages(oldMessages)
    } else {
      setMessages([...updatedMessages, response]);
      console.log(response);
    }

  }

  function clearConversation() {
    console.log(JSON.stringify(messages));
    setMessages([]);
    setError(false);
  }

  function handleAlterSystemPrompt() {
    clearConversation();
    setSystemPrompt(currentSystemPromptInput);
  }

  let awaitingCompletion = messages.length > 0 && messages[messages.length - 1].role === 'user';
  let enableConfirmChanges = currentSystemPromptInput !== '' && currentSystemPromptInput !== systemPrompt;

  return (
    <>
      <ScrollArea className="grow w-full h-64 max-h-full rounded-lg border">
        <div className="flex flex-col gap-4 px-4 py-5">
          {messages.map((message, i) => (
            <div key={i} className={clsx("w-full flex flex-row gap-2", message.role === 'user' ? "justify-end" : "")}>
              {message.role === 'assistant' && (
                <div className="bg-zinc-200 border rounded-full p-3 h-fit">
                  <Bot size={32} />
                </div>
              )}
              <p className={clsx("max-w-sm rounded-md p-4", message.role === 'user' ? "bg-blue-100" : "bg-zinc-200")}>
                {...renderMessage(message.text)}
              </p>
              {message.role === 'user' && (
                <div className="bg-blue-100 border rounded-full p-3 h-fit">
                  <User size={32} />
                </div>
              )}
            </div>
          ))}
          {error && (
            <div className="w-full flex flex-row gap-2 justify-end">
              <p className="max-w-sm rounded-md p-4 bg-red-100 italic">
                Something went wrong. Please try again in a few moments.
              </p>
              <div className="bg-red-100 border rounded-full p-3 h-fit">
                <AlertTriangle size={32} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <Textarea value={currentMessageInput} onChange={(event) => setCurrentMessageInput(event.target.value)} />
      <Button className="w-full" disabled={awaitingCompletion} onClick={handleSend}>
        Send
        {awaitingCompletion ? <Spinner /> : <Send />}
      </Button>
      <div className="w-full flex flex-row justify-between gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="grow">
              <BrushCleaning />
              Clear Conversation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-m">
            <DialogHeader>
              <DialogTitle>
                Clear Conversation
              </DialogTitle>
              <DialogDescription>
                Are you sure? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={clearConversation} variant="destructive">
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setCurrentSystemPromptInput(systemPrompt)} className="grow">
              <Wrench />
              Alter System Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-m max-h-full overflow-y-auto">
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
            <Textarea
              value={currentSystemPromptInput}
              onChange={(event) => setCurrentSystemPromptInput(event.target.value)}
              className="max-h-80"
            />
            {enableConfirmChanges && messages.length > 0 &&
              <Alert variant="destructive">
                <AlertTriangle />
                <AlertTitle>
                  Proceeding will clear your current conversation.
                </AlertTitle>
                <AlertDescription>
                  This action cannot be undone.
                </AlertDescription>
              </Alert>
            }
            <DialogFooter className="flex-col">
              <Button
                variant="outline"
                disabled={currentSystemPromptInput === defaultSystemPrompt}
                onClick={() => setCurrentSystemPromptInput(defaultSystemPrompt)}>
                <RotateCcw />
                Reset to Default
              </Button>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  disabled={!enableConfirmChanges}
                  onClick={handleAlterSystemPrompt}
                >
                  Apply Changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}