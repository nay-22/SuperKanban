import { useContext, useEffect } from 'react'
import { Typography } from '@mui/material'
import KanbanContext from '../contexts/KanbanContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TrailLinks from '../components/TrailLinks';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { setProjectId, projects } = useContext(KanbanContext);

    useEffect(() => {
        if (projectId) {
            setProjectId(projectId);
        } else {
            navigate('/')
        }
    }, []);
    return <>
        <TrailLinks />
        <Typography variant='h3' className='text-center'>Project Page</Typography>
        {projects[projectId || ''] && Object.entries(projects[projectId || '']?.boards).map(([id, board]) => (
            <Link key={id} to={`board/${id}`}>{board.title}</Link>
        ))}
    </>
}

export default ProjectPage