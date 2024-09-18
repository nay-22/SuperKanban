import { ViewQuilt, ViewColumn, Settings, PowerSettingsNew, History, StarOutlineOutlined, ClearAll, Home, PeopleAltOutlined } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { clearCache } from '../utils/CacheUtils';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    callback: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ callback }) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    return (
        <List disablePadding className='h-full'>
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton
                    sx={{ padding: '1em 2em' }}
                    onClick={() => {
                        navigate('/');
                        callback();
                    }}
                >
                    <ListItemIcon>
                        <Home sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: 'grey.800', margin: '0 auto' }} />
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton
                    sx={{ padding: '1em 2em' }}
                    onClick={() => {
                        navigate('/projects');
                        callback();
                    }}
                >
                    <ListItemIcon>
                        <ViewQuilt sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Projects' />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton
                    sx={{ padding: '1em 2em' }}
                    onClick={() => {
                        navigate('/board');
                        callback();
                    }}
                >
                    <ListItemIcon>
                        <ViewColumn sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Boards' />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton sx={{ padding: '1em 2em' }}>
                    <ListItemIcon>
                        <PeopleAltOutlined sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Teams' />
                </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: 'grey.800', margin: '0 auto' }} />
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton sx={{ padding: '1em 2em' }}>
                    <ListItemIcon>
                        <History sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Recents' />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton sx={{ padding: '1em 2em' }}>
                    <ListItemIcon>
                        <StarOutlineOutlined sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton sx={{ padding: '1em 2em' }}>
                    <ListItemIcon>
                        <Settings sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Settings' />
                </ListItemButton>
            </ListItem>
            <Divider sx={{ bgcolor: 'grey.800', margin: '0 auto' }} />
            <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                <ListItemButton sx={{ padding: '1em 2em' }}>
                    <ListItemIcon>
                        <PowerSettingsNew sx={{ color: 'white' }} className='mr-2' />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItemButton>
            </ListItem>
            {isSmallScreen && <>
                <ListItem disablePadding className='text-slate-300 cursor-pointer hover:bg-slate-700'>
                    <ListItemButton onClick={clearCache} sx={{ padding: '1em 2em' }}>
                        <ListItemIcon>
                            <ClearAll sx={{ color: 'white' }} className='mr-2' />
                        </ListItemIcon>
                        <ListItemText primary='Clear' />
                    </ListItemButton>
                </ListItem>
            </>
            }
        </List>
    )
}

export default Sidebar