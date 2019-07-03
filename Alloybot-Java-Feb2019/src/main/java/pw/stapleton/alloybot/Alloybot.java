package pw.stapleton.alloybot;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import pw.stapleton.commander.common.TestCommand;

import javax.security.auth.login.LoginException;

@SuppressWarnings("MagicConstant")
public class Alloybot {
    public static void main(String[] args) throws LoginException {
        JDA jda = new JDABuilder("TOKEN HERE").build();
        jda.addEventListener(new TestCommand());
    }
}