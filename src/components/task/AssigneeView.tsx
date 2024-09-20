import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { Accordion, AccordionSummary, Avatar, AccordionDetails, AccordionActions, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { KBTask } from "../../types";
import AssigneeForm from "../forms/AssigneeForm";
import Assignee from "./Assignee";

const AssigneeView: React.FC<{ task: KBTask; readOnly?: boolean; }> = React.memo(({ task, readOnly }) => {
    const [showAssigneeForm, setShowAssigneeForm] = useState(false);
    return <>
        <Accordion
            disableGutters
            sx={{
                bgcolor: 'rgba(40, 56, 71)',
                color: 'white',
                borderRadius: '0 0 2em 2em'
            }}
        >
            <AccordionSummary
                sx={{
                    height: '40px',
                    minHeight: '0px',
                    maxHeight: '40px',
                    alignItems: 'center',
                }}
                expandIcon={<KeyboardArrowDown sx={{ color: readOnly && task.assignedTo.length === 0 ? 'transparent' : 'white' }} />}
            >
                <div className='px-1 py-1 flex items-center justify-between gap-2 w-full'>
                    <div className='flex items-center justify-center gap-2'>
                        <Avatar sx={{ width: '25px', height: '25px' }} src={task.createdBy.avatar} alt={task.createdBy.name} />
                        <span className='text-xs text-slate-400'>Created By {task.createdBy.name}</span>
                    </div>
                    <span className='text-xs text-slate-400'>Assigned: {task.assignedTo.length}</span>
                </div>
            </AccordionSummary>
            {task.assignedTo.length !== 0 && <AccordionDetails className='bg-taskBackgroundPrimary'>
                {task.assignedTo?.map(person => (
                    <Assignee readOnly={readOnly || false} key={person.id} taskId={task.id} member={person} />
                ))}
            </AccordionDetails>}
            {!readOnly && <AccordionActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <p className='text-xs text-slate-400'>{task.assignedTo.length === 0 && 'Not Assigned'}</p>
                <Button onClick={() => setShowAssigneeForm(true)} variant='outlined' sx={{ textTransform: 'none' }} startIcon={<Add />}>Assign</Button>
            </AccordionActions>}
        </Accordion>
        <Modal
            open={showAssigneeForm}
            onClose={() => setShowAssigneeForm(false)}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                className='bg-taskBackgroundPrimary p-10 rounded-lg'
            >
                <AssigneeForm taskId={task.id} callback={() => setShowAssigneeForm(false)} />
            </div>
        </Modal>
    </>
});

export default AssigneeView;