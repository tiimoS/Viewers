import cornerstone from 'cornerstone-core';
import { MeasurementApi } from '../classes';
import log from '../../log';
import OHIF from '@ohif/core';

export default function({ eventData, tool, toolGroupId, toolGroup }) {
  const measurementApi = MeasurementApi.Instance;
  if (!measurementApi) {
    log.warn('Measurement API is not initialized');
  }

  const { measurementData, toolType } = eventData;

  const collection = measurementApi.tools[toolType];

  // Stop here if the tool data shall not be persisted (e.g. temp tools)
  if (!collection) return;

  log.info('CornerstoneToolsMeasurementModified');
  let measurement = collection.find(t => t._id === measurementData._id);

  // Stop here if the measurement is already deleted
  if (!measurement) return;

  measurement = Object.assign(measurement, measurementData);
  measurement.viewport = cornerstone.getViewport(eventData.element);

  measurementApi.updateMeasurement(toolType, measurement);

  // TODO: Notify about the last activated measurement

  if (MeasurementApi.isToolIncluded(tool)) {
    // TODO: Notify that viewer suffered changes
  }

  // Update annotations on the mongo db with the new annotation data
  if (
    measurement &&
    measurement.length != 0 &&
    measurement.toolType === 'ArrowAnnotate'
  ) {
    measurementApi.updateAnnotationOnDb(measurement).then(res => {
      OHIF.log.info(res);
    });
  }
}
