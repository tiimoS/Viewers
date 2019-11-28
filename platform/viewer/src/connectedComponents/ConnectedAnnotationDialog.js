import { connect } from 'react-redux';
import { AnnotationDialog } from '@ohif/ui';
import OHIF from '@ohif/core';
// Our target output kills the `as` and "import" throws a keyword error
// import { import as toolImport, getToolState } from 'cornerstone-tools';

const { setViewportSpecificData } = OHIF.redux.actions;

const mapStateToProps = (state, ownProps) => {
  OHIF.log.info('mapState state', state);
  OHIF.log.info('mapState props', ownProps);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  OHIF.log.info('mapDispatch dispatch', dispatch);
  OHIF.log.info('mapDispatch props', ownProps);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  OHIF.log.info('mergeProps stateprops', stateProps);
  OHIF.log.info('mergeProps dispatchprops', dispatchProps);
  OHIF.log.info('mergeProps ownProbps', ownProps);
};

/*
// Why do I need or care about any of this info?
// A dispatch action should be able to pull this at the time of an event?
// `isPlaying` and `cineFrameRate` might matter, but I think we can prop pass for those.
const mapStateToProps = state => {
  // Get activeViewport's `cine` and `stack`
  const { viewportSpecificData, activeViewportIndex } = state.viewports;
  const { annotation, dom } = viewportSpecificData[activeViewportIndex] || {};

  const annotationData = annotation || {
    isOpen: false,
  };

  // New props we're creating?
  return {
    activeEnabledElement: dom,
    activeViewportCineData: annotationData,
    activeViewportIndex: state.viewports.activeViewportIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetViewportSpecificData: (viewportIndex, data) => {
      dispatch(setViewportSpecificData(viewportIndex, data));
    },
  };
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
  const { activeViewportAnnotationData } = propsFromState;

  return {
    isOpen: activeViewportAnnotationData.isOpen,
  };
};*/

const ConnectedAnnotationDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AnnotationDialog);

export default ConnectedAnnotationDialog;
