// src/Comments.jsx
import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';
import './styles.css';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setComments(data.slice(10, 100)); // Limit to the first 100 comments
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleRetry = () => {
        fetchComments();
    };

    const filteredComments = comments.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="phone-container">
                <h1>Comments</h1>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="loading-skeleton" style={{ width: '100%' }}></div>
                <div className="loading-skeleton" style={{ width: '100%' }}></div>
                <div className="loading-skeleton" style={{ width: '100%' }}></div>
                <div className="home-button"></div> {/* Home button */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="phone-container">
                <h1>Comments</h1>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p>Error: {error}</p>
                <button className="retry-button" onClick={handleRetry}>Retry</button>
                <div className="home-button"></div> {/* Home button */}
            </div>
        );
    }

    return (
        <div className="phone-container">
            <h1>Comments</h1>
            <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="comments-container">
                <ListComponent items={filteredComments} toggleDetails={toggleDetails} expandedId={expandedId} />
            </div>
            <div className="home-button"></div> {/* Home button */}
        </div>
    );
};

export default Comments;