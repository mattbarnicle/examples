import mongoose from 'mongoose';

const productUnlockingRulesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'subscription' ],
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'members.dashboard.panels.blocks.product.unlockingRules.docModel',
  },
  docModel: {
    type: String,
    required: true,
    enum: [ 'VideoCourse' ],
  },
  week: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const membersDashboardPanelBlockProductSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'module', 'module video course', 'video', 'workshop' ],
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'members.dashboard.panels.blocks.product.docModel',
    required: true,
  },
  docModel: {
    type: String,
    required: true,
    enum: [ 'VideoModule', 'VideoCourse', 'Video', 'Workshop' ],
  },
  unlockingRules: {
    type: [productUnlockingRulesSchema],
    default: undefined,
  },
});
