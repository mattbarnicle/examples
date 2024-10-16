import mongoose from 'mongoose';

const membersSidebarMenuInternalLinkSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'site', 'members' ],
  },
  path: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  category: {
    type: String,
    enum: [ 'paid', 'free', 'recordings' ],
    required: function () {
      return this.path === '/members/videos';
    },
  },
});

const membersSidebarMenuExternalLinkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    maxlength: 2048,
    trim: true,
  },
  newWindow: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const membersSidebarMenuLinkSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'internal', 'external' ],
  },
  internal: {
    type: membersSidebarMenuInternalLinkSchema,
    default: undefined,
  },
  external: {
    type: membersSidebarMenuExternalLinkSchema,
    default: undefined,
  },
});
