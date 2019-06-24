import {
  vtkInteractorStyleMPRCrosshairs,
  vtkInteractorStyleMPRSlice,
  vtkInteractorStyleMPRWindowLevel,
  vtkSVGCrosshairsWidget,
  vtkSVGWidgetManager,
} from 'react-vtkjs-viewport';

import setMPRLayout from './utils/setMPRLayout.js';
import setViewportToVTK from './utils/setViewportToVTK.js';
import vtkCoordinate from 'vtk.js/Sources/Rendering/Core/Coordinate';
import vtkMatrixBuilder from 'vtk.js/Sources/Common/Core/MatrixBuilder';

// TODO: Put this somewhere else
let apis = [];

window.apis = apis;

function getCrosshairCallbackForIndex(index) {
  return ({ worldPos }) => {
    // Set camera focal point to world coordinate for linked views
    apis.forEach((api, viewportIndex) => {
      if (viewportIndex !== index) {
        // We are basically doing the same as getSlice but with the world coordinate
        // that we want to jump to instead of the camera focal point.
        // I would rather do the camera adjustment directly but I keep
        // doing it wrong and so this is good enough for now.
        const renderWindow = api.genericRenderWindow.getRenderWindow();

        const istyle = renderWindow.getInteractor().getInteractorStyle();
        const sliceNormal = istyle.getSliceNormal();
        const transform = vtkMatrixBuilder
          .buildFromDegree()
          .identity()
          .rotateFromDirections(sliceNormal, [1, 0, 0]);

        const mutatedWorldPos = worldPos.slice();
        transform.apply(mutatedWorldPos);
        const slice = mutatedWorldPos[0];

        istyle.setSlice(slice);

        renderWindow.render();
      }

      const renderer = api.genericRenderWindow.getRenderer();
      const wPos = vtkCoordinate.newInstance();
      wPos.setCoordinateSystemToWorld();
      wPos.setValue(worldPos);

      const displayPosition = wPos.getComputedDisplayValue(renderer);
      const { svgWidgetManager } = api;
      api.svgWidgets.crosshairsWidget.setPoint(
        displayPosition[0],
        displayPosition[1]
      );
      svgWidgetManager.render();
    });
  };
}

async function _getActiveViewportVTKApi(viewports) {
  const { layout, viewportSpecificData, activeViewportIndex } = viewports;

  const currentData = layout.viewports[activeViewportIndex];
  if (currentData && currentData.plugin === 'vtk') {
    // TODO: I was storing/pulling this from Redux but ran into weird issues
    if (apis[activeViewportIndex]) {
      return apis[activeViewportIndex];
    }
  }

  const displaySet = viewportSpecificData[activeViewportIndex];

  let api;
  if (!api) {
    try {
      api = await setViewportToVTK(
        displaySet,
        activeViewportIndex,
        layout,
        viewportSpecificData
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  return api;
}

function _setView(api, sliceNormal, viewUp) {
  const renderWindow = api.genericRenderWindow.getRenderWindow();
  const renderer = api.genericRenderWindow.getRenderer();
  const camera = renderer.getActiveCamera();
  const istyle = renderWindow.getInteractor().getInteractorStyle();
  istyle.setSliceNormal(...sliceNormal);
  camera.setViewUp(...viewUp);

  api.volumes[0].getMapper().setSampleDistance(2.0);
  api.volumes[0].getMapper().setMaximumSamplesPerRay(2000);

  renderWindow.render();
}

function switchMPRInteractors(api, istyle) {
  const renderWindow = api.genericRenderWindow.getRenderWindow();

  let currentNormal;
  if (istyle.getSliceNormal) {
    currentNormal = istyle.getSliceNormal();
  }

  // TODO: This is a hacky workaround because disabling the vtkInteractorStyleMPRSlice is currently
  // broken. The camera.onModified is never removed. (https://github.com/Kitware/vtk-js/issues/1110)
  renderWindow
    .getInteractor()
    .getInteractorStyle()
    .setInteractor(null);

  renderWindow.getInteractor().setInteractorStyle(istyle);

  // TODO: Not sure why this is required the second time this function is called
  istyle.setInteractor(renderWindow.getInteractor());

  if (istyle.getVolumeMapper() !== api.volumes[0]) {
    if (currentNormal) {
      istyle.setSliceNormal(currentNormal);
    }
    istyle.setVolumeMapper(api.volumes[0]);
  }
}

const BLEND_MODES = {
  COMPOSITE: 0,
  MAXIMUM_INTENSITY: 1,
  MINIMUM_INTENSITY: 2,
  AVERAGE_INTENSITY: 3
};

function _enableBlendMode(apis, blendMode = BLEND_MODES.COMPOSITE) {
  const firstApi = apis[0];
  const actor = firstApi.volumes[0];
  const mapper = actor.getMapper();

  actor.getProperty().setInterpolationTypeToLinear();
  actor.getProperty().setShade(true);
  actor.getProperty().setAmbient(0.1);
  actor.getProperty().setDiffuse(0.9);
  actor.getProperty().setSpecular(0.2);
  actor.getProperty().setSpecularPower(10.0);

  mapper.setBlendMode(blendMode);
  mapper.setSampleDistance(3);

  apis.forEach(api => {
    const renderWindow = api.genericRenderWindow.getRenderWindow();

    console.warn(`Set BlendMode: ${blendMode}`);
    renderWindow.render();
  });
}

function _updateSlabWidth(apis, slabWidth) {
  apis.forEach(api => {
    const renderWindow = api.genericRenderWindow.getRenderWindow();
    const renderer = api.genericRenderWindow.getRenderer();
    const camera = renderer.getActiveCamera();
    //camera.setFreezeFocalPoint(true);

    if (slabWidth === 0) {
      const dist = camera.getDistance();
      camera.setClippingRange(dist, dist + 1);

      return;
    }

    const [rmin, rmax] = camera.getClippingRange();
    const mid = (rmin + rmax) / 2;

    camera.setClippingRange(mid - slabWidth, mid + slabWidth);

    renderWindow.render();
  });
}

const actions = {
  axial: async ({ viewports }) => {
    const api = await _getActiveViewportVTKApi(viewports);

    apis[viewports.activeViewportIndex] = api;

    _setView(api, [0, 0, 1], [0, -1, 0]);
  },
  sagittal: async ({ viewports }) => {
    const api = await _getActiveViewportVTKApi(viewports);

    apis[viewports.activeViewportIndex] = api;

    _setView(api, [1, 0, 0], [0, 0, 1]);
  },
  coronal: async ({ viewports }) => {
    const api = await _getActiveViewportVTKApi(viewports);

    apis[viewports.activeViewportIndex] = api;

    _setView(api, [0, 1, 0], [0, 0, 1]);
  },
  enableRotateTool: async ({ viewports }) => {
    apis.forEach(api => {
      const istyle = vtkInteractorStyleMPRSlice.newInstance();

      switchMPRInteractors(api, istyle);
    });
  },
  enableCrosshairsTool: async ({ viewports }) => {
    apis.forEach((api, index) => {
      const istyle = vtkInteractorStyleMPRCrosshairs.newInstance();

      switchMPRInteractors(api, istyle);

      istyle.setCallback(getCrosshairCallbackForIndex(index));
    });
  },
  enableLevelTool: async ({ viewports }) => {
    apis.forEach(api => {
      const istyle = vtkInteractorStyleMPRWindowLevel.newInstance();

      switchMPRInteractors(api, istyle);
    });
  },
  enableCompositeBlend: async () => {
    _enableBlendMode(apis, BLEND_MODES.COMPOSITE);
    _updateSlabWidth(apis, 1);
  },
  enableMIP: async () => {
    _enableBlendMode(apis, BLEND_MODES.MAXIMUM_INTENSITY);
  },
  enableMinIP: async () => {
    _enableBlendMode(apis, BLEND_MODES.MINIMUM_INTENSITY);
  },
  enableAverageIP: async () => {
    _enableBlendMode(apis, BLEND_MODES.AVERAGE_INTENSITY);
  },
  setSlabWidthTo5: () => {
    const slabWidth = 5;
    _updateSlabWidth(apis, slabWidth);
  },
  setSlabWidthTo25: () => {
    const slabWidth = 25;
    _updateSlabWidth(apis, slabWidth);
  },
  setSlabWidthTo50: () => {
    const slabWidth = 50;
    _updateSlabWidth(apis, slabWidth);
  },
  mpr2d: async ({ viewports }) => {
    const displaySet =
      viewports.viewportSpecificData[viewports.activeViewportIndex];

    let apiByViewport;
    try {
      apiByViewport = await setMPRLayout(displaySet);
    } catch (error) {
      throw new Error(error);
    }

    apis = apiByViewport;
    window.apis = apis;

    /*const rgbTransferFunction = apiByViewport[0].volumes[0]
      .getProperty()
      .getRGBTransferFunction(0);
    rgbTransferFunction.onModified(() => {
      apiByViewport.forEach(a => {
        const renderWindow = a.genericRenderWindow.getRenderWindow();

        renderWindow.render();
      });
    });*/

    apis[0].volumes[0].getMapper().setSampleDistance(1.5);

    apiByViewport.forEach((api, index) => {
      const renderWindow = api.genericRenderWindow.getRenderWindow();
      const renderer = api.genericRenderWindow.getRenderer();
      const camera = renderer.getActiveCamera();

      // TODO: This is a hacky workaround because disabling the vtkInteractorStyleMPRSlice is currently
      // broken. The camera.onModified is never removed. (https://github.com/Kitware/vtk-js/issues/1110)
      renderWindow
        .getInteractor()
        .getInteractorStyle()
        .setInteractor(null);

      const istyle = vtkInteractorStyleMPRCrosshairs.newInstance();
      renderWindow.getInteractor().setInteractorStyle(istyle);

      istyle.setVolumeMapper(api.volumes[0]);
      istyle.setCallback(getCrosshairCallbackForIndex(index));

      const svgWidgetManager = vtkSVGWidgetManager.newInstance();
      svgWidgetManager.setRenderer(renderer);
      svgWidgetManager.setScale(1);

      const crosshairsWidget = vtkSVGCrosshairsWidget.newInstance();

      svgWidgetManager.addWidget(crosshairsWidget);
      svgWidgetManager.render();

      api.svgWidgetManager = svgWidgetManager;
      api.svgWidgets = {
        crosshairsWidget,
      };

      switch (index) {
        default:
        case 0:
          //Axial
          istyle.setSliceNormal(0, 0, 1);
          camera.setViewUp(0, -1, 0);

          break;
        case 1:
          // sagittal
          istyle.setSliceNormal(1, 0, 0);
          camera.setViewUp(0, 0, 1);
          break;
        case 2:
          // Coronal
          istyle.setSliceNormal(0, 1, 0);
          camera.setViewUp(0, 0, 1);
          break;
      }

      renderWindow.render();
    });
  },
};

const definitions = {
  axial: {
    commandFn: actions.axial,
    storeContexts: ['viewports'],
    options: {},
  },
  coronal: {
    commandFn: actions.coronal,
    storeContexts: ['viewports'],
    options: {},
  },
  sagittal: {
    commandFn: actions.sagittal,
    storeContexts: ['viewports'],
    options: {},
  },
  enableRotateTool: {
    commandFn: actions.enableRotateTool,
    storeContexts: ['viewports'],
    options: {},
  },
  enableCrosshairsTool: {
    commandFn: actions.enableCrosshairsTool,
    storeContexts: ['viewports'],
    options: {},
  },
  enableLevelTool: {
    commandFn: actions.enableLevelTool,
    storeContexts: ['viewports'],
    options: {},
  },
  enableCompositeBlend: {
    commandFn: actions.enableCompositeBlend,
    storeContexts: ['viewports'],
    options: {},
  },
  enableMIP: {
    commandFn: actions.enableMIP,
    storeContexts: ['viewports'],
    options: {},
  },
  enableMinIP: {
    commandFn: actions.enableMinIP,
    storeContexts: ['viewports'],
    options: {},
  },
  enableAverageIP: {
    commandFn: actions.enableAverageIP,
    storeContexts: ['viewports'],
    options: {},
  },
  setSlabWidthTo5: {
    commandFn: actions.setSlabWidthTo5,
    storeContexts: ['viewports'],
    options: {},
  },
  setSlabWidthTo25: {
    commandFn: actions.setSlabWidthTo25,
    storeContexts: ['viewports'],
    options: {},
  },
  setSlabWidthTo50: {
    commandFn: actions.setSlabWidthTo50,
    storeContexts: ['viewports'],
    options: {},
  },
  mpr2d: {
    commandFn: actions.mpr2d,
    storeContexts: ['viewports'],
    options: {},
    context: 'VIEWER',
  },
};

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::VTK',
};
