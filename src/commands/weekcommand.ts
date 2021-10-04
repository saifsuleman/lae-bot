import { Message, MessageEmbed } from "discord.js";
import ICommand from "../command";

export default class WeekCommand implements ICommand {
  id: string = "week";

  async exec(args: string[], m: Message): Promise<void> {
    const week = (this.getWeek() % 2) + 1;
    await this.sendEmbed(week, m);
  }

  getWeek(): number {
    const d = new Date();
    const genesis = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor(
      (d.getTime() - genesis.getTime()) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((d.getDay() + 1 + days) / 7) + 1;
  }

  async sendEmbed(week: number, m: Message) {
    let embed = new MessageEmbed()
      .setTitle("Week Counter")
      .setColor("#178ee8")
      .addField("Week", week.toString());
    await m.channel.send({ embeds: [embed] });
  }
}
