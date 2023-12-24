export const getAllComments = (comments) => {
  let replies = [];
  comments.map((comment) => {
    comment.replies.map((reply) => {
      replies = [...replies, reply];
      return reply;
    });
    return comment.replies;
  });
  const all = [...comments, ...replies];
  return all;
};

export const changeCommentsById = (comments, newCommentData) =>
  comments.map((el) => {
    if (el.comment_id === newCommentData.comment_id) {
      return newCommentData;
    }
    const newReplies = el.replies.map((reply) => {
      if (reply.comment_id === newCommentData.comment_id) {
        return newCommentData;
      }
      return reply;
    });
    return { ...el, replies: newReplies };
  });

export const setReplyComment = (comments, newComment) => {
  let idOfGeneralComment = null;

  comments.map((el) => {
    if (!idOfGeneralComment) {
      if (el.comment_id === newComment.to.comment_id) {
        idOfGeneralComment = el.comment_id;
      }
      if (!idOfGeneralComment) {
        el.replies.map((reply) => {
          if (reply.comment_id === newComment.to.comment_id) {
            idOfGeneralComment = el.comment_id;
          }
          return 0;
        });
      }
    }
    return 0;
  });

  const newComments = comments.map((comment) => {
    if (comment.comment_id === idOfGeneralComment) {
      return { ...comment, replies: [...comment.replies, newComment] };
    }
    return comment;
  });
  return newComments;
};
