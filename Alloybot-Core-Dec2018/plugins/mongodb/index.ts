import { default as Alloybot, IFace, Util, ConfigBuilder } from '../../index';
import { MongoClient } from 'mongodb';

class MongoDB extends IFace.IConnection {
  protected Name: string = 'MongoDB';
  protected Connection: MongoClient;
  protected Dependencies: string[] = [];
  protected Dependants: IFace.IPlugin[] = Alloybot.getDependants(this.Name);
  protected Logger: Util.Logger = new Util.Logger(this.Name);
  protected Config;

  constructor() {
    super();
    let _config: ConfigBuilder = new ConfigBuilder(this.Name, require('./package.json').version);
    _config.addOption('uri', ['string'], 'Documentation Link Here!');
    _config.close();
    this.Config = _config.getConfig();
  }

  public connect(): MongoDB {
    this.Connection = new MongoClient(this.Config.uri);
    return this;
  }
}

let INSTANCE = new MongoDB();

export default INSTANCE.connect();
