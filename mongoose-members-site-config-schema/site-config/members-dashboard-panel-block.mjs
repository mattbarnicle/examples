import mongoose from 'mongoose';

import { membersDashboardPanelBlockProductSchema }
  from './members-dashboard-panel-block-product.mjs';
import { membersDashboardPanelBlockSubscriptionSchema }
  from './members-dashboard-panel-block-subscription.mjs';
import { membersDashboardPanelBlockRemoteServiceSchema }
  from './members-dashboard-panel-block-remote-service.mjs';

export const membersDashboardPanelBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'product', 'remote service', 'subscription' ],
  },
  heading: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  subHeading: {
    type: String,
    maxlength: 64,
    trim: true,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
    maxlength: 512,
    trim: true,
  },
  product: {
    type: membersDashboardPanelBlockProductSchema,
    required: function () {
      return this.type === 'product';
    },
    default: undefined,
  },
  subscription: {
    type: membersDashboardPanelBlockSubscriptionSchema,
    required: function () {
      return this.type === 'subscription';
    },
    default: undefined,
  },
  remoteService: {
    type: membersDashboardPanelBlockRemoteServiceSchema,
    required: function () {
      return this.type === 'remote service';
    },
    default: undefined,
  },
});
