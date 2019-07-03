import { default as Alloybot, IFace, Util, ConfigBuilder } from '../../index';
import { default as Invite } from './lib/Invite';
import { Client } from 'discord.js';

class Discord extends IFace.IConnection {
  static INSTANCE: Discord = new Discord();
  protected Name: string = 'Discord';
  protected Dependencies: string[] = [];
  protected Dependants: IFace.IPlugin[] = Alloybot.getDependants(this.Name);
  protected Connection: Client = new Client();
  protected Logger: Util.Logger = new Util.Logger(this.Name);
  protected Config;

  constructor() {
    super();
    let _config: ConfigBuilder = new ConfigBuilder(this.Name, require('./package.json').version);
    _config.addOption('token', ['string'], 'Discord Bot Token');
    _config.addOption('permissions', ['Array<string>'], 'Bot Permissions to be added when invited via link. (Requires Commander plugin)');
    _config.close();
    this.Config = _config.getConfig();

    if (Alloybot.isPluginLoaded('Commander')) {
      Alloybot.getPlugin('Commander').registerCommand(new Invite(this.Config.permissions));
    } else {
      this.Logger.note('Commander not loaded. Leaving commands unloaded.');
    }
  }

  public connect(): Discord {
    this.Connection.login(this.Config.token);
    return this;
  }
}

export default Discord.INSTANCE.connect();
