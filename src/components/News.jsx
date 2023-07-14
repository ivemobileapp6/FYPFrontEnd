import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);

  const rapidApiKey = '8ceb831aa4mshf0d386b8386bffbp172014jsn6e07d2aa0d11';
  const rapidApiHost = 'news-api14.p.rapidapi.com';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: 'https://news-api14.p.rapidapi.com/top-headlines',
          params: {
            country: 'us',
            language: 'en',
            pageSize: '10',
            category: 'sports',
          },
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
          },
        });

        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          throw new Error(`Error fetching news articles: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest Top Headlines</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;