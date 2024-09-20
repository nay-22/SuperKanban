import { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import KanbanContext from '../contexts/KanbanContext';
import { useNavigate, useParams } from 'react-router-dom';
import TrailLinks from '../components/TrailLinks';
import ProjectDashboard from '../components/ProjectDashboard';
import { DeleteOutline, Settings } from '@mui/icons-material';
import { useProjectActions } from '../hooks/ProjectActions';
import ConfirmationModal from '../components/modals/ConfirmationModal';

const ProjectPage = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { setProjectId, projects } = useContext(KanbanContext);
    const { deleteProject } = useProjectActions();
    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (projectId) {
            if (!projects[projectId]) navigate('/projects');
            setProjectId(projectId);
        } else {
            navigate('/')
        }
    }, []);
    return <>
        <TrailLinks>
            <div className='flex items-center justify-end gap-4'>
                <Button variant='outlined' onClick={() => setShowConfirmation(true)}><DeleteOutline className='text-rose-500' /></Button>
                <Button variant='outlined' startIcon={<Settings />} sx={{ textTransform: 'none' }} onClick={() => { }}>Project Settings</Button>
            </div>
        </TrailLinks>
        <ProjectDashboard />
        <ConfirmationModal
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={() => {
                deleteProject();
                navigate('/projects');
            }}
            message={`Delete Project: ${projects[projectId!]?.name}?`}
        />
    </>
}

export default ProjectPage