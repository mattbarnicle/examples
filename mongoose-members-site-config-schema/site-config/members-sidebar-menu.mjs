import mongoose from 'mongoose';

import { membersSidebarMenuIconSchema }
  from './members-sidebar-menu-icon.mjs';
import { membersSidebarMenuLinkSchema }
  from './members-sidebar-menu-link.mjs';
import { membersSidebarMenuProductSchema }
  from './members-sidebar-menu-product.mjs';
import { membersSidebarMenuComponentSchema }
  from './members-sidebar-menu-component.mjs';

const membersSidebarMenuChildSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [ 'link', 'product', 'component', 'dropdown' ],
    required: true,
  },
  label: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  icon: {
    type: membersSidebarMenuIconSchema,
    required: true,
  },
  link: {
    type: membersSidebarMenuLinkSchema,
    default: undefined,
  },
  product: {
    type: membersSidebarMenuProductSchema,
    default: undefined,
  },
  component: {
    type: membersSidebarMenuComponentSchema,
    default: undefined,
  },
});

export const membersSidebarMenuSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [ 'link', 'product', 'component', 'dropdown' ],
    required: true,
  },
  label: {
    type: String,
    required: true,
    maxlength: 64,
    trim: true,
  },
  icon: {
    type: membersSidebarMenuIconSchema,
    required: true,
  },
  link: {
    type: membersSidebarMenuLinkSchema,
    default: undefined,
  },
  product: {
    type: membersSidebarMenuProductSchema,
    default: undefined,
  },
  component: {
    type: membersSidebarMenuComponentSchema,
    default: undefined,
  },
  children: {
    type: [membersSidebarMenuChildSchema],
    default: undefined,
  },
});
