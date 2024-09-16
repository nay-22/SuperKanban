import { createContext } from "react";

const KanbanContext = createContext({
  kanban: null,
  setKanban: (kanban: any) => {},
});

export default KanbanContext;