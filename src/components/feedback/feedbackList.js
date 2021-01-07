import React from 'react';
import FeedbackItem from './feedbackItem';
export default function FeedbackList({ feedbacks }) {
  return (
    <>
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback._id} feedback={feedback} />
      ))}
    </>
  );
}
