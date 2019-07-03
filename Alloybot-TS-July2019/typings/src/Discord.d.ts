import * as DJS from 'discord.js';
declare class Discord extends DJS.Client {
    private Logger;
    static instance: Discord;
    Guild: DJS.Guild;
    Owner: DJS.User;
    constructor();
    GetGuild(GuildID: string): DJS.Guild;
    GetChannel(ChannelID: string): DJS.GuildChannel;
    GetUser(UserID: string): DJS.User;
    GetRole(RoleID: string): DJS.Role;
    SendDirectMessage(UserID: string, Message: any, Options?: DJS.MessageOptions): void;
    SendError(Error: any): void;
    GetGuildRoles(): string[];
    ListGuildRoles(): void;
}
declare const _default: Discord;
export = _default;
