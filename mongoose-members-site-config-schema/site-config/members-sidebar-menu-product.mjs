import mongoose from 'mongoose';

export const membersSidebarMenuProductSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'course', 'module', 'video' ],
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'members.sidebarMenu.product.docModel',
    required: true,
  },
  docModel: {
    type: String,
    enum: [ 'Video', 'VideoCourse', 'VideoModule' ],
    required: true,
  },
});
