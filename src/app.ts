require("dotenv").config();
import express, { Express, Request, Response } from "express"
import cron from 'node-cron';

import { scrape } from './services/scrapingService';
import { insertData } from "./controllers/db/dbController";

const app: Express = express();

const PORT: number = Number(process.env.PORT_NO) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <div style="height: 100vh;width: 100vw;display: flex;justify-content: center; align-items: center;">
      <h1 style="font-size: 50px">This is Chaos Scrapper APi</h1>
    </div>
    `);
});


// Schedule the cron job (adjust the cron expression to your desired frequency)
cron.schedule('*/5 * * * *', async () => { // Every 15 minutes
  console.log("Cron job started");
  const data = await scrape('https://afriworket.com/job', ['Software design and Development'], Math.random() * 10);
  insertData(data);
});




app.listen(PORT, () => {
  console.log("Server is running on port 3000");
})