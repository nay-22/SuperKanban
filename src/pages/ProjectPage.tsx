import { useContext, useEffect } from 'react'
import { Button } from '@mui/material'
import KanbanContext from '../contexts/KanbanContext';
import { useNavigate, useParams } from 'react-router-dom';
import TrailLinks from '../components/TrailLinks';
import ProjectDashboard from '../components/ProjectDashboard';
import { Settings } from '@mui/icons-material';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { setProjectId } = useContext(KanbanContext);

    useEffect(() => {
        if (projectId) {
            setProjectId(projectId);
        } else {
            navigate('/')
        }
    }, []);
    return <>
        <TrailLinks>
            <Button variant='outlined' startIcon={<Settings />} sx={{ textTransform: 'none' }} onClick={() => { }}>Project Settings</Button>
        </TrailLinks>
        <ProjectDashboard />
    </>
}

export default ProjectPage