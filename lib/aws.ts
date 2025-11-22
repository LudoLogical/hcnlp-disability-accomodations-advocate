"use server"

import { BedrockRuntimeClient, ConverseCommand, ConverseCommandInput, ConverseCommandOutput } from "@aws-sdk/client-bedrock-runtime";
import { Message } from "./data";

let client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION ?? 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    },
    maxAttempts: 3
});

export async function doConverse(
    systemPrompt: string,
    localMessages: Message[]
): Promise<Message | null> { 
    
    let request: ConverseCommandInput = {
        modelId: "us.deepseek.r1-v1:0",
        messages: localMessages.map(message => ({
            role: message.role,
            content: [{ text: message.text }]
        })),
        system: [{ text: systemPrompt }]
    };

    let response = await client.send(new ConverseCommand(request));

    // Confirm unnested assumptions
    if (response.$metadata.httpStatusCode !== 200 ||
        response.stopReason !== 'end_turn' ||
        response.usage === undefined ||
        (response.usage?.inputTokens ?? 0) + (response.usage?.outputTokens ?? 0) !== response.usage.totalTokens ||
        response.output?.message?.content === undefined ||
        response.output?.message?.content.length !== 2
    ) {
        debugConverseResponse(response);
        return null;
    }

    let responseText = response.output?.message?.content[0].text;
    let responseReasoning = response.output?.message?.content[1].reasoningContent?.reasoningText?.text;

    // Confirm nested assumptions
    if (responseText === undefined ||
        responseReasoning === undefined
    ) {
        debugConverseResponse(response);
        return null;
    }

    return {
        role: 'assistant',
        text: responseText,
        reasoningText: responseReasoning,
        stopReason: response.stopReason,
        inputTokens: response.usage.inputTokens ?? 0,
        outputTokens: response.usage.outputTokens ?? 0,
        totalTokens: response.usage.totalTokens,
        latencyInMilliseconds: response.metrics?.latencyMs ?? 0,
        requestID: response.$metadata.requestId ?? '',
        attempts: response.$metadata.attempts ?? 0,
        totalRetryDelay: response.$metadata.totalRetryDelay ?? 0
    };

}

function debugConverseResponse(response: ConverseCommandOutput) {
    console.log(response);
    if (response.output?.message?.content) {
        console.log("Number of outputs: " + response.output?.message?.content?.length);
        for (let content of response.output?.message?.content) {
            console.log("=== BEGIN OUTPUT ===")
            console.log(content);
            console.log("=== END OUTPUT ===")
        }
    }
}

// { // ConverseResponse
//   output: {
//     message: { // Message
//       role: "user" || "assistant", // required
//       content: [ // ContentBlocks // required
//         {
//           text: "STRING_VALUE",
//         },
//       ],
//     },
//   },
//   stopReason: "end_turn" (good ending) || "tool_use" || "max_tokens" || "stop_sequence" || "guardrail_intervened" || "content_filtered" || "model_context_window_exceeded", // required
//   usage: { // TokenUsage
//     inputTokens: Number("int"), // required
//     outputTokens: Number("int"), // required
//     totalTokens: Number("int"), // required
//     cacheReadInputTokens: Number("int"),
//     cacheWriteInputTokens: Number("int"),
//   },
//   metrics: { // ConverseMetrics
//     latencyMs: Number("long"), // required
//   }