import CommandHandler from "./commandhandler";
import discord, { Intents, Message } from "discord.js";
import SayCommand from "./commands/saycommand";
import WeekCommand from "./commands/weekcommand";
import dotenv from "dotenv";

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
bot.commandHandler.registerCommand(new SayCommand());
bot.commandHandler.registerCommand(new WeekCommand());
bot.login(process.env["TOKEN"]);
