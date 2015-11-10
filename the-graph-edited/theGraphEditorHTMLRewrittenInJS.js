/**
* Created by twi18192 on 28/10/15.
*/

(function () {

    var graph = require('./theGraphHTMLRewrittenInJS.js');

    //"use strict";

    var theGraphEditorHTMLRewrittenAsJSObject = {

        checkFunction: function () {

            console.log(this.properties);
            console.log(this);
        },

        passingPropertiesToGraph: function(){
            window.graph.properties.width = this.properties.width;
            window.graph.properties.height = this.properties.height;
            window.graph.properties.menus = this.properties.menus;
            window.graph.properties.scale = this.properties.scale;
            window.graph.properties.autolayout = this.properties.autolayout;
            window.graph.properties.theme = this.properties.theme;
            window.graph.properties.selectedNodes = this.properties.selectedNodes;
            window.graph.properties.errorNodes = this.properties.errorNodes;
            window.graph.properties.selectedEdges = this.properties.selectedEdges;
            window.graph.properties.animatedEdges = this.properties.animatedEdges;
            window.graph.properties.displaySelectionGroup = this.properties.displaySelectionGroup;
            window.graph.properties.forceSelection = this.properties.forceSelection;
            //window.graph['getMenuDef'] = window.editor.getMenuDef.bind(window.graph);
        },

        properties: {
            graph: null,
            grid: 72,
            snap: 36,
            width: 800,
            height: 600,
            scale: 1,
            plugins: {},
            nofloGraph: null,
            menus: null,
            autolayout: false,
            theme: "dark",
            selectedNodes: [],
            copyNodes: [],
            errorNodes: {},
            selectedEdges: [],
            animatedEdges: [],
            displaySelectionGroup: true,
            forceSelection: false
        },

        created: function () {
            this.pan = [0, 0]; /* Hmm, pan isn't in properties, what is this referring to then? */
            var pasteAction = function (graph, itemKey, item) {
                var pasted = TheGraph.Clipboard.paste(graph);
                this.properties.selectedNodes = pasted.nodes;
                this.properties.selectedEdges = [];
            }.bind(this); /* Similar to the bind(this) in graph.html, they refer to the <the-graph-editor> custom element here, so I'm gonna have to change this to something else, I just don't know what... */
            var pasteMenu = {
                icon: "paste",
                iconLabel: "paste",
                action: pasteAction
            };
            // Default context menu defs
            this.properties.menus = {
                main: {
                    icon: "sitemap",
                    e4: pasteMenu
                },
                edge: {
                    icon: "long-arrow-right",
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
                            // Remove selection
                            var newSelection = [];
                            for (var i = 0, len = this.properties.selectedEdges.length; i < len; i++) {
                                var selected = this.properties.selectedEdges[i];
                                if (selected !== item) {
                                    console.log(item);
                                    newSelection.push(selected);
                                }
                            }
                            this.properties.selectedEdges = newSelection;
                        }.bind(this)
                    }
                },
                node: {
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeNode(itemKey);
                            // Remove selection
                            var newSelection = [];
                            for (var i = 0, len = this.properties.selectedNodes.length; i < len; i++) {
                                var selected = this.properties.selectedNodes[i];
                                if (selected !== item) {
                                    newSelection.push(selected);
                                }
                            }
                            this.properties.selectedNodes = newSelection;
                        }.bind(this)
                    },
                    w4: {
                        icon: "copy",
                        iconLabel: "copy",
                        action: function (graph, itemKey, item) {
                            TheGraph.Clipboard.copy(graph, [itemKey]);
                        }
                    }
                },
                nodeInport: {
                    w4: {
                        icon: "sign-in",
                        iconLabel: "export",
                        action: function (graph, itemKey, item) {
                            var pub = item.port;
                            if (pub === 'start') {
                                pub = 'start1';
                            }
                            if (pub === 'graph') {
                                pub = 'graph1';
                            }
                            var count = 0;
                            // Make sure public is unique
                            while (graph.inports[pub]) {
                                count++;
                                pub = item.port + count;
                            }
                            var priNode = graph.getNode(item.process);
                            var metadata = {x: priNode.metadata.x - 144, y: priNode.metadata.y};
                            graph.addInport(pub, item.process, item.port, metadata);
                        }
                    }
                },
                nodeOutport: {
                    e4: {
                        icon: "sign-out",
                        iconLabel: "export",
                        action: function (graph, itemKey, item) {
                            var pub = item.port;
                            var count = 0;
                            // Make sure public is unique
                            while (graph.outports[pub]) {
                                count++;
                                pub = item.port + count;
                            }
                            var priNode = graph.getNode(item.process);
                            var metadata = {x: priNode.metadata.x + 144, y: priNode.metadata.y};
                            graph.addOutport(pub, item.process, item.port, metadata);
                        }
                    }
                },
                graphInport: {
                    icon: "sign-in",
                    iconColor: 2,
                    n4: {
                        label: "inport"
                    },
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeInport(itemKey);
                        }
                    }
                },
                graphOutport: {
                    icon: "sign-out",
                    iconColor: 5,
                    n4: {
                        label: "outport"
                    },
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeOutport(itemKey);
                        }
                    }
                },
                group: {
                    icon: "th",
                    s4: {
                        icon: "trash-o",
                        iconLabel: "ungroup",
                        action: function (graph, itemKey, item) {
                            graph.removeGroup(itemKey);
                        }
                    },
                    // TODO copy group?
                    e4: pasteMenu
                },
                selection: {
                    icon: "th",
                    w4: {
                        icon: "copy",
                        iconLabel: "copy",
                        action: function (graph, itemKey, item) {
                            TheGraph.Clipboard.copy(graph, item.nodes);
                        }
                    },
                    e4: pasteMenu
                }
            };
        },

        ready: function () {
        },
        attached: function () {
            window.dispatchEvent(customEditorAttachedHasRan)
        },
        detached: function () {
            for (var name in this.properties.plugins) {
                this.properties.plugins[name].unregister(this);
                delete this.properties.plugins[name];
            }
        },
        addPlugin: function (name, plugin) {
            this.properties.plugins[name] = plugin;
            plugin.register(this);
        },
        addMenu: function (type, options) {
            // options: icon, label
            this.properties.menus[type] = options;
        },
        addMenuCallback: function (type, callback) {
            if (!this.properties.menus[type]) {
                return;
            }
            this.properties.menus[type].callback = callback;
        },
        addMenuAction: function (type, direction, options) {
            if (!this.properties.menus[type]) {
                this.properties.menus[type] = {};
            }
            var menu = this.properties.menus[type];
            menu[direction] = options;
        },
        getMenuDef: function (options) {
            // Options: type, graph, itemKey, item
            if (options.type && this.properties.menus[options.type]) {
                var defaultMenu = this.properties.menus[options.type];
                if (defaultMenu.callback) {
                    return defaultMenu.callback(defaultMenu, options);
                }
                return defaultMenu;
            }
            return null;
        },
        widthChanged: function () {
            //alert("caller is " + arguments.callee.caller.toString());

            window.editorMockDOMNode.style.width = this.properties.width + "px";
            console.log(window.editorMockDOMNode);
        },
        heightChanged: function () {
            window.editorMockDOMNode.style.height = this.properties.height + "px";
        },

        graphChanged: function () {
            if (typeof this.properties.graph.addNode === 'function') {
                //this.buildInitialLibrary(this.properties.graph);
                this.properties.nofloGraph = this.properties.graph;
                return;
            }
            var noflo;
            if ('noflo' in window) {
                noflo = window.noflo;
            }
            if (!noflo && 'require' in window) {
                noflo = require('noflo');
            }
            if (!noflo) {
                console.warn('Missing noflo dependency! Should be built with Component.io or Browserify to require it.');
                return;
            }
            noflo.graph.loadJSON(this.properties.graph, function (nofloGraph) {
                //this.buildInitialLibrary(nofloGraph);
                this.properties.nofloGraph = nofloGraph;

                window.dispatchEvent(customGraphPropertyGraph);
            }.bind(this));
        },

        buildInitialLibrary: function (nofloGraph) {
            /*if (Object.keys(this.$.graph.library).length !== 0) {
             // We already have a library, skip
             // TODO what about loading a new graph? Are we making a new editor?
             return;
             }*/
            nofloGraph.nodes.forEach(function (node) {
                var component = {
                    name: node.component,
                    icon: 'cog',
                    description: '',
                    inports: [],
                    outports: []
                };
                Object.keys(nofloGraph.inports).forEach(function (pub) {
                    var exported = nofloGraph.inports[pub];
                    if (exported.process === node.id) {
                        for (var i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === exported.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: exported.port,
                            type: 'all'
                        });
                    }
                });
                Object.keys(nofloGraph.outports).forEach(function (pub) {
                    var exported = nofloGraph.outports[pub];
                    if (exported.process === node.id) {
                        for (var i = 0; i < component.outports.length; i++) {
                            if (component.outports[i].name === exported.port) {
                                return;
                            }
                        }
                        component.outports.push({
                            name: exported.port,
                            type: 'all'
                        });
                    }
                });
                nofloGraph.initializers.forEach(function (iip) {
                    if (iip.to.node === node.id) {
                        for (var i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === iip.to.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: iip.to.port,
                            type: 'all'
                        });
                    }
                });
                nofloGraph.edges.forEach(function (edge) {
                    var i;
                    if (edge.from.node === node.id) {
                        for (i = 0; i < component.outports.length; i++) {
                            if (component.outports[i].name === edge.from.port) {
                                return;
                            }
                        }
                        component.outports.push({
                            name: edge.from.port,
                            type: 'all'
                        });
                    }
                    if (edge.to.node === node.id) {
                        for (i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === edge.to.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: edge.to.port,
                            type: 'all'
                        });
                    }
                });
                this.registerComponent(component, true);
            }.bind(this));
        },

        registerComponent: function (definition, generated) {
            window.graph.registerComponent(definition, generated);
        },
        libraryRefresh: function () {
            window.graph.debounceLibraryRefesh();
        },
        updateIcon: function (nodeId, icon) {
            window.graph.updateIcon(nodeId, icon);
        },
        rerender: function () {
            window.graph.rerender();
        },
        triggerAutolayout: function () {
            window.graph.triggerAutolayout();
        },
        triggerFit: function () {
            window.graph.triggerFit();
        },
        animateEdge: function (edge) {
            // Make sure unique
            var index = this.properties.animatedEdges.indexOf(edge);
            if (index === -1) {
                this.properties.animatedEdges.push(edge);
            }
        },
        unanimateEdge: function (edge) {
            var index = this.properties.animatedEdges.indexOf(edge);
            if (index >= 0) {
                this.properties.animatedEdges.splice(index, 1);
            }
        },
        addErrorNode: function (id) {
            this.properties.errorNodes[id] = true;
            this.updateErrorNodes();
        },
        removeErrorNode: function (id) {
            this.properties.errorNodes[id] = false;
            this.updateErrorNodes();
        },
        clearErrorNodes: function () {
            this.properties.errorNodes = {};
            this.updateErrorNodes();
        },
        updateErrorNodes: function () {
            window.graph.errorNodesChanged();
        },
        focusNode: function (node) {
            window.graph.focusNode(node);
        },
        getComponent: function (name) {
            return window.graph.getComponent(name);
        },
        getLibrary: function () {
            return window.graph.library;
        },
        toJSON: function () {
            return this.properties.nofloGraph.toJSON();
        }

    };

    window.editor = theGraphEditorHTMLRewrittenAsJSObject;

    window.addEventListener('EditorCreated', window.editor.created.bind(window.editor));
    window.dispatchEvent(customEditorCreated);

    window.addEventListener('EditorReady', window.editor.ready.bind(window.editor));
    window.dispatchEvent(customEditorReady);

    window.addEventListener('EditorAttached', window.editor.attached.bind(window.editor));
    window.dispatchEvent(customEditorAttached);

    window.addEventListener('EditorWidthChanged', window.editor.widthChanged.bind(window.editor));
    window.addEventListener('EditorHeightChanged', window.editor.heightChanged.bind(window.editor));
    window.addEventListener('EditorGraphChanged', window.editor.graphChanged.bind(window.editor));

})();
