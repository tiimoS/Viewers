import ConnectedMeasurementTable from './ConnectedMeasurementTable.js';
import init from './init.js';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'measurements-table',

  preRegistration({ servicesManager, configuration = {} }) {
    init({ servicesManager, configuration });
  },
  getPanelModule({ servicesManager }) {
    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Measurements',
          target: 'measurement-panel',
        },
      ],
      components: [
        {
          id: 'measurement-panel',
          component: ConnectedMeasurementTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
