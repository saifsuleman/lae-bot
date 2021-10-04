import { Message } from "discord.js";
import ICommand from "../command";

const PYRO = "253934683996422145";

export default class SayCommand implements ICommand {
  id: string = "say";

  async exec(args: string[], m: Message): Promise<void> {
    if (m.author.id !== PYRO) {
      await m.channel.send(":x: You are not Saif!");
      return;
    }

    const content = args.join(" ");
    await m.channel.send(content);
  }
}
