import React, {useState} from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, Checkbox, IconButton, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import {selectCurrentUserLogin} from "../../../../redux/authSelectors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ForumIcon from '@mui/icons-material/Forum';
import PostComments from "./PostComments";

type PropsType = {
    message: string
    likeCounts: number
    comments: Array<string>
}

const Post: React.FC<PropsType> = ({message, likeCounts, comments}) => {

    const [isOpen, setIsOpen] = useState(false)

    const login = useSelector(selectCurrentUserLogin)


    return (
        <Card sx={{marginTop: 1, transition: 'all .4s ease-in-out'}}>
            <CardHeader
                avatar={<Avatar/>}
                title={login}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
            />
            <CardContent>
                <Typography>
                    {message}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{color: 'red'}}/>}/>
                </IconButton>
                <Typography>
                    {likeCounts}
                </Typography>
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ForumIcon/>
                </IconButton>
                <Typography>
                    {comments?.length || 0}
                </Typography>
                <IconButton>
                    <Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon sx={{color: '#999'}} />}/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            {isOpen && (
                <PostComments comments={comments}/>
            )}
        </Card>
    );
}

export default Post;