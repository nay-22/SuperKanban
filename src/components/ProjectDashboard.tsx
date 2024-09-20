import { Button, Card, CardActions, CardContent, Modal, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import KanbanContext from '../contexts/KanbanContext';
import { Link } from 'react-router-dom';
import { KBBoard } from '../types';
import { Add, DeleteOutline, LaunchOutlined, Settings } from '@mui/icons-material';
import BoardForm from './forms/BoardForm';
import MemberForm from './forms/MemberForm';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts';
import { useProjectActions } from '../hooks/ProjectActions';
import ConfirmationModal from './modals/ConfirmationModal';
import { generateKRandomColors, getTaskCountByColumn } from '../utils/ResourceUtils';

type BoardContainerProps = {
    board: KBBoard
}

const BoardContainer: React.FC<BoardContainerProps> = ({ board }) => {
    const [data, setData] = useState<{ label: string, value: number, color: string }[]>();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const { removeBoard } = useProjectActions();

    useEffect(() => {
        const taskCount = getTaskCountByColumn(board);
        const colors = generateKRandomColors(taskCount.length);
        taskCount.forEach((item, index) => item.color = colors[index]);
        setData(taskCount);
    }, [board]);

    return <>
        <Card sx={{ minWidth: '350px', borderRadius: '.5em', bgcolor: 'rgb(13 17 23)' }}>
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
                {board.columns.length === 0 ? <Typography>Board Empty</Typography> : <div className='flex items-center justify-between bg-slate-600 p-4 rounded-lg'>
                    <Typography variant="body2">
                        Total Columns: {board.columns.length}
                    </Typography>
                    <Typography variant="body2">
                        Total Tasks: {board.tasks.length}
                    </Typography>
                </div>}
                {data && data.length !== 0 && (
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
                        <div className='mt-10 max-h-[175px] min-w-[120px] overflow-y-auto overflow-x-hidden relative right-8'>
                            {data.map((item, index) => (
                                <div key={index} className='flex items-center justify-start gap-2 mt-1'>
                                    <div className='w-3 h-3 rounded-full' style={{ backgroundColor: item.color }}></div>
                                    <p>{item.label} : {item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardActions className='bg-mainBackgroundColor float-right'>
                <Button size="small"><Settings /></Button>
                <Button size="small" onClick={() => setShowConfirmationModal(true)}><DeleteOutline className='text-rose-400' /></Button>
            </CardActions>
        </Card>
        <ConfirmationModal open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={() => removeBoard(board.id)} message={`Delete Board: ${board.title}?`} />
    </>
}

const ProjectDashboard = () => {
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);

    const { projects, projectId } = useContext(KanbanContext);
    return <>
        <div className='p-4 rounded-lg bg-slate-900 mx-4'>
            <div className='flex items-center justify-between'>
                <Typography variant='h5' className=''>Boards</Typography>
                <Button
                    variant='contained'
                    size='small'
                    startIcon={<Add />}
                    sx={{
                        textTransform: 'none',
                        color: 'white',
                        bgcolor: 'rgb(51 65 85)',
                        ':hover': { bgcolor: 'royalblue' }
                    }}
                    onClick={() => setShowBoardForm(true)}
                >
                    Add Board
                </Button>
            </div>
            <hr className='my-2 border-1 border-slate-600' />
            <div className='flex items-start gap-4 px-4 pb-4 overflow-x-auto overflow-y-hidden scrollbar-thumb-slate-600 scrollbar-track-transparent scrollbar-thin'>
                {projects[projectId || ''] && Object.entries(projects[projectId || '']?.boards).map(([id, board]) => (
                    <BoardContainer key={id} board={board} />
                ))}
            </div>

            <Modal open={showBoardForm} onClose={() => setShowBoardForm(false)}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    className='bg-taskBackgroundPrimary p-10 rounded-lg'
                >
                    <BoardForm project={projects[projectId]!} callback={() => setShowBoardForm(false)} />
                </div>
            </Modal>
        </div>

        <Modal open={showMemberForm} onClose={() => setShowMemberForm(false)}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                className='bg-taskBackgroundPrimary p-10 rounded-lg'
            >
                <MemberForm project={projects[projectId]!} callback={() => setShowMemberForm(false)} />
            </div>
        </Modal>
    </>
}

export default ProjectDashboard