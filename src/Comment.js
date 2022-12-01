import React from "react";
import { useState } from "react";
import "./Comments.css";

const Comment = props => {
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src="/user-icon.png" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{props.comment.Firstname + " " + props.comment.Lastname}</div>
                    {/* <div>{comment.createdAt}</div> */}
                </div>
                <div className="comment-text">{props.comment.CommentDescription}</div>
            </div>
        </div>
    )
}
export default Comment;