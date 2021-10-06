import { Message } from "discord.js";

export default interface ICommand {
  id: string;
  exec(m: Message, args: string[]): Promise<any>;
}
