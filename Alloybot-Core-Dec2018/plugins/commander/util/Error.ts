import { ICommand } from '../index';

export class NotLoadedError implements Error {
  name: string = 'NotLoadedError';
  message: string;
  stack?: string;
  constructor(Command: ICommand) {
    this.message = `Failed to load ${Command.Name}.`;
  }
}
