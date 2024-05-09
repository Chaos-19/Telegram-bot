require("dotenv").config();
import express, { Express, Request, Response } from "express"
import { Composer, Context, Markup, Scenes, session, Telegraf } from "telegraf";
import cron from 'node-cron';


import { scrape } from './services/scrapingService';
import { insertData } from "./controllers/db/dbController";
import { createUser, isUserExist } from "./controllers/user/userController";
import { text } from "stream/consumers";
import { mainMenu, menu } from "./utils";

import type { Update } from "telegraf/types";

const app: Express = express();


interface MyContext extends Context {
  session: {
    menuNew: typeof menu;
    selectedMenu: string[];
  }
}

const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN as string);
bot.launch();
bot.use(Telegraf.log());
bot.use(session({ defaultSession: () => ({ menuNew: [...menu], selectedMenu: [] }) }));


const PORT: number = Number(process.env.PORT_NO) || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`
  <div style="height: 100vh;width: 100vw;display: flex;justify-content: center; align-items: center;">
  <h1 style="font-size: 50px">This is Chaos Scrapper APi</h1>
  </div>
  `);
});



// Schedule the cron job (adjust the cron expression to your desired frequency)
cron.schedule('0 */12 * * *', async () => { // Every 15 minutes
  /*  console.log("Cron job started");
   const data = await scrape('https://afriworket.com/job', ['UNPAID_INTERN', "PAID_INTERN"], Math.random() * 10);
   insertData(data); */
});


bot.start(async (ctx) => {

  const res = await isUserExist(ctx.from.id)

  console.log(res);

  if (!res) {
    createUser({
      telegram_id: ctx.from.id,
      first_name: ctx.from.first_name
    })
    ctx.replyWithHTML(`<b>Hi there!</b> I'm your Ethiopio Internship and Developer Job search assistant.I can help you land your perfect software engineering role,whether it's your first internship or your next career step.

Please select the sector you want to be notifyed about`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...ctx?.session?.menuNew.map((option, index) => (
          [Markup.button.callback(option.text, option.callback_data)]
        )),
        [Markup.button.callback("finished", "finished")]
      ]),

    })
    return;
  }
  if (res) {
    ctx.reply('', {
      ...Markup.keyboard([
        ...mainMenu.map((item) => (
          Markup.button.callback(item.text, item.callback_data)
        ))
      ]),
    })
  }

})

bot.action("notification", async (ctx) => {

})

bot.action("search", async (ctx) => {

})

bot.action("help", async (ctx) => {

})

bot.action("setting", async (ctx) => {

})



bot.action(/opt-[0-9]/, ctx => {
  const indexMatch = ctx.match.input;

  console.log(ctx.match);


  ctx.session.menuNew = ctx?.session?.menuNew.map((opt) => (indexMatch == opt.callback_data ? {
    ...opt,
    isSelected: !opt.isSelected
  } : {
    ...opt,
  }))

  ctx.editMessageReplyMarkup({
    inline_keyboard: [
      ...ctx?.session?.menuNew.map((item, index) => (item.isSelected ?
        [{ text: "✅ " + item.text, callback_data: item.callback_data }] :
        [{ text: item.text, callback_data: item.callback_data }]
      )),
      [Markup.button.callback("finished", "finished")]
    ]
  })

})


bot.action("finished", ctx => {
  ctx.editMessageReplyMarkup({
    inline_keyboard: [
    ]
  })
  ctx.session.selectedMenu = ctx?.session?.menuNew
    .filter((item) => item.isSelected)
    .map((item) => item.text)

  console.log(ctx.session.selectedMenu);
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})