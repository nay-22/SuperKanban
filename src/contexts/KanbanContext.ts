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
  setBoardId: () => { }
});

export default KanbanContext;