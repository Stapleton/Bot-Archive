import { default as Alloybot, IFace, Util, ConfigBuilder } from '../../index';

class Musicbot extends IFace.IPlugin {
  static INSTANCE: Musicbot = new Musicbot();
  protected Name: string = 'Musicbot';
  protected Dependencies: string[] = ['Commander', 'Discord', 'MongoDB'];
  protected Dependants: IFace.IPlugin[] = Alloybot.getDependants(this.Name);
  protected Logger: Util.Logger = new Util.Logger(this.Name);
  protected Config;

  constructor() {
    super();
    let _config: ConfigBuilder = new ConfigBuilder(this.Name, require('./package.json').version);
    _config.addOption('Name', ['string'], 'Name of the Musicbot');
    _config.close();
    this.Config = _config.getConfig();
  }
}

export default Musicbot.INSTANCE;
