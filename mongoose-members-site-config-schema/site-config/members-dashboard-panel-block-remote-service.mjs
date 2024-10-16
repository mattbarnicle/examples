import mongoose from 'mongoose';

export const membersDashboardPanelBlockRemoteServiceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'local', 'remote' ],
  },
  label: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  path: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  remoteHostCode: {
    type: String,
    required: function () {
      return this.type === 'remote';
    },
    default: undefined,
  },
});
