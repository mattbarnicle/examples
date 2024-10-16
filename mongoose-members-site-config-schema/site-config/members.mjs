import mongoose from 'mongoose';

import { membersSidebarMenuSchema } from './members-sidebar-menu.mjs';
import { membersDashboardSchema } from './members-dashboard.mjs';

export const siteConfigMembersSchema = new mongoose.Schema({
  colorScheme: {
    type: String,
    required: true,
    enum: [ 'blue', 'green', 'lightgrey', 'orange' ],
  },
  sidebarMenu: {
    type: [membersSidebarMenuSchema],
    default: undefined,
  },
  dashboard: {
    type: membersDashboardSchema,
    default: undefined,
  },
});
