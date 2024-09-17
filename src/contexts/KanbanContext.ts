import { createContext } from "react";
import { KBContext } from "../types";

const KanbanContext = createContext<KBContext>({
  columns: [],
  setColumns: () => {},
  tasks: [],
  setTasks: () => {},
  activeItem: null,
  setActiveItem: () => {},
});

export default KanbanContext;