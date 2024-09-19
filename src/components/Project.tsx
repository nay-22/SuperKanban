import { Add, Dashboard, KeyboardArrowDown, Launch, PeopleAlt, ViewWeek } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Modal, Tooltip, Typography } from '@mui/material'
import { KBProject } from '../types';
import React, { useState } from 'react';
import BoardForm from './forms/BoardForm';
import { Link } from 'react-router-dom';
import MemberForm from './forms/MemberForm';

type ProjectProps = {
    project: KBProject;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);

    return <>
        <div className='border-2 border-slate-800 rounded-lg p-4 h-fit'>
            <div className='flex items-center justify-between'>
                <Tooltip title={project.name} placement='top' arrow>
                    <Typography variant='h5' className='truncate max-w-[300px]'>{project.name}</Typography>
                </Tooltip>
                <div>
                    <div>{project.createdAt.date + ', ' + project.createdAt.year}</div>
                    <div className='float-right text-slate-400'>{project.createdAt.time}</div>
                </div>
            </div>
            <hr className='my-2 border-1 border-slate-600' />
            <div className='flex flex-col gap-4'>
                <Accordion sx={{ bgcolor: 'rgba(40, 56, 71)', color: 'white' }} >
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
                    <AccordionDetails sx={{ bgcolor: 'rgba(27, 33, 41)' }}>
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
                <Accordion sx={{ bgcolor: 'rgba(40, 56, 71)', color: 'white' }} >
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
                    <AccordionDetails sx={{ bgcolor: 'rgba(27, 33, 41)' }}>
                        {Object.entries(project.members).length !== 0 ? Object.entries(project.members).map(([_, member]) => (
                            <button key={member.id} className='flex items-center justify-between p-2 w-full hover:bg-slate-800 rounded-lg'>
                                <div className='flex items-center justify-center gap-2'>
                                    <img className='w-[30px] h-[30px] rounded-full' src={member.avatar} alt={member.name} />
                                    <Typography>
                                        {member.name}
                                    </Typography>
                                </div>
                                <Launch />
                            </button>
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