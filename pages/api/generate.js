import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Generate 7 SEO-optimized blog titles for
Title:`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.701,
    max_tokens: 280,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  /* const secondPrompt = `
  Take each of the 15 SEO-optimized blog titles and write a blog post on each of them.
  Title: ${req.body.userInput}
  Keywords generated: ${basePromptOutput.text}
  Blog Post:
  `

   // I call the OpenAI API a second time with Prompt #2
   const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();
 */
  res.status(200).json({ output:  basePromptOutput });
};

export default generateAction;
