import { Add, Dashboard, DeleteOutline, KeyboardArrowDown, Launch, LaunchOutlined, PeopleAlt, ViewWeek } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Modal, Tooltip, Typography } from '@mui/material'
import { KBMember, KBProject } from '../../types';
import React, { useState } from 'react';
import BoardForm from '../forms/BoardForm';
import { Link } from 'react-router-dom';
import MemberForm from '../forms/MemberForm';
import { useProjectActions } from '../../hooks/ProjectActions';
import ConfirmationModal from '../modals/ConfirmationModal';

type ProjectProps = {
    project: KBProject;
}

const MemberItem: React.FC<{ member: KBMember, callback: () => void }> = ({ member, callback }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    return <>
        <div className='flex items-center justify-between p-2 w-full hover:bg-slate-800 rounded-lg'>
            <div className='flex items-center justify-center gap-2'>
                <img className='w-[30px] h-[30px] rounded-full' src={member.avatar} alt={member.name} />
                <Typography>
                    {member.name}
                </Typography>
            </div>
            <div className='flex items-center justify-center gap-2'>
                <Button onClick={() => setShowConfirmation(true)}>
                    <DeleteOutline sx={{ color: 'maroon' }} />
                </Button>
                <Launch />
            </div>
        </div>
        <ConfirmationModal open={showConfirmation} onClose={() => setShowConfirmation(false)} onConfirm={callback} />
    </>
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);

    const { removeMember } = useProjectActions();

    return <>
        <div className='border-2 border-slate-800 rounded-lg px-4 pt-2 pb-4 h-fit'>
            <Link to={`/project/${project.id}`}>
                <div className='flex items-center justify-between hover:bg-taskBackgroundPrimary p-2 rounded-lg'>
                    <div>
                        <div>{project.createdAt.date + ', ' + project.createdAt.year}</div>
                        <div className='text-slate-400'>{project.createdAt.time}</div>
                    </div>
                    <Tooltip title={`${project.name}${project.description && ': ' + project.description}`} placement='top' arrow>
                        <div className='flex items-center justify-end gap-2 py-2 px-2 rounded-lg'>
                            <Typography variant='h5' className='truncate max-w-[270px]'>{project.name}</Typography>
                            <LaunchOutlined className='text-indigo-400' />
                        </div>
                    </Tooltip>
                </div>
            </Link>
            <hr className='my-2 border-1 border-slate-600' />
            <div className='flex flex-col gap-4'>
                <Accordion disableGutters sx={{ bgcolor: 'rgba(40, 56, 71)', color: 'white' }} >
                    <AccordionSummary expandIcon={<KeyboardArrowDown sx={{ color: 'white' }} />} >
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center justify-center gap-2'>
                                <Dashboard />
                                <Typography>Boards</Typography>
                            </div>
                            <div className='flex items-center justify-center gap-4'>
                                <div className='bg-slate-600 p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center'>
                                    <Typography variant='body1'>{Object.entries(project.boards).length}</Typography>
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails
                        className='scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent'
                        sx={{ bgcolor: 'rgba(27, 33, 41)', maxHeight: '150px', overflowY: 'auto', overflowX: 'hidden' }}
                    >
                        {Object.entries(project.boards).length !== 0 ? Object.entries(project.boards).map(([_, board]) => (
                            <Link to={`/project/${project.id}/board/${board.id}`} key={board.id} className='flex items-center justify-between p-2 w-full hover:bg-slate-800 rounded-lg'>
                                <div className='flex items-center justify-center gap-2'>
                                    <ViewWeek />
                                    <Typography>
                                        {board.title}
                                    </Typography>
                                </div>
                                <Launch />
                            </Link>
                        )) : <div className='text-center text-slate-400'>No Boards</div>}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant='outlined' startIcon={<Add />} sx={{ textTransform: 'none' }} onClick={() => setShowBoardForm(true)}>Add Board</Button>
                    </AccordionActions>
                </Accordion>
                <Accordion disableGutters sx={{ bgcolor: 'rgba(40, 56, 71)', color: 'white' }} >
                    <AccordionSummary expandIcon={<KeyboardArrowDown sx={{ color: 'white' }} />} >
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center justify-center gap-2'>
                                <PeopleAlt />
                                <Typography> Members</Typography>
                            </div>
                            <div className='flex items-center justify-center gap-4'>
                                <div className='bg-slate-600 p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center'>
                                    <Typography variant='body1'>{Object.entries(project.members).length}</Typography>
                                </div>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails
                        className='scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent'
                        sx={{ bgcolor: 'rgba(27, 33, 41)', maxHeight: '150px', overflowY: 'auto', overflowX: 'hidden' }}
                    >
                        {Object.entries(project.members).length !== 0 ? Object.entries(project.members).map(([_, member]) => (
                            <MemberItem key={member.id} member={member} callback={() => removeMember(project.id, member.id)} />
                        )) : <div className='text-center text-slate-400'>No Members</div>}
                    </AccordionDetails>
                    <AccordionActions>
                        <Button variant='outlined' startIcon={<Add />} sx={{ textTransform: 'none' }} onClick={() => setShowMemberForm(true)}>Add Member</Button>
                    </AccordionActions>
                </Accordion>

            </div>
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
                <BoardForm project={project} callback={() => setShowBoardForm(false)} />
            </div>
        </Modal>
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
                <MemberForm project={project} callback={() => setShowMemberForm(false)} />
            </div>
        </Modal>
    </>
}

export default Project