import mongoose from 'mongoose';

import { membersDashboardPanelBlockSchema }
  from './members-dashboard-panel-block.mjs';

const membersDashboardPanelSchema = new mongoose.Schema({
  blocks: {
    type: [membersDashboardPanelBlockSchema],
    required: true,
  },
});

export const membersDashboardSchema = new mongoose.Schema({
  numPanels: {
    type: Number,
    required: true,
    validate: {
      validator: function (numPanels) {
        return numPanels <= 2;
      },
      message: function (props) {
        return 'A maximum of 2 panels is allowed';
      },
    },
  },
  panelWidthRatio: {
    type: String,
    required: true,
    enum: [ '1:1', '1:3', '3:1' ],
  },
  panels: {
    type: [membersDashboardPanelSchema],
    required: true,
    validate: {
      validator: function (panels) {
        return panels.length === this.numPanels;
      },
      message: function (props) {
        return `${props.value.length} panels were given, `
          + `but numPanels is set to ${this.numPanels}`;
      },
    },
  },
});
