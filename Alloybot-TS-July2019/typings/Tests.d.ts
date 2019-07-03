interface PluginProperties {
    id: string;
    name?: string;
    version?: string;
    dependencies?: {
        [key: string]: string;
    };
}
declare function Plugin(PluginProperties: PluginProperties): (target: any) => any;
declare class Example {
    constructor();
}
