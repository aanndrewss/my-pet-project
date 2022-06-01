import React from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, IconButton, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import {selectCurrentUserLogin} from "../../../../redux/authSelectors";

type PropsType = {
    message: string
    likeCounts: number
}

const Post: React.FC<PropsType> = (props) => {

    const login = useSelector(selectCurrentUserLogin)

    return (
        <Card sx={{margin: 1}}>
            <CardHeader
                avatar={<Avatar/>}
                title={login}
            />
            <CardContent>
                <Typography>
                    {props.message}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{color: 'red'}}/>}/>
                </IconButton>
                <Typography>
                    {props.likeCounts}
                </Typography>
                <IconButton>
                    <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon sx={{color: '#999'}} />}/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post;