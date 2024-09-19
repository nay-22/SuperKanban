import { ReactNode, useContext } from "react"
import KanbanContext from "../contexts/KanbanContext"
import { SnackbarOrigin } from "@mui/material";

export const useToast = () => {
    const { setToast } = useContext(KanbanContext);

    const enqueue = (message: string, autoHide?: number, anchor?: SnackbarOrigin, action?: ReactNode) => {
        setToast({
            open: true,
            autoHide,
            anchor,
            message,
            action,
        })
    };

    return { enqueue }
}