import { LaunchOutlined, Settings } from "@mui/icons-material";
import { Card, CardContent, Tooltip, Typography, CardActions, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ActionBroadcast, KBMember, KBProject } from "../../types";
import { getTaskInfoByMember } from "../../utils/ResourceUtils";
import KanbanContext from "../../contexts/KanbanContext";

const MemberContainer: React.FC<{ project: KBProject, member: KBMember }> = React.memo(({ project, member }) => {
    const [tasksAssigned, setTasksAssigned] = useState(0);
    const [message, setMessage] = useState<ActionBroadcast | null>(null);

    const { taskChannel } = useContext(KanbanContext);

    const calculateAssignedTasks = (project: KBProject) => {
        const taskInfo = getTaskInfoByMember(project, member.id);
        const totalAssignedTasks = taskInfo.reduce((acc, curr) => acc + curr.tasks.length, 0);
        setTasksAssigned(totalAssignedTasks);
        setMessage(null);
    };



    useEffect(() => {
        const handleTaskActions = (e: MessageEvent) => {
            setMessage(e.data);
        }

        taskChannel.addEventListener('message', handleTaskActions);

        calculateAssignedTasks(project);

        return () => {
            taskChannel.removeEventListener('message', handleTaskActions);
        };
    }, []);

    useEffect(() => {
        if (message != null) {
            console.log(message);
            calculateAssignedTasks(message.newImage);
        }
    }, [message]);

    return (
        <Card sx={{ minWidth: '350px', borderRadius: '.5em', bgcolor: 'rgb(13 17 23)' }}>
            <CardContent className='bg-mainBackgroundColor text-white'>
                <div className='flex items-center justify-between gap-5'>
                    <div>
                        <div>{member.createdAt?.date + ', ' + member.createdAt?.year}</div>
                        <div className='text-slate-400'>{member.createdAt?.time}</div>
                    </div>
                    <Link to={`board/${member.id}`}>
                        <Tooltip title={`${member.name}`} placement='top' arrow>
                            <Typography className='truncate max-w-[300px] flex items-center justify-center gap-2 hover:bg-slate-500 p-2 rounded-md' variant="h6" component="div">
                                {member.name}
                                <LaunchOutlined />
                            </Typography>
                        </Tooltip>
                    </Link>
                </div>
                <hr className='my-2 border-1 border-slate-600' />
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center justify-between bg-slate-600 p-4 rounded-lg'>
                        <div className='flex items-center justify-center gap-8'>
                            <Typography variant="body2">
                                Assigned Tasks: {tasksAssigned}
                            </Typography>
                        </div>
                    </div>
                    <CardActions className='bg-transparent float-right'>
                        <Button size="small"><Settings /></Button>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    );
});

export default MemberContainer;
