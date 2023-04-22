import React, { useState } from "react";
import { createComment } from "../utils/createComment";
import NewComment from "./NewComment";

const Comment = () => {
  const [parentComment, setParentComment] = useState("");
  const [comments, setComments] = useState({});

  const commentMapper = (comment) => {
    return {
      ...comment,
      childComments: comment?.childComments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => !comment.parentNodeId)
    .map(commentMapper);

  // delete from comments object
  const deleteComment = (id) => {
    console.log(id);
    let newObject = {};
    for (let [key, value] of Object.entries(comments)) {
      if (key !== id) {
        newObject[key] = value;
      }
    }
    setComments(newObject);
  };

  const removeChildFromParent = (parentId) => {
    const parentNode = comments[parentId].parentNodeId;
    const childComments = comments[parentNode]?.childComments;
    const childCommentIndex = childComments.indexOf(parentNode);
    deleteComment(childComments[childCommentIndex]);
    if (childCommentIndex > -1) {
      childComments.splice(childCommentIndex, 1);
    }
  };

  // deleting child nodes from n-level
  const deleteChildElements = (comment) => {
    const childComments = comment?.childComments;

    if (!childComments.length) return;
    childComments.forEach((commentId) => {
      deleteComment(commentId);
      removeChildFromParent(commentId);
      deleteChildElements(comments[commentId]);
    });
  };

  const deleteCommentHandler = (parentId) => {
    const parentNode = comments[parentId].parentNodeId;

    if (parentNode) {
      // removes from parent child comment array
      removeChildFromParent(parentId);
    } else {
      // deleting its child comments
      deleteChildElements(comments[parentId]);
      //deleting the root node
      // deleteComment(parentId);
    }
  };

  const createNewComment = (commentText, parentId) => {
    let newComment = null;
    if (parentId) {
      newComment = createComment(commentText, false, parentId);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childComments: [...comments[parentId].childComments, newComment.id],
        },
      }));
    } else {
      newComment = createComment(commentText, true, null);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    createNewComment(parentComment, null);
    setParentComment("");
  };

  console.log(comments);
  return (
    <div>
      <form onSubmit={addCommentHandler}>
        <input
          type="text"
          placeholder="add a comment"
          value={parentComment}
          onChange={(e) => setParentComment(e.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <div>
        {enhancedComments.map((comment, key) => {
          return (
            <NewComment
              key={key}
              comment={comment}
              addComment={createNewComment}
              removeComment={deleteCommentHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
