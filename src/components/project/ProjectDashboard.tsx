import { Button, Modal, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { Add, } from '@mui/icons-material';

import KanbanContext from '../../contexts/KanbanContext';
import MemberContainer from './MemberContainer';
import MemberForm from '../forms/MemberForm';
import BoardContainer from './BoardContainer';
import BoardForm from '../forms/BoardForm';



const ProjectDashboard = () => {
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);

    const { projects, projectId } = useContext(KanbanContext);
    return <>
        <div className='flex flex-col gap-4'>
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
            <div className='p-4 rounded-lg bg-slate-900 mx-4'>
                <div className='flex items-center justify-between'>
                    <Typography variant='h5' className=''>Members</Typography>
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
                        onClick={() => setShowMemberForm(true)}
                    >
                        Add Member
                    </Button>
                </div>
                <hr className='my-2 border-1 border-slate-600' />
                <div className='flex items-start gap-4 px-4 pb-4 overflow-x-auto overflow-y-hidden scrollbar-thumb-slate-600 scrollbar-track-transparent scrollbar-thin'>
                    {projects[projectId || ''] && Object.entries(projects[projectId || '']?.members).map(([id, member]) => (
                        <MemberContainer key={id} member={member} />
                    ))}
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
            </div>
        </div>

    </>
}

export default ProjectDashboard