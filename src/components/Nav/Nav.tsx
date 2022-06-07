import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SettingsIcon from '@mui/icons-material/Settings';

const Nav: React.FC = (props) => {
    return (
        <Box flex={0.8} sx={{display: {xs: 'none', sm: 'block'}}}>
            <Box position='fixed'>
                <List>
                    <Link to={'/profile'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Profile'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/news'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FeedIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Feed'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/dialogs'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MessageIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Messages'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/chat'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Chat'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/users'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Users'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/music'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AudiotrackIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Music'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to={'/settings'} style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary='Settings'/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </Box>
    );
}

export default Nav;