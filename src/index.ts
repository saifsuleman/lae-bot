import CommandHandler from "./commandhandler";
import discord, { Intents, Message, MessageEmbed } from "discord.js";
import dotenv from "dotenv";
import init from "./commands";

export default class Bot extends discord.Client {
  commandHandler: CommandHandler;

  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

    this.commandHandler = new CommandHandler("+");

    this.on("ready", () => console.log(`Connected as: ${this.user!.tag}`));
    this.on("messageCreate", async (m: Message) => {
      if (m.author.bot || m.author === this.user) return;

      try {
        await this.commandHandler.onMessage(m);
      } catch (e: any) {
        m.channel.send(`:x: ${e}`).catch((_) => {});
      }
    });
  }
}

dotenv.config();
const bot = new Bot();
init(bot.commandHandler);
bot.login(process.env["TOKEN"]);
