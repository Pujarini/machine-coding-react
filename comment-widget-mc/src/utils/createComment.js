import { v4 as uuidv4 } from "uuid";

export const createComment = (text, rootNode = false, parentNodeId) => {
  return {
    id: uuidv4(),
    commentText: text,
    isRootNode: rootNode,
    childComments: [],
    parentNodeId: parentNodeId,
  };
};
