/*
 * alloybot.Alloybot | Multipurpose "any-bot"
 *     Copyright (C) 2019 Taylor
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package config;

import util.Logger;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;

public class Config {
    private final util.Logger Logger = new Logger("Config");
    private String contents;
    private Path directory;
    private String name;
    private File file;
    private String version;
    private final String indent = "  ";


    public Config(String name, String version) {
        String[] split = name.split("/");
        this.name = split[split.length - 1];
        this.version = version;

        Path baseDirectory = FileSystems.getDefault().getPath("alloybot/config");
        this.directory = FileSystems.getDefault().getPath(baseDirectory.toString(), split);
        this.contents = "";
    }

    public String getName() {
        return this.name;
    }

    public String getVersion() {
        return this.version;
    }

    public Path getDirectory() {
        return this.directory;
    }


}
