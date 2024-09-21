import { LaunchOutlined, Settings, DeleteOutline } from "@mui/icons-material";
import { Card, CardContent, Tooltip, Typography, CardActions, Button } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjectActions } from "../../hooks/ProjectActions";
import { ColumnInfo, KBMember } from "../../types";
import { getTaskInfoByColumn, generateKRandomColors } from "../../utils/ResourceUtils";
import ConfirmationModal from "../modals/ConfirmationModal";

import TaskPopoverView from "./TaskPopoverView";

const MemberContainer: React.FC<{ member: KBMember }> = React.memo(({ member }) => {
    const [data, setData] = useState<ColumnInfo[]>();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { removeBoard } = useProjectActions();

    useEffect(() => {
        // const taskInfo = getTaskInfoByColumn(board);
        // const colors = generateKRandomColors(taskInfo!.length);
        // taskInfo!.forEach((item, index) => item.color = colors[index]);
        // setData(taskInfo!);
    }, [])
    return <>
        <Card sx={{ minWidth: '350px', borderRadius: '.5em', bgcolor: 'rgb(13 17 23)' }}>
            <CardContent className='bg-mainBackgroundColor text-white'>
                <div className='flex items-center justify-between gap-5'>
                    <div>
                        <div>{member.createdAt?.date + ', ' + member.createdAt?.year}</div>
                        <div className='text-slate-400'>{member.createdAt?.time}</div>
                    </div>
                    <Link to={`board/${member.id}`}>
                        <Tooltip title={`${member.name}`} placement='top' arrow>
                            <Typography className=' truncate max-w-[300px] flex items-center justify-center gap-2 hover:bg-slate-500 p-2 rounded-md' variant="h6" component="div">
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
                                Total Tasks Assigned: {member.assignedTasks ? member.assignedTasks.length : '0'}
                            </Typography>
                            {/* <Typography variant="body2">
                                Total Tasks: {board.tasks.length}
                            </Typography> */}
                        </div>
                    </div>
                    <CardActions className='bg-transparent float-right'>
                        <Button size="small"><Settings /></Button>
                        <Button size="small" onClick={() => setShowConfirmationModal(true)}><DeleteOutline className='text-rose-400' /></Button>
                    </CardActions>
                </div>
                {/* {data && data.length !== 0 && (
                    <div className='flex items-start justify-center pl-4'>
                        <PieChart
                            series={[
                                {
                                    data: data || [],
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    startAngle: -90,
                                    endAngle: 360,

                                }
                            ]}
                            height={250}
                            width={300}
                            colors={data.map(d => d.color)}
                            slotProps={{
                                legend: {
                                    hidden: true,
                                },

                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                            }}
                        />
                        <div className='mt-10 pr-2 max-h-[180px] min-w-[120px] overflow-y-auto overflow-x-hidden relative right-8 scrollbar-thin scrollbar-thumb-slate-400
                scrollbar-track-transparent'>
                            {data.map((item, index) => (
                                <TaskPopoverView item={item} key={index} />
                            ))}
                        </div>
                    </div>
                )} */}
            </CardContent>
        </Card>
        {/* <ConfirmationModal open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={() => removeBoard(board.id)} message={`Delete Board: ${board.title}?`} /> */}
    </>
});

export default MemberContainer;