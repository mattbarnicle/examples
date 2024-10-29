export const features = Object.freeze({
  createEditTasks: 'Task Creation & Editing',
  prioritizeTasks: 'Task Prioritization',
  scheduleTasks: 'Due Date & Time Scheduling',
  recurringTasks: 'Task Recurrence (Daily, Weekly, Monthly)',
  createSubtasks: 'Subtask Creation',
  addNotesComments: 'Task Notes & Comments',
  tagCategorizeTasks: 'Task Tags & Categories',
  customNotifications: 'Customizable Notifications & Reminders',
  darkMode: 'Dark Mode',
  cloudSyncBackup: 'Cloud Sync & Backup',
});

export const implementation = Object.freeze({
  yes: 'Yes',
  no: 'No',
  premiumOnly: 'Yes (Premium version)',
});

export const products = Object.freeze({
  taskMaster: 'TaskMaster',
  zenList: 'ZenList',
  todoZen: 'TodoZen',
  justTodoIt: 'JustTodoIt',
});

export const productFeatures = Object.freeze({
  [products.taskMaster]: {
    [features.createEditTasks]: implementation.yes,
    [features.prioritizeTasks]: implementation.yes,
    [features.scheduleTasks]: implementation.yes,
    [features.recurringTasks]: implementation.yes,
    [features.createSubtasks]: implementation.yes,
    [features.addNotesComments]: implementation.yes,
    [features.tagCategorizeTasks]: implementation.yes,
    [features.customNotifications]: implementation.yes,
    [features.darkMode]: implementation.yes,
    [features.cloudSyncBackup]: implementation.no,
  },
  [products.zenList]: {
    [features.createEditTasks]: implementation.yes,
    [features.prioritizeTasks]: implementation.no,
    [features.scheduleTasks]: implementation.no,
    [features.recurringTasks]: implementation.no,
    [features.createSubtasks]: implementation.no,
    [features.addNotesComments]: implementation.no,
    [features.tagCategorizeTasks]: implementation.no,
    [features.customNotifications]: implementation.no,
    [features.darkMode]: implementation.no,
    [features.cloudSyncBackup]: implementation.no,
  },
  [products.todoZen]: {
    [features.createEditTasks]: implementation.yes,
    [features.prioritizeTasks]: implementation.no,
    [features.scheduleTasks]: implementation.no,
    [features.recurringTasks]: implementation.no,
    [features.createSubtasks]: implementation.no,
    [features.addNotesComments]: implementation.no,
    [features.tagCategorizeTasks]: implementation.no,
    [features.customNotifications]: implementation.no,
    [features.darkMode]: implementation.no,
    [features.cloudSyncBackup]: implementation.no,
  },
  [products.justTodoIt]: {
    [features.createEditTasks]: implementation.yes,
    [features.prioritizeTasks]: implementation.no,
    [features.scheduleTasks]: implementation.no,
    [features.recurringTasks]: implementation.premiumOnly,
    [features.createSubtasks]: implementation.no,
    [features.addNotesComments]: implementation.no,
    [features.tagCategorizeTasks]: implementation.no,
    [features.customNotifications]: implementation.premiumOnly,
    [features.darkMode]: implementation.no,
    [features.cloudSyncBackup]: implementation.premiumOnly,
  }
});
