/*
 * Alloybot | Multipurpose "any-bot"
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

import loader.Plugin;
import util.Logger;
import util.Reference;

import java.util.concurrent.ConcurrentHashMap;

public class Alloybot {
    public static final ConcurrentHashMap<String, Plugin> PLUGINS = new ConcurrentHashMap<>();
    private final Logger logger = new Logger("Alloybot");

    public Alloybot() {
        logger.info(Reference.WORKINGDIR);
    }

    public static void main(String[] args) {
        new Alloybot();
    }
}
