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

package util;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;

public class Logger {
    public static final org.apache.logging.log4j.Logger ALogger = LogManager.getLogger("Alloybot");

    private Logger() {
    }

    public static void log(Level level, Object obj) {
        ALogger.log(level, obj);
    }

    public static void all(Object obj) {
        log(Level.ALL, obj);
    }

    public static void debug(Object obj) {
        log(Level.DEBUG, obj);
    }

    public static void trace(Object obj) {
        log(Level.TRACE, obj);
    }

    public static void fatal(Object obj) {
        log(Level.FATAL, obj);
    }

    public static void error(Object obj) {
        log(Level.ERROR, obj);
    }

    public static void warn(Object obj) {
        log(Level.WARN, obj);
    }

    public static void info(Object obj) {
        log(Level.INFO, obj);
    }

    public static void off(Object obj) {
        log(Level.OFF, obj);
    }
}
