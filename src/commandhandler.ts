import { Message } from "discord.js";
import ICommand from "./command";

export default class CommandHandler {
  private commands: Map<string, ICommand>;
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
    this.commands = new Map();
  }

  public async onMessage(message: Message): Promise<void> {
    if (!message.content.startsWith(this.prefix)) return;

    const content: string = message.content.substring(this.prefix.length);
    if (!content.length) return;

    const arr = content.split(" ");
    if (!this.commands.has(arr[0])) return;

    const command = this.commands.get(arr[0]);
    await message.delete();
    return command!.exec(message, arr.slice(1, arr.length));
  }

  public registerCommand(
    id: string,
    exec: (m: Message, args: string[]) => Promise<any>
  ) {
    console.log(`Initializing command: ${id}`);
    const command: ICommand = { id, exec };
    this.commands.set(id, command);
  }
}
