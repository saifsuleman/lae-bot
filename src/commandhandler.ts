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
    return command!.exec(arr.slice(1, arr.length), message);
  }

  public registerCommand(command: ICommand) {
    const { id } = command;
    this.commands.set(id, command);
  }
}
