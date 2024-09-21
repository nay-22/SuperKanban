import { Card, CardContent, Tooltip, Typography, CardActions, Button } from "@mui/material";
import { LaunchOutlined, Settings, DeleteOutline } from "@mui/icons-material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getTaskInfoByColumn, generateKRandomColors } from "../../utils/ResourceUtils";
import { useProjectActions } from "../../hooks/ProjectActions";
import { BoardContainerProps, ColumnInfo } from "../../types";
import ConfirmationModal from "../modals/ConfirmationModal";

import TaskPopoverView from "./TaskPopoverView";

const BoardContainer: React.FC<BoardContainerProps> = React.memo(({ board }) => {
    const [data, setData] = useState<ColumnInfo[]>();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [task, setTask] = useState<ColumnInfo | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { removeBoard } = useProjectActions();

    useEffect(() => {
        const taskInfo = getTaskInfoByColumn(board);
        const colors = generateKRandomColors(taskInfo!.length);
        taskInfo!.forEach((item, index) => item.color = colors[index]);
        setData(taskInfo!);
    }, []);

    return <>
        <Card sx={{ minWidth: '300px', borderRadius: '.5em', bgcolor: 'rgb(13 17 23)' }}>
            <CardContent className='bg-mainBackgroundColor text-white'>
                <div className='flex items-center justify-between gap-5'>
                    <div>
                        <div>{board.createdAt.date + ', ' + board.createdAt.year}</div>
                        <div className='text-slate-400'>{board.createdAt.time}</div>
                    </div>
                    <Link to={`board/${board.id}`}>
                        <Tooltip title={`${board.title}`} placement='top' arrow>
                            <Typography className=' truncate max-w-[300px] flex items-center justify-center gap-2 hover:bg-slate-500 p-2 rounded-md' variant="h6" component="div">
                                {board.title}
                                <LaunchOutlined />
                            </Typography>
                        </Tooltip>
                    </Link>
                </div>
                <hr className='my-2 border-1 border-slate-600' />
                <div className='flex items-start justify-between gap-2'>
                    {data && data.length !== 0 && (
                        <Tooltip title='Click over an arc to view related the tasks' enterDelay={2000} arrow>
                            <div className=''>
                                <PieChart
                                    onItemClick={(e, params) => {
                                        setAnchorEl(e.currentTarget as unknown as HTMLElement);
                                        setTask(data[params.dataIndex]);
                                    }}
                                    series={[
                                        {
                                            data: data || [],
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            startAngle: -90,
                                            endAngle: 360,
                                            arcLabel: (item) => `${item.label}`,
                                            cx: '80%',
                                            cy: '50%',
                                            arcLabelMinAngle: 35,
                                            arcLabelRadius: '100%',
                                        }
                                    ]}
                                    height={210}
                                    width={250}
                                    colors={data.map(d => d.color)}
                                    slotProps={{
                                        legend: {
                                            hidden: true,
                                        },

                                    }}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fontWeight: '500',
                                            fill: '#fff'
                                        },
                                        color: 'white',
                                    }}
                                />
                                <div
                                    className='
                                mt-1 pr-2 max-h-[180px] min-w-[120px] overflow-y-auto overflow-x-hidden 
                                scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent'
                                >
                                    <TaskPopoverView item={task!} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                                </div>
                            </div>
                        </Tooltip>
                    )}
                    {board.columns.length === 0 ? <Typography>Board Empty</Typography> : <div className='rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <Typography className="bg-slate-700 p-2 rounded-md" variant="body2">
                                Total Columns: {board.columns.length}
                            </Typography>
                            <Typography className="bg-slate-700 p-2 rounded-md" variant="body2">
                                Total Tasks: {board.tasks.length}
                            </Typography>
                            <CardActions className='bg-transparent float-right'>
                                <Button size="small"><Settings /></Button>
                                <Button size="small" onClick={() => setShowConfirmationModal(true)}><DeleteOutline className='text-rose-400' /></Button>
                            </CardActions>
                        </div>
                    </div>}
                </div>
            </CardContent>
        </Card>
        <ConfirmationModal open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={() => removeBoard(board.id)} message={`Delete Board: ${board.title}?`} />
    </>
});

export default BoardContainer;