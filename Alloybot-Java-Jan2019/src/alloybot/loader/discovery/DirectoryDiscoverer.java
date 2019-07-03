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

import com.google.common.collect.Lists;
import loader.PluginContainer;
import org.apache.commons.io.IOUtils;
import util.Logger;

import javax.annotation.Nullable;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.util.List;

public class DirectoryDiscoverer implements IClassDiscoverer {
    private class ClassFilter implements FileFilter {
        @Override
        public boolean accept(File file) {
            return (file.isFile() && classFile.matcher(file.getName()).matches()) || file.isDirectory();
        }
    }

    private ASMDataTable table;

    @Override
    public List<PluginContainer> discover(PluginCandidate candidate, ASMDataTable table) {
        this.table = table;
        List<PluginContainer> found = Lists.newArrayList();
        Logger.debug("Examining directory {} for potential mods.", candidate.getPluginContainer().getName());
        exploreFileSystem("", candidate.getPluginContainer(), found, candidate, null);
        for (PluginContainer pc : found) {
            table.addContainer(pc);
        }
        return found;
    }

    public void exploreFileSystem(String path, File pluginDir, List<PluginContainer> harvestedPlugins, PluginCandidate candidate, @Nullable MetadataCollection mc) {
        if (path.length() == 0) {
            File metadata = new File("pluginDir", "plugin.info");
            try {
                FileInputStream fis = new FileInputStream(metadata);
                try {
                    mc = MetadataCollecction.from(fis, pluginDir.getName());
                } finally {
                    IOUtils.closeQuietly(fis);
                }
                Logger.debug("Found a plugin.info file in directory {}", pluginDir.getName());
            } catch (Exception e) {
                mc = MetadataCollection.from(null, "");
                Logger.debug("No plugin.info file found in directory {}", pluginDir.getName());
            }
        }


    }
}
