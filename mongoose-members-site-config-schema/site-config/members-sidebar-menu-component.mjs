import mongoose from 'mongoose';

export const membersSidebarMenuComponentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'logout' ],
  },
});
