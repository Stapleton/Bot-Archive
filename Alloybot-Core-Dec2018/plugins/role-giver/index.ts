import { default as Alloybot, IFace, Util, ConfigBuilder } from '../../index';

const Discord = Alloybot.getConnection('Discord');

class RoleGiver extends IFace.IPlugin {
  static INSTANCE: RoleGiver = new RoleGiver();
  protected Name: string = 'Role Giver';
  protected Dependencies: string[] = ['Commander', 'Discord'];
  protected Dependants: IFace.IPlugin[] = Alloybot.getDependants(this.Name);
  protected Logger: Util.Logger = new Util.Logger(this.Name);
  protected Config;

  constructor() {
    super();
    let _config: ConfigBuilder = new ConfigBuilder(this.Name, require('./package.json').version);
    _config.close();
    this.Config = _config.getConfig();
  }
}

export default RoleGiver.INSTANCE;
