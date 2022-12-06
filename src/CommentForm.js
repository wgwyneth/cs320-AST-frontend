import React from "react";
import { useState } from "react";

const CommentForm = props => {
    const [text, setText] = useState("");
    const isTextareaDisabled = text.length === 0;
    const onSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(text);
        setText("");
    }

    return (
        <form onSubmit={onSubmit}>
          <textarea
            className="comment-form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="comment-form-button" disabled={isTextareaDisabled}>
            {props.submitLabel}
          </button>
          {props.hasCancelButton && (
            <button
              type="button"
              className="comment-form-button comment-form-cancel-button"
              onClick={props.handleCancel}
            >
              Back
            </button>
          )}
        </form>
      );
}
export default CommentForm;