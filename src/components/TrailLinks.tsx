import { Breadcrumbs, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import KanbanContext from '../contexts/KanbanContext'

type TrailLinkProps = {
    children?: React.ReactNode
}

const TrailLinks: React.FC<TrailLinkProps> = ({ children }) => {
    const { projects, projectId, boardId } = useContext(KanbanContext);

    const boardPagePattern = /\/project\/[^\/]+\/board\/[^\/]+/;
    const projectPagePattern = /\/project\/[^\/]+/;
    const projectsPagePattern = /\/projects/;

    const location = useLocation().pathname;

    return (
        <div className={`flex items-center justify-between py-4 px-12 'w-full`}>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                    {location !== '/' && <Link to='/'>
                        <Typography className={`${location === '/' && 'text-indigo-400'} hover:bg-slate-800`}>Home</Typography>
                    </Link>}
                    {(location.match(boardPagePattern) || location.match(projectsPagePattern) || location.match(projectPagePattern)) && <Link to='/projects'>
                        <Typography className={`${location.match(projectsPagePattern) && 'text-indigo-400'} hover:bg-slate-800`}>Projects</Typography>
                    </Link>}
                    {location.match(projectPagePattern) && <Link to={`/project/${projectId}`}>
                        <Typography className={`${location.match(projectPagePattern) && !location.match(boardPagePattern) && 'text-indigo-400'} hover:bg-slate-800`}>{projects[projectId]?.name}</Typography>
                    </Link>}
                    {location.match(boardPagePattern) && <Link to={`/project/${projectId}/board/${boardId}`}>
                        <Typography className={`${location.match(boardPagePattern) && 'text-indigo-400'} hover:bg-slate-800`}>{projects[projectId]?.boards[boardId]?.title}</Typography>
                    </Link>}
                </Breadcrumbs>
            </div>
            {children && children}
        </div>
    )
}

export default TrailLinks