import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions/posts";
import moment from "moment";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        {!post.selectedFile ? (
          <Typography
            className={classes.textTitle}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
        ) : (
          <>
            <CardMedia className={classes.media} image={post.selectedFile} />
          </>
        )}
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(post._id);
            }}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography color="textSecondary" variant="body2">
            {post.tags.map((tag) => `#${tag}`)}
          </Typography>
        </div>
        {!post.selectedFile ? (
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
        )}
        <CardContent>
          <Typography component="p" color="textSecondary" variant="body2">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" />
            &nbsp; Like &nbsp;
            {post.likeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
