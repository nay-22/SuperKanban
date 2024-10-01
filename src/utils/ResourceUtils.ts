import { ColumnInfo, Id, KBBoard, KBProject } from "../types";

export const timestamp = () => {
    const ts = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }).split(',');
    const date = ts[0].trim();
    const year = ts[1].trim();
    const time = ts[2].trim();
    return { date, year, time };
}

export const getTaskInfoByColumn = (board: KBBoard): ColumnInfo[] => {
    return board.columns.map((column) => {
        const taskCount = board.tasks.filter(task => task.columnId === column.id).length;
        const tasks = board.tasks.filter(task => task.columnId === column.id);
        return { label: column.title, columnId: column.id, value: taskCount, color: '', tasks };
    });
}

export type MemberInfo = {boards: KBBoard[]}[]

export const getTaskInfoByMember = (project: KBProject, memberId: Id): KBBoard[] => {
    console.log(project.boards);
    
    return Object?.entries(project?.boards!)?.map(([_, board]) => {
        const filteredBoard: KBBoard = {
            ...board,
            tasks: board?.tasks?.filter(task => task?.assignedTo && task?.assignedTo.find(member => member.id === memberId)),
            columns: board?.columns,
        }
        return filteredBoard
    })
}

export const generateKRandomColors = (k: number, dark = false) => {
    let colors = [];
    for (let i = 0; i < k; i++) {
        const red = Math.floor(dark ? Math.random() * 100 : Math.random() * 100 + 50)
        const green = Math.floor(dark ? Math.random() * 100 : Math.random() * 100 + 50)
        const blue = Math.floor(dark ? Math.random() * 100 : Math.random() * 100 + 50)
        colors.push(`rgb(${red}, ${green}, ${blue})`)
    }
    return colors;
}