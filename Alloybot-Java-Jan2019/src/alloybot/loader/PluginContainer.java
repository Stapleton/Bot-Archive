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

package loader;

import com.google.common.collect.ImmutableMap;
import loader.versioning.ArtifactVersion;

import java.io.File;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface PluginContainer {
    public static enum Disableable {
        YES, RESTART, NEVER, DEPENDENCIES;
    }

    String getPluginId();

    String getName();

    String getVersion();

    File getSource();

    PluginMetadata getMetadata();

    void bindMetadata(MetadataCollection mc);

    void setEnabledState(boolean enabled);

    Set<ArtifactVersion> getRequirements();

    Set<ArtifactVersion> getDependencies();

    Set<ArtifactVersion> getDependants();

    String getSortingRules();

    boolean registerBus(EventBus bus, LoadController controller);

    boolean matches(Object plugin);

    Object getPlugin();

    ArtifactVersion getProcessedVersion();

    boolean isImmutable();

    String getDisplayVersion();

    VersionRange acceptableAlloybotVersionRange();

    public static final Map<String, String> EMPTY_PROPERTIES = ImmutableMap.of();

    Map<String, String> getCustomPluginProperties();

    //public Class<?> getCustomResourcePackClass();

    Map<String, String> getSharedPluginDescriptor();

    Disableable canBeDisabled();

    List<String> getOwnedPackages();

    boolean shouldLoadInEnvironment();

    URL getUpdateUrl();

    void setClassVersion(int classVersion);

    int getClassVersion();
}
