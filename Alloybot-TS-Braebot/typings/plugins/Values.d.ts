import { Signale } from 'signale';
import * as DJS from 'discord.js';
import * as MDB from 'mongodb';
export default class Values {
    static Discord: DJS.Client;
    static OwnerID: string;
    static Owner: DJS.User;
    static GuildID: string;
    static Guild: DJS.Guild;
    static RoleChannelID: string;
    static RoleChannel: DJS.TextChannel;
    static MusicChannelID: string;
    static MusicChannel: DJS.TextChannel;
    static MongoClient: Promise<MDB.MongoClient>;
    static Database: MDB.Db;
    static Logger: Signale;
    constructor();
    static GetGuild(GuildID: string): DJS.Guild;
    static GetChannel(ChannelID: string): DJS.GuildChannel;
    static GetUser(UserID: string): DJS.User;
    static GetRole(RoleID: string): DJS.Role;
    static SendDirectMessage(UserID: string, Message: any, Options?: DJS.MessageOptions): void;
    static SendError(Error: any): void;
    static ListGuildRoles(): void;
    static GetGuildRoles(): string[];
    static GetMinutes(time: number): string;
}
