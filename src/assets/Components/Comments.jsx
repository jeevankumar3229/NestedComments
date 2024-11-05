import React, { useRef, useEffect } from 'react';

const Comments = ({ comments, deleting, showReply, setShowReply, reply, setReply, addComments }) => {
  const replyInputRefs = useRef({});

  const handleReplyClick = (commentId) => {
    setShowReply(commentId);
  };

  useEffect(() => {
    if (replyInputRefs.current[showReply]) {
      replyInputRefs.current[showReply].focus();
    }
  }, [showReply]); 

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            backgroundColor: '#f3f4f6',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            borderLeft: '4px solid blue'
          }}>
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="user"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '1rem' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold' }}>{comment.text}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  style={{ border: 'none', cursor: 'pointer' }}
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Reply
                </button>
                <button
                  style={{ border: 'none', cursor: 'pointer' }}
                  onClick={() => deleting(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {showReply === comment.id && (
            <div style={{ marginTop: '0.5rem', marginLeft: '2rem' }}>
              <input
                type="text"
                placeholder="Reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addComments(reply, comment.id);
                  }
                }}
                ref={(input) => (replyInputRefs.current[comment.id] = input)} // Assign ref to input
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '100%', marginBottom: '0.5rem' }}
              />
              <button
                onClick={() => {
                  addComments(reply, comment.id);
                }}
                style={{
                  marginRight: '0.5rem', padding: '0.3rem 0.6rem', color: '#000',
                  border: 'none', borderRadius: '4px', cursor: 'pointer'
                }}>
                Add
              </button>
              <button style={{
                padding: '0.3rem 0.6rem', color: '#000', border: 'none',
                borderRadius: '4px', cursor: 'pointer'
              }}
                onClick={() => {
                  setShowReply(null);
                }}>
                Cancel
              </button>
            </div>
          )}
          {comment.replies.length > 0 && (
            <div style={{ marginLeft: '2rem', marginTop: '0.5rem' }}>
              <Comments
                comments={comment.replies}
                deleting={deleting}
                showReply={showReply}
                setShowReply={setShowReply}
                reply={reply}
                setReply={setReply}
                addComments={addComments}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export { Comments };
