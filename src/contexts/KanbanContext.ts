import { createContext } from "react";
import { KanbanContextType } from "../interfaces";

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export default KanbanContext;