import { Message } from "discord.js";

export default interface ICommand {
  id: string;
  exec(args: string[], m: Message): Promise<void>;
}
