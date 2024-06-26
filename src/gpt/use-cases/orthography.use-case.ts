import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const orthographyCheckUseCase = async( openai: OpenAI, options: Options ) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: 'system', 
                content: `
                Te serán proveidos textos en español con posibles errores ortográficos y gramaticales,
                Las palabras usadas deben existir en el diccionario de la Real Academia Española,
                Debes responder en formato JSON,
                tu tarea es corregirlos y retornar informacion de las soluciones,
                también debes dar un porcentaje de acierto por el usuario,
                si no hay errores debes retornar un mensaje d felicitaciones

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], //['error -> solution']
                    message: string, // Usa emojis y texto para felicitar al usuario
                }
                ` 
            },
            {
                role: 'user',
                content: prompt,
            }
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        max_tokens: 150,
    });

    const jsonResp = JSON.parse(completion.choices[0].message.content);

    return jsonResp;

}