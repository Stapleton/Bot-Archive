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
import util.Logger;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.jar.JarFile;
import java.util.regex.Matcher;
import java.util.zip.ZipEntry;

public class PluginDiscoverer implements IClassDiscoverer {

    @Override
    public List<PluginContainer> discover(PluginCandidate candidate, ASMDataTable table) {
        List<PluginContainer> foundPlugins = Lists.newArrayList();
        Logger.debug("Examining file {} for potential plugins.", candidate.getPluginContainer().getName());
        try (JarFile jar = new JarFile(candidate.getPluginContainer())) {
            ZipEntry pluginInfo = jar.getEntry("plugin.info");
            MetadataCollection mc = null;
            if (pluginInfo != null) {
                Logger.trace("Located plugin.info file in file {}", candidate.getPluginContainer().getName());
                try (InputStream inputStream = jar.getInputStream(pluginInfo)) {
                    mc = MetadataCollection.from(inputStream, candidate.getPluginContainer().getName());
                }
            } else {
                Logger.debug("The plugin container {} appears to be missing a plugin.info file.", candidate.getPluginContainer().getName());
                mc = MetadataCollection.from(null, "");
            }

            findClassesASM(candidate, table, jar, foundPlugins, mc);
        } catch (Exception e) {
            Logger.warn("Zip file {} failed to read properly, it will be ignored.", candidate.getPluginContainer().getName(), e);
        }
        return foundPlugins;
    }

    private void findClassesASM(PluginCandidate candidate, ASMDataTable table, JarFile jar, List<PluginContainer> foundPlugins, MetadataCollection mc) throws IOException {
        for (ZipEntry ze : Collections.list(jar.entries())) {
            if (ze.getName() != null && ze.getName().startsWith("__MACOSX")) {
                continue;
            }
            Matcher match = classFile.matcher(ze.getName());
            if (match.matches()) {
                ASMPluginParser pluginParser;
                try {
                    try (InputStream inputStream = jar.getInputStream(ze)) {
                        pluginParser = new ASMPluginParser(inputStream);
                    }
                    candidate.addClassEntry(ze.getName());
                } catch (LoaderException e) {
                    Logger.error("There was a problem reading the entry {} in the jar {} - probably a corrupt zip.", ze.getName(), candidate.getPluginContainer().getPath(), e);
                    jar.close();
                    throw e;
                }
                pluginParser.validate();
                pluginParser.sendToTable(table, candidate);
                PluginContainer container = PluginContainerFactory.instance().build(pluginParser, candidate.getPluginContainer(), candidate);
                if (container != null) {
                    table.addContainer(container);
                    foundPlugins.add(container);
                    container.bindMetadata(mc);
                    container.setClassVersion(pluginParser.getClassVersion());
                }
            }
        }
    }
}
