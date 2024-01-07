import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();

// Initializes your app with your bot token and signing secretd
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN // add this
  });

  app.message(/2:46|246/, async ({ message, client }) => {

    if (message.subtype) return;
    const timestamp = new Date(Number(message.ts) * 1000);
    // if((timestamp.getHours() === 2 || timestamp.getHours() === 14) && timestamp.getMinutes() === 46) {
      app.client.reactions.add({ channel: message.channel, timestamp: message.ts, name: "lobster" })
      app.client.reactions.add({ channel: message.channel, timestamp: message.ts, name: "eyes" })

      console.log(message.user);

      const result = await client.users.info({
        user: message.user,
     });

      if(message.user && result.user && result.user.name) {
        const user = await prisma.user.upsert({
          where:{slackID: message.user},
          update: { 
            slackID: message.user,
            username: result.user?.name,
            weeklyHits: {increment: 1},
            monthlyHits: {increment: 1},
            yearlyHits: {increment: 1},
            allTimeHits: {increment: 1},
            credits: 0, },
          create: { 
            slackID: message.user,
            username: result.user.name,
            weeklyHits: 0,
            monthlyHits: 0,
            yearlyHits: 0,
            allTimeHits: 0,
            credits: 0, 
          },
        });
        console.log(user);
      }

      // }

    if((timestamp.getHours() === 2 || timestamp.getHours() === 14) && timestamp.getMinutes() === 46) {
      app.client.reactions.add({ channel: message.channel, timestamp: message.ts, name: "skull" })
    }
    });

    async function userExists(userId: string): Promise<boolean> {
      const exists = await prisma.user.findFirst({
        where: {
          slackID: userId,
        },
      }).then(data => {
        console.log(data);
        if(data) {
          return true;
        } else {
          return false;
        }
      })
      return exists;
    }
    
  (async () => {
    // Start your app
    await app.start();
    console.log('⚡️ Bolt app is running!');
  })();