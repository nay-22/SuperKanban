import { Breadcrumbs, Tooltip, Typography } from '@mui/material'
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
                    {location !== '/' && (
                        <Link to='/'>
                            <Typography
                                className={`hover:bg-slate-800 ${location === '/' &&
                                    'text-indigo-400 cursor-default hover:bg-transparent'
                                    } p-1 rounded-lg`
                                }>
                                Home
                            </Typography>
                        </Link>
                    )}
                    {(location.match(boardPagePattern) || location.match(projectsPagePattern) || location.match(projectPagePattern)) && (
                        <Tooltip title='View All Projects' placement='top' arrow>
                            <Link to='/projects'>
                                <Typography
                                    className={`hover:bg-slate-800 ${location.match(projectsPagePattern) &&
                                        'text-indigo-400 cursor-default hover:bg-transparent'
                                        } p-1 rounded-lg`
                                    }
                                >
                                    Projects
                                </Typography>
                            </Link>
                        </Tooltip>
                    )}
                    {location.match(projectPagePattern) && (
                        <Tooltip title={`${projects[projectId]?.name} Dashboard`} placement='top' arrow>
                            <Link to={`/project/${projectId}`}>
                                <Typography
                                    className={`hover:bg-slate-800 ${location.match(projectPagePattern)
                                        && !location.match(boardPagePattern) && 'text-indigo-400 cursor-default hover:bg-transparent'
                                        } p-1 rounded-lg`
                                    }
                                >{projects[projectId]?.name}
                                </Typography>
                            </Link>
                        </Tooltip>
                    )}
                    {location.match(boardPagePattern) && (
                        <Tooltip title="Board" placement='top' arrow>
                            <Link to={`/project/${projectId}/board/${boardId}`}>
                                <Typography
                                    className={`hover:bg-slate-800 ${location.match(boardPagePattern)
                                        && 'text-indigo-400 cursor-default hover:bg-transparent'
                                        } p-1 rounded-lg`
                                    }>
                                    {projects[projectId]?.boards[boardId]?.title}
                                </Typography>
                            </Link>
                        </Tooltip>
                    )}
                </Breadcrumbs>
            </div>
            {children && children}
        </div>
    )
}

export default TrailLinks