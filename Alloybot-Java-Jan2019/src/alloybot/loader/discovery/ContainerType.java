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

package loader.discovery;

import loader.PluginContainer;

import java.util.List;

public enum ContainerType {
    JAR(JarDiscoverer.class),
    DIR(DirectoryDiscoverer.class);

    private IClassDiscoverer discoverer;

    private ContainerType(Class<? extends IClassDiscoverer> discovererClass) {
        try {
            this.discoverer = discovererClass.newInstance();
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    public List<PluginContainer> findPlugins(PluginCandidate candidate, ASMDataTable table) {
        return discoverer.discover(candidate, table);
    }
}
