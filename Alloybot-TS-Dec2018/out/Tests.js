var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function Plugin(id, name, version, dependencies) {
    return function (target) {
        let boi = new target();
        boi.ID = id;
        console.log(`Target: ${boi.ID}`);
    };
}
/*function Plugin<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
      newProperty = "new property";
      hello = "override";
  }
}*/
let Example = class Example {
    //public ID: string;
    //static Name: string;
    //static Version: string;
    //static Dependencies: {[key: string]: string};
    constructor() {
    }
};
Example = __decorate([
    Plugin('test'),
    __metadata("design:paramtypes", [])
], Example);
new Example();
//# sourceMappingURL=Tests.js.map