import React, { useState } from 'react';
import { Comments } from './assets/Components/Comments'

const initialData = [
  {
    id: 1,
    text: 'Hello world! How are you?',
    replies: [
      {
        id: 2,
        text: 'Hey, I am fine, what about you?',
        replies: [],
      },
    ],
  },
];

const App = () => {
  let [commentText, setCommentText] = useState("")
  let [comments, setComments] = useState(initialData)
  let [showReply,setShowReply]=useState(null)
  let [reply,setReply]=useState("")

  function addComments(comment, parentCommentId = null) {
    if (comment === "") {
      return;
    }
  
    const newComment = {
      id: Date.now(),
      text: comment,
      replies: []
    };
  
    if (parentCommentId === null) {
      setComments((prev) => [newComment, ...prev]);
    } else {
      const addReplyToComment = (commentsList) => {
        return commentsList.map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              replies: [newComment,...comment.replies],
            };
          } else if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }
          return comment;
        });
      };
      setComments((prev) => addReplyToComment(prev));
    }
  
    setCommentText("");
    setShowReply(null)
    setReply("")
  }

  function deleting(id) {
    const deleteCommentById = (commentsList) => {
      return commentsList.reduce((acc, comment) => {
        if (comment.id === id) {
          return acc; 
        }
        const filteredReplies = deleteCommentById(comment.replies);
        return [
          ...acc,
          {
            ...comment,
            replies: filteredReplies,
          },
        ];
      }, []);
    };
    setComments((prev) => deleteCommentById(prev));
  }
  

  return (
    <div style={{ width: "100vw" }}>
      <header style={{ width: "100%", boxShadow: "0 0 10px", height: "10vh", textAlign: "center" }}>
        <h1>Nested Comments</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <h2>Comments</h2>

        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Add comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addComments(commentText)
              }
            }}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button 
          onClick={()=>{
            addComments(commentText)
          }}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>Add</button>
        </div>
      </div>
      <div>
        <Comments comments={comments} deleting={deleting} showReply={showReply} setShowReply={setShowReply} reply={reply} setReply={setReply} addComments={addComments}/>
      </div>
    </div>
  );
};



export default App;
