/**
 * Created by twi18192 on 03/11/15.
 */

var graphInitialisedEvent = new Event('graphInitialised');
var firChangedEvent = new Event('changed');

/* editor events */

/* Firing for regular methods */

var customEditorWidthChanged = new Event('EditorWidthChanged');
var customEditorHeightChanged = new Event('EditorHeightChanged');
var customEditorGraphChanged = new Event('EditorGraphChanged');
//var customEditorAttached = new Event('EditorAttached');

/* Firing for lifecycle methods */

var customEditorCreated = new Event('EditorCreated');
var customEditorReady = new Event('EditorReady');
var customEditorAttached = new Event('EditorAttached'); /* Runs the 'attached' function in editor */
var customEditorAttachedHasRan = new Event('EditorAttachedHasRan'); /* Event saying that attached has now been run, do something else */

/* graph events */

/* Firing for regular methods */

var customGraphWidthChanged = new Event('GraphWidthChanged');
var customGraphHeightChanged = new Event('GraphHeightChanged');
var customGraphGraphChanged = new Event('GraphGraphChanged');

var customGraphPropertyGraph = new Event('GraphPropertyGraph');

/* Firing for lifecycle methods */

var customGraphCreated = new Event('GraphCreated');
var customGraphReady = new Event('GraphReady');