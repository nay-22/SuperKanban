import { Popover, Typography, Chip, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";

import { KBTask, TaskInfoProps } from "../../types";
import Task from "../task/Task";

const TasksPopoverView: React.FC<TaskInfoProps> = ({ item, anchorEl, setAnchorEl }) => {
    const [filteredTasks, setFilteredTasks] = useState<KBTask[]>([]);

    useEffect(() => {
        if (item && item.tasks)
        setFilteredTasks(item.tasks);
    }, [item?.tasks])

    return <>
        <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
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
                <Typography>{item?.label}</Typography>
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
                <Chip sx={{ color: 'white', bgcolor: 'slateblue' }} label={item?.value} />
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
    </>
};

export default React.memo(TasksPopoverView);