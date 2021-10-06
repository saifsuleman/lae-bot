import { MessageEmbed } from "discord.js";
import CommandHandler from "./commandhandler";

const PYRO = "253934683996422145";

const init = (commandHandler: CommandHandler) => {
  commandHandler.registerCommand("say", async (m, args) => {
    if (m.author.id !== PYRO) {
      return m.channel.send("You are not Pyro!");
    }
    return m.channel.send(args.join(" "));
  });

  commandHandler.registerCommand("week", async (m) => {
    const d = new Date();
    const genesis = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor(
      (d.getTime() - genesis.getTime()) / (24 * 60 * 60 * 1000)
    );
    const week = Math.ceil((d.getDay() + 1 + days) / 7) % 2;
    const embed = new MessageEmbed()
      .setTitle("Week Counter")
      .setColor("#178ee8")
      .addField("Week", week.toString());
    return m.channel.send({ embeds: [embed] });
  });

  commandHandler.registerCommand("eval", async (m, args) => {
    if (m.author.id !== PYRO) {
      return m.channel.send("You are not Pyro!");
    }

    const query = args.join(" ");
    const response = await eval(`await (() => ${query})()`);

    return m.channel.send("**EVAL RESPONSE:**\n\n```" + response + "```");
  });
};

export default init;
