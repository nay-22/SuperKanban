import { Tooltip, Popover, Typography, Chip, TextField } from "@mui/material";
import { useState } from "react";
import Task from "../task/Task";
import { TaskInfoProps } from "../../types";
import React from "react";

const TasksPopoverView: React.FC<TaskInfoProps> = ({ item }) => {
    const [anchorEl, setAchorEl] = useState<HTMLElement | null>(null);
    const [filteredTasks, setFilteredTasks] = useState(item?.tasks);
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
                <div className='w-[320px] flex items-center justify-between py-2 px-4 gap-3 bg-taskBackgroundPrimary text-white'>
                    <Typography>{item.label}</Typography>
                    <TextField 
                    size="small" 
                    variant="outlined" 
                    label='Filter Tasks' 
                    autoFocus
                    onChange={(e) => {
                        const filtered = item.tasks.filter(task => task.content.toLowerCase().includes(e.target.value.toLowerCase()));
                        setFilteredTasks(filtered);
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'gray',
                            },
                            '&:hover fieldset': {
                                borderColor: 'darkorange',
                                color: "white"
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'darkorange',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        width: '100%'
                    }} 
                    />
                    <Chip sx={{ color: 'white', bgcolor: 'slateblue' }} label={item.value} />
                </div>
                <div className='
                    w-[320px]
                    max-h-[400px]
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
                    {filteredTasks?.map(task => <Task readonly task={task} key={task.id} />)}
                </div>
            </Popover>
        </div>
    </>
};

export default React.memo(TasksPopoverView);