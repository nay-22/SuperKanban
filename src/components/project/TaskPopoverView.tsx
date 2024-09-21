import { Tooltip, Popover, Typography, Chip } from "@mui/material";
import { useState } from "react";
import Task from "../task/Task";
import { ColumnInfo, TaskInfoProps } from "../../types";
import React from "react";

const TasksPopoverView: React.FC<TaskInfoProps> = ({ item }) => {
    const [anchorEl, setAchorEl] = useState<HTMLElement | null>(null);
    return <>
        <div className='flex items-center justify-start gap-2 mt-1'>
            <div className='w-3 h-3 rounded-full' style={{ backgroundColor: item.color }}></div>
            <Tooltip title={`Click to view ${item.label} tasks`} placement='right' arrow>
                <div
                    onClick={(e) => setAchorEl(e.currentTarget)}
                    className='cursor-pointer select-none w-full py-1 px-2 rounded-md bg-slate-800'
                >
                    {item.label} : {item.value}
                </div>
            </Tooltip>
            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '.5em',
                            border: 'none',
                            bgcolor: 'rgb(13 17 23)'
                        }
                    }
                }}
            >
                <div className='flex items-center justify-between py-2 px-4 bg-taskBackgroundPrimary text-white'>
                    <Typography>{item.label}</Typography>
                    <Chip sx={{ color: 'white', bgcolor: 'slateblue' }} label={item.value} />
                </div>
                <div className='
                                            max-h-[400px] 
                                            w-[320px] 
                                            overflow-y-auto 
                                            overflow-x-hidden 
                                            relative scrollbar-thin 
                                            scrollbar-thumb-slate-400
                                            scrollbar-track-transparent
                                            flex flex-col gap-2
                                            p-2
                                            bg-mainBackgroundColor
                                            '
                >
                    {item.tasks.map(task => <Task readonly task={task} key={task.id} />)}
                </div>
            </Popover>
        </div>
    </>
};

export default React.memo(TasksPopoverView);