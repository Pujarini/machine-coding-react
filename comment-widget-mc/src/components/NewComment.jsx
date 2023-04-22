import React, { useState } from "react";

const NewComment = ({ comment, addComment, removeComment }) => {
  const { commentText, id, childComments } = comment;
  const [showReply, setShowReply] = useState(false);
  const [childComment, setChildComment] = useState("");

  const replyHandler = (e) => {
    e.preventDefault();
    addComment(childComment, id);
    setChildComment("");
    setShowReply(false);
  };

  const deleteHandler = () => {
    removeComment(id);
  };

  return (
    <>
      <div>
        <span
          style={{
            textAlign: "left",
            marginTop: "25px",
            marginLeft: "15px",
            display: "flex",
          }}
        >
          {commentText}
        </span>
        <button onClick={() => setShowReply(true)}>Reply</button>
        <button onClick={deleteHandler}>Delete</button>
      </div>
      <span>
        {showReply && (
          <>
            <form onSubmit={replyHandler} style={{ marginLeft: "15px" }}>
              <input
                type="text"
                placeholder="add a reply"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
              />
              <button type="submit">Reply</button>
            </form>
          </>
        )}
      </span>
      {childComments &&
        childComments.map((childEl, key) => {
          return (
            <NewComment
              key={key}
              comment={childEl}
              addComment={addComment}
              removeComment={removeComment}
            />
          );
        })}
    </>
  );
};

export default NewComment;
