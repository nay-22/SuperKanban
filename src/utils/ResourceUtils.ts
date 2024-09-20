import { KBBoard } from "../types";

export const timestamp = () => {
    const ts = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }).split(',');
    const date = ts[0].trim();
    const year = ts[1].trim();
    const time = ts[2].trim();
    return { date, year, time };
}

export const getTaskCountByColumn = (board: KBBoard): { label: string, value: number, color: string }[] => {
    return board.columns.map((column) => {
        const taskCount = board.tasks.filter(task => task.columnId === column.id).length;
        return { label: column.title, value: taskCount, color: '' };
    });
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