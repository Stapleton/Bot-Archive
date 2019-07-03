import * as DJS from 'discord.js';
import * as MDB from 'mongodb';
export default class Plugin {
    protected MongoDB: Promise<MDB.MongoClient>;
    protected Discord: DJS.Client;
    protected GuildID: string;
    protected Guild: DJS.Guild;
    protected OwnerID: string;
    protected Owner: DJS.User;
    protected DMOwner: DJS.DMChannel;
    constructor();
    private GetGuild;
    private GetChannel;
    private GetUser;
}
