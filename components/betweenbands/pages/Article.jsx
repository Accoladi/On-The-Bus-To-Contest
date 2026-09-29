import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articlesData from '../articleData'; // Import the articles data

const Article = () => {
  const { articleId } = useParams();
  const [articleContent, setArticleContent] = useState(null);

  useEffect(() => {
    console.log("articleid", articleId.id); 
    // Find the article based on the provided articleId
    const selectedArticle = articlesData.find(article => article.id === parseInt(articleId));

    // Update the article content based on the selected article
    setArticleContent(selectedArticle);
  }, [articleId]);

  return (
    <div>
      {articleContent ? (
        <div>
          <h1>{articleContent.title}</h1>
          <img src={`/${articleContent.image}`} alt={articleContent.title} />
          <p>{articleContent.content}</p>
          {/* Display additional article content as needed */}
        </div>
      ) : (
        <p>Loading article...</p>
      )}
    </div>
  );
};

export default Article;
