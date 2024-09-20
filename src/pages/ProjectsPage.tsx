import { Add } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import Project from '../components/Project'
import { useContext, useState } from 'react'
import KanbanContext from '../contexts/KanbanContext'
import ProjectForm from '../components/forms/ProjectForm'
import TrailLinks from '../components/TrailLinks'


const ProjectsPage = () => {
    const { projects } = useContext(KanbanContext);
    const [showProjectForm, setShowProjectForm] = useState(false);
    return <>
        <TrailLinks>
            <Button variant='outlined' startIcon={<Add />} sx={{ textTransform: 'none' }} onClick={() => setShowProjectForm(true)}>New Project</Button>
        </TrailLinks>
        {Object.keys(projects)?.length === 0 && <div className="h-[60vh] p-5 mx-10 flex items-center justify-center border-2 border-slate-400 border-dashed rounded-lg">
            No Projects Created Yet
        </div>}
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