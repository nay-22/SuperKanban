import { createContext } from "react";

import { KBContext } from "../types";

const KanbanContext = createContext<KBContext>({
  currentUser: null,
  setCurrentUser: () => { },
  activeItem: null,
  setActiveItem: () => { },
  hasTouch: false,
  newItemId: null,
  setNewItemId: () => { },
  projects: {},
  setProjects: () => { },
  projectId: '',
  setProjectId: () => { },
  boardId: '',
  setBoardId: () => { },
  toast: { open: false, message: ''},
  setToast: () => {},
  users: [],
  setUsers: () => {},
  taskChannel: new BroadcastChannel('task_actions'),
  columnChannel: new BroadcastChannel('column_actions'),
  dragChannel: new BroadcastChannel('drag_actions'),
});

export default KanbanContext;