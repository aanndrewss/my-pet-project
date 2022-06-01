import React from 'react';
import {Box, List, ListItem, ListItemButton, ListItemIcon, Switch} from "@mui/material";
import {ModeNight} from "@mui/icons-material";

type PropsType = {
    setMode: (mode: string) => void
    mode: string
}

const Settings: React.FC<PropsType> = ({setMode, mode}) => {
    return (
        <Box>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ModeNight/>
                        </ListItemIcon>
                        <Switch onChange={e => setMode(mode === 'light' ? 'dark' : 'light')}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}

export default Settings;