import React, { useEffect } from "react";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Comments.css";

const Comments = props => {
    const [backendComments, setBackendComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            const api = "http://localhost:9000/api/comments/get/" + props.GoalID;
            const data = await fetch(api);
            let json = await data.json();
            json = json.sort((a, b) => -(parseInt(a.CommentID) - parseInt(b.CommentID)))
            setBackendComments(json);
            console.log(json);
        }
        fetchComments();
    }, []);

    const addComment = (text) => {
        console.log("ran!");
        const add = async() => {
            const response = await fetch('http://localhost:9000/api/comments/create', {
                method: 'POST',
                body: JSON.stringify({"goalid" : props.GoalID, "empid": localStorage.getItem('EmpID'), "description": text}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            response.json().then(async (comment) => {
            try{
                if (comment.CommentID != null){
                    const response = await fetch('http://localhost:9000/api/employee/get/' + comment.EmpID);
                    response.json().then(async (data) => 
                        {
                            if (data){
                                comment.Firstname = data[0].Firstname;
                                comment.Lastname = data[0].Lastname;
                                setBackendComments([comment, ...backendComments]);
                            }
                        }
                    )
                }
            }
            catch{
                console.log("Raising error! Comment creation unsuccessful!");
            }});
        }
        add();
    }

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="comments">
                    <h3 className="comments-title">Comments</h3>
                    <div className="comment-form-title">Write Comment</div>
                    <CommentForm submitLabel="Write" handleSubmit={addComment} hasCancelButton={true} handleCancel={props.handleClose} />
                    <div className="comments-container">
                        {
                            backendComments.map(backendComment => (
                                <Comment key={backendComment.CommentID} comment={backendComment} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Comments;