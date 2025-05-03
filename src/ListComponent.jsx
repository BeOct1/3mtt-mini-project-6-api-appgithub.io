// src/ListComponent.jsx
import React from 'react';

const ListComponent = ({ items, toggleDetails, expandedId }) => {
    if (items.length === 0) {
        return <div>No comments available.</div>;
    }

    return (
        <div className="comments-container">
            {items.map(item => (
                <div
                    key={item.id}
                    className="comment-item"
                    onClick={() => toggleDetails(item.id)}
                >
                    <div className="comment-name">{item.name}</div>
                    <div className="comment-text">
                        {item.body.substring(0, 100)}...
                    </div>
                    <div className={`details ${expandedId === item.id ? 'show' : ''}`}>
                        <p><strong>Comment:</strong> {item.body}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListComponent;