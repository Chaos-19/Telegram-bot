require("dotenv").config();
import express, { Express, Request, Response } from "express"
import { Composer, Context, Markup, Scenes, session, Telegraf } from "telegraf";
import cron from 'node-cron';


import { scrape } from './services/scrapingService';
import { insertData } from "./controllers/db/dbController";
import { createUser, isUserExist } from "./controllers/user/userController";
import { text } from "stream/consumers";
import { jobType, mainMenu, menu } from "./utils";

import type { Update } from "telegraf/types";
import { supabase } from "./config/connetDB";

const app: Express = express();


interface MyContext extends Context {
  session: {
    menuNew: typeof menu;
    selectedMenu: string[];
    jobType: { text: string; callback_data: string, isSelected: boolean }[]
  }
}

const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN as string);
(async () => app.use(await bot.createWebhook({ domain: process.env.WEBHOOK_DOMAIN as string })))()
bot.launch();
bot.use(Telegraf.log());
bot.use(session({ defaultSession: () => ({ menuNew: [...menu], selectedMenu: [], jobType: [...jobType] }) }));


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
cron.schedule('*/5 * * * *', async () => { // Every 15 minutes
  console.log("Cron job started");

  try {

    const { data: scraperTitleList, error } = await supabase
      .from("scraperTitleList")
      .select()

    scraperTitleList?.forEach(async (job) => {
      const data = await scrape('https://afriworket.com/job', [job.inputValu as string]);
      await insertData(data);
    })

  } catch (error) {
    new Error();
  }
});


bot.start(async (ctx) => {
  const res = await isUserExist(ctx.from.id)

  if (!res) {
    await ctx.replyWithHTML(`<b>Hi there!</b> I'm your Ethiopio Internship and Developer Job search assistant.I can help you land your perfect software engineering role,whether it's your first internship or your next career step.`, {
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        ...ctx?.session?.menuNew.map((option, index) => (
          [Markup.button.callback(option.text, option.callback_data)]
        )),
        [Markup.button.callback("finished", "finished")]
      ]),

    })
  } else {
    ctx.reply('Wellcom back', {
      ...Markup.keyboard([
        ...mainMenu.map((item) => (
          Markup.button.callback(item.text, item.callback_data)
        ))
      ]),
    })
  }
})

/* bot.action("notification", async (ctx) => {

})

bot.action("search", async (ctx) => {

})

bot.action("help", async (ctx) => {

})

bot.action("setting", async (ctx) => {

})
 */


bot.action(/opt-[0-9]/, async ctx => {
  const indexMatch = ctx.match.input;

  console.log(ctx.match);


  ctx.session.menuNew = ctx?.session?.menuNew.map((opt) => (indexMatch == opt.callback_data ? {
    ...opt,
    isSelected: !opt.isSelected
  } : {
    ...opt,
  }))

  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      ...ctx?.session?.menuNew.map((item, index) => (item.isSelected ?
        [{ text: "✅ " + item.text, callback_data: item.callback_data }] :
        [{ text: item.text, callback_data: item.callback_data }]
      )),
      [Markup.button.callback("finished", "finished")]
    ]
  })
})


bot.action("finished", async ctx => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
    ]
  })
  await ctx.replyWithHTML("select thr type of job you to be notified",
    {
      ...Markup.inlineKeyboard([
        ...ctx.session.jobType.map((item, index) => (
          [Markup.button.callback(item.text, item.callback_data)]

        )),
        [Markup.button.callback("Submit", "jobType")]
      ])
    })

  ctx.session.selectedMenu = ctx?.session?.menuNew
    .filter((item) => item.isSelected)
    .map((item) => item.text)

  console.log(ctx.session.selectedMenu);
})

bot.action(/type-[1-5]/, async (ctx) => {
  const matchIndex = ctx.match.input

  ctx.session.jobType = ctx.session.jobType.map((opt) => (matchIndex == opt.callback_data ? {
    ...opt,
    isSelected: !opt.isSelected
  } : {
    ...opt,
  }))

  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      ...ctx.session.jobType.map((item, index) => (item.isSelected ?
        [Markup.button.callback(`✔️ ${item.text}`, item.callback_data)] :
        [Markup.button.callback(item.text, item.callback_data)]
      )),
      [Markup.button.callback("finished", "jobType")]
    ]
  })
})

bot.action("jobType", async ctx => {
  await ctx.deleteMessage()
  await createUser({
    first_name: ctx.from.first_name,
    telegram_id: ctx.from.id,
    job_list: ctx.session.selectedMenu,
    jobType: ctx.session.jobType.filter((type) => type.isSelected).map(type => type.text)
  })
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})