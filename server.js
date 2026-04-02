import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import https from "https";

const app = express();
app.use(cors());
app.use(express.json());

const AUTH_KEY = "MDE5ZDRmMGEtYzk2My03ZmJhLWExMzAtMGE4ZTVhNjY3MDYyOjkxNGE1NDhkLWFlNTUtNGQ0OS1iZTkzLTg3MjliODU1OGEzYg==";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

let accessToken = null;

async function getToken() {
  const response = await fetch(
    "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
    {
      method: "POST",
      agent,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: uuidv4(),
        Authorization: `Basic ${AUTH_KEY}`,
      },
      body: "scope=GIGACHAT_API_PERS",
    }
  );

  const data = await response.json();
  return data.access_token;
}


app.post("/chat", async (req, res) => {
  try {
    if (!accessToken) {
      accessToken = await getToken();
    }

    const response = await fetch(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        method: "POST",
        agent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          model: "GigaChat",
          messages: [
            { role: "system", content: "Ты полезный ассистент" },
            ...req.body.messages,
          ],
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(3001, () => {
  console.log("Server started on http://localhost:3001");
});