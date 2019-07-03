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

import com.google.common.collect.*;
import loader.PluginContainer;
import org.apache.commons.lang3.tuple.Pair;

import javax.annotation.Nullable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;

public class ASMDataTable {
    public final static class ASMData implements Cloneable {
        private PluginCandidate candidate;
        private String annotationName;
        private String className;
        private String objectName;
        private int classVersion;
        private Map<String, Object> annotationInfo;

        public ASMData(PluginCandidate candidate, String annotationName, String className, @Nullable String objectName, @Nullable Map<String, Object> info) {
            this.candidate = candidate;
            this.annotationName = annotationName;
            this.className = className;
            this.objectName = objectName;
            this.annotationInfo = info;
        }

        public PluginCandidate getCandidate() {
            return candidate;
        }

        public String getAnnotationName() {
            return annotationName;
        }

        public String getClassName() {
            return className;
        }

        public String getObjectName() {
            return objectName;
        }

        public Map<String, Object> getAnnotationInfo() {
            return annotationInfo;
        }

        public ASMData copy(Map<String, Object> newAnnotationInfo) {
            try {
                ASMData clone = (ASMData) this.clone();
                clone.annotationInfo = newAnnotationInfo;
                return clone;
            } catch (CloneNotSupportedException e) {
                throw new RuntimeException("Impossible", e);
            }
        }
    }

    private static class PluginContainerPredicate implements Predicate<ASMData> {
        private PluginContainer container;
        public PluginContainerPredicate(PluginContainer container) {
            this.container = container;
        }

        @Override
        public boolean apply(ASMData data) {
            return container.getSource().equals(data.candidate.getPluginContainer());
        }
    }

    private final SetMultimap<String, ASMData> globalAnnotationData = HashMultimap.create();
    private Map<PluginContainer, SetMultimap<String, ASMData>> containerAnnotationData;

    private List<PluginContainer> containers = Lists.newArrayList();
    private SetMultimap<String, PluginCandidate> packageMap = HashMultimap.create();

    public SetMultimap<String, ASMData> getAnnotationsFor(PluginContainer container) {
        if (containerAnnotationData == null) {
            containerAnnotationData = containers.parallelStream()
                    .map(cont -> Pair.of(cont, ImmutableSetMultimap.copyOf(Multimaps.filterValues(globalAnnotationData, new PluginContainerPredicate(cont)))))
                    .collect(ImmutableMap.toImmutableMap(Pair::getKey, Pair::getValue));
        }
        return containerAnnotationData.get(container);
    }

    public Set<ASMData> getAll(String annotation) {
        return globalAnnotationData.get(annotation);
    }

    public void addASMData(PluginCandidate candidate, String annotation, String className, @Nullable String objectName, @Nullable Map<String, Object> annotationInfo) {
        globalAnnotationData.put(annotation, new ASMData(candidate, annotation, className, objectName, annotationInfo));
    }

    public void addContainer(PluginContainer container) {
        this.containers.add(container);
    }

    public void registerPackage(PluginCandidate candidate, String pkg) {
        this.packageMap.put(pkg, candidate);
    }

    public Set<PluginCandidate> getCandidatesFor(String pkg) {
        return this.packageMap.get(pkg);
    }

    @Nullable
    public static String getOwnerPluginID(Set<ASMData> plugins, ASMData target) {
        if (plugins.size() == 1) {
            return (String) plugins.iterator().next().getAnnotationInfo().get("plugid");
        } else {
            for (ASMData p : plugins) {
                if (target.getClassName().startsWith(p.getClassName())) {
                    return (String) p.getAnnotationInfo().get("plugid");
                }
            }
        }
        return null;
    }
}
