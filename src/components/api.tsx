// src/api/gigachat.ts
export const sendToGigaChat = async (messages: any[]) => {
  try {
    const res = await fetch("https://gigachat.api", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_TOKEN",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Ошибка при отправке запроса к GigaChat:", error);
    throw error;
  }
};