import { Message } from "./data";

let dummyAssistantExtras = {
  reasoningText: '', stopReason: '',
  inputTokens: 0, outputTokens: 0, totalTokens: 0,
  latencyInMilliseconds: 0, totalRetryDelay: 0,
  requestID: '', attempts: 0
};

let dummyMessages: Message[] = [
  {
    role: 'user',
    text: 'This is an example of user input.'
  },
  {
    role: 'assistant',
    text: 'This is an example of chatbot output. It\'s significantly longer than the corresponding input.',
    ...dummyAssistantExtras
  },
  {
    role: 'user',
    text: 'This is another example of user input. It\'s also fairly long so you can see how the text wraps for both conversants.'
  },
  {
    role: 'assistant',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ...dummyAssistantExtras
  },
  {
    role: 'user',
    text: 'So, tell me: what is the meaning of life, the universe, and everything?'
  }
];

let defaultSystemPrompt = 'You are cool.';
export { dummyMessages, defaultSystemPrompt };