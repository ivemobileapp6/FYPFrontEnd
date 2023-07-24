import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase';

const FileList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, 'reviews');
      const reviewDocs = await getDocs(reviewsCollection);
      const reviews = reviewDocs.docs.map(doc => doc.data());
      setReviews(reviews);
    };

    fetchReviews();
  }, []);

  const stripHtmlTags = (str) => {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p>{stripHtmlTags(review.content)}</p>
              <p>Written by: {review.username}</p>
              <p>Submitted at: {new Date(review.createdAt.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default FileList;