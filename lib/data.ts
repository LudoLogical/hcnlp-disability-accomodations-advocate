export type Message = (
    {
        role: 'user',
        text: string
    } | {
        role: 'assistant',
        text: string,
        reasoningText: string,
        stopReason: string,
        inputTokens: number,
        outputTokens: number,
        totalTokens: number,
        latencyInMilliseconds: number,
        requestID: string,
        attempts: number,
        totalRetryDelay: number
    }
);