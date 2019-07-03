declare function Plugin(id: string, name?: string, version?: string, dependencies?: {
    [key: string]: string;
}): (target: any) => void;
declare class Example {
    constructor();
}
