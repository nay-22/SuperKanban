import React, { useState } from "react";
import { useTaskActions } from "../../hooks/TaskActions";
import { DoNotDisturbOnTotalSilence } from "@mui/icons-material";
import { Avatar, Tooltip, Button } from "@mui/material";
import { Id, KBMember } from "../../types";
import ConfirmationModal from "../modals/ConfirmationModal";

const Assignee: React.FC<{ taskId: Id; member: KBMember; readOnly: boolean }> = React.memo(({ taskId, member, readOnly = false }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { revokeTask } = useTaskActions();
    return <>
        <div className='px-1 py-1 flex items-center justify-between gap-2'>
            <div className='flex items-center justify-left gap-2'>
                <Avatar sx={{ width: '25px', height: '25px' }} src={member.avatar} alt={member.name} />
                <span className='text-xs text-slate-400'>{member.name}</span>
            </div>
            {!readOnly && <>
                <Tooltip
                    title={`Revoke Assignee`}
                    placement='right'
                    arrow
                >
                    <Button sx={{ minWidth: 0, width: '20px' }} onClick={() => setShowConfirmation(true)} >
                        <DoNotDisturbOnTotalSilence className='text-indigo-400' />
                    </Button>
                </Tooltip>
                <ConfirmationModal
                    onConfirm={() => revokeTask(taskId, [member.id])}
                    onClose={() => setShowConfirmation(false)}
                    message={`Are you sure you want to revoke ${member.name} from this task?`}
                    open={showConfirmation}
                />
            </>
            }
        </div>
    </>
});

export default Assignee;