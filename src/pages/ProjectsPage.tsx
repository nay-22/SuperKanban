import { Add } from '@mui/icons-material'
import { Breadcrumbs, Button, Modal, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Project from '../components/Project'
import { useContext, useState } from 'react'
import KanbanContext from '../contexts/KanbanContext'
import ProjectForm from '../components/forms/ProjectForm'


const ProjectsPage = () => {
    const { projects } = useContext(KanbanContext);
    const [showProjectForm, setShowProjectForm] = useState(false);
    return <>
        <div className='flex items-center justify-between py-4 px-10'>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                    <Link to='/'>Home</Link>
                    <Typography className='text-indigo-300 font-bold'>Projects</Typography>
                </Breadcrumbs>
            </div>
            <Button variant='outlined' startIcon={<Add />} sx={{ textTransform: 'none' }} onClick={() => setShowProjectForm(true)}>New Project</Button>
        </div>
        <div className='grid grid-cols-4 gap-4 px-10'>
            {Object.entries(projects).map(([_, project]) => <Project project={project} key={project.id} />)}
        </div>
        <Modal open={showProjectForm} onClose={() => setShowProjectForm(false)}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                className='bg-taskBackgroundPrimary p-10 rounded-lg'
            >
                <ProjectForm callback={() => setShowProjectForm(false)} />
            </div>
        </Modal>
    </>
}

export default ProjectsPage