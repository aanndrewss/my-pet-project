import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppBar, Avatar, Box, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {logout} from "../../redux/authReducer";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/authSelectors";
import styled from "@emotion/styled";
import {useTypedDispatch} from "../../redux/reduxStore";

type PropsType = {}

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

export const Header: React.FC<PropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useTypedDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6'>
                    ANDRXW66
                </Typography>
                {isAuth
                    ? <>
                        <Box display='flex' flexDirection='row' alignItems='center'>
                            <Typography>
                                {login}
                            </Typography>
                            <Avatar
                                style={{cursor: 'pointer'}}
                                onClick={handleClick}
                                id="positioned-button"
                                aria-controls={open ? 'positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            />
                        </Box>
                    </>
                    : <Box>
                        <Button variant='contained'>
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </Button>
                    </Box>
                }
            </StyledToolbar>
            <Menu
                id='positioned-menu'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}>
                <MenuItem><Link style={{textDecoration: 'none', color: 'black'}} to={'/profile'}>Profile</Link></MenuItem>
                <MenuItem><Link style={{textDecoration: 'none', color: 'black'}} to={'/settings'}>Settings</Link></MenuItem>
                <MenuItem onClick={logoutCallback}>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
}

