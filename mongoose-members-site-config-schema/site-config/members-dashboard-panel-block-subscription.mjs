import mongoose from 'mongoose';

// current = latest unlocked video for subscription
const membersDashboardPanelBlockSubscriptionChildBlockSchema = new mongoose.Schema({
  component: {
    type: String,
    required: true,
    enum: [ 'current', 'details table', 'mini table', 'subscribe' ],
  },
  // only applies to 'current' component
  default: {
    heading: {
      type: String,
      maxlength: 64,
      trim: true,
      default: undefined,
    },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  },
});

export const membersDashboardPanelBlockSubscriptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'training', 'video course' ],
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'members.dashboard.panels.blocks.subscription.docModel',
    required: true,
  },
  docModel: {
    type: String,
    required: true,
    enum: [ 'Training', 'VideoCourse' ],
  },
  children: {
    type: [membersDashboardPanelBlockSubscriptionChildBlockSchema],
    default: undefined,
  },
});
