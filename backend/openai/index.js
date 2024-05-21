import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
    
export const getCompletion = async (topic) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: messageText(topic) },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });

  console.log('TOPIC: ', topic)
  console.log('completion content: ', completion.choices[0].message.content)

  const contentObject = JSON.parse(completion.choices[0].message.content)
  console.log('contentObject: ', contentObject);

  return contentObject
}

const messageText = (topic) => (`Készíts egy darab kérdést egy kvízhez ${topic} témakörben 4 lehetséges megoldás megadásával json formátumban, jelöld, hogy melyik a helyes megoldás. Egy object így nézzen ki: {"text": a kérdés szövege, "answers":[{"number": válasz azonosító, "text":válasz szövege, "correct": helyes-e a válasz}], "category":a kérdés kategóriája} . Magyarázatot ne írj hozzá.`)
