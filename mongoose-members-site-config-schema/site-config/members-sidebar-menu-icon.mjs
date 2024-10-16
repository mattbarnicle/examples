import mongoose from 'mongoose';

const CUSTOM_ICON_SIZE_VALIDATOR = [ 25, 'Custom icons must be 25 x 25 pixels' ];

const membersSidebarMenuCustomIconSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  width: {
    type: Number,
    required: true,
    min: CUSTOM_ICON_SIZE_VALIDATOR,
    max: CUSTOM_ICON_SIZE_VALIDATOR,
  },
  height: {
    type: Number,
    required: true,
    min: CUSTOM_ICON_SIZE_VALIDATOR,
    max: CUSTOM_ICON_SIZE_VALIDATOR,
  },
  className: {
    type: String,
    maxlength: 64,
    trim: true,
    default: undefined,
  },
});

export const membersSidebarMenuIconSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [ 'custom', 'fontawesome' ],
  },
  custom: {
    type: membersSidebarMenuCustomIconSchema,
    required: function () {
      return this.type === 'custom';
    },
    default: undefined,
  },
  fontawesome: {
    type: String,
    required: function () {
      return this.type === 'fontawesome';
    },
    default: undefined,
  },
});
