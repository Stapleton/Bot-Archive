function Plugin<T extends typeof PluginBase>(id: string, name?: string, version?: string, dependencies?: {[key: string]: string}) {
  return function(PluginBase: T) {
    let boi = new target();
    boi.ID = id;
    
    console.log(`Target: ${boi.ID}`);
  }
}

class PluginBase {
  constructor() {

  }
}

/*function Plugin<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}*/

@Plugin('test')
class Example {
  constructor() {
  }
}

new Example();
