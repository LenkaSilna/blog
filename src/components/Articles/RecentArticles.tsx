import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import ArticleDetail from './ArticleDetail';
import { Article } from './ArticleDetail';

const RecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [processing, setProcessing] = useState<boolean>(true);
  useEffect(() => {
    const getArticles = async () => {
      try {
        setProcessing(true);
        const response = await fetch(
          (process.env.REACT_APP_URL as string) + '/articles',
          {
            method: 'GET',
            headers: {
              'X-API-KEY': process.env.REACT_APP_API_KEY as string,
              'Content-Type': 'application/json',
            },
          },
        );
        const responseData = await response.json();
        setArticles(responseData.items);
        setProcessing(false);
      } catch (error) {
        console.error(error);
      }
    };
    getArticles();
  }, []);

  return (
    <Box>
      {articles.length > 0 ? (
        <Container maxWidth="xl">
          Recent articles
          <Box sx={{ marginTop: '3rem' }}>
            {articles.map((article) => (
              <ArticleDetail
                key={article.imageId}
                imageId={''}
                articleId={''}
                perex={''}
                createdAt={''}
                lastUpdateAt={''}
                title={''}
              />
            ))}
          </Box>
        </Container>
      ) : (
        <Box>
          <h1>No articles available</h1>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
export default RecentArticles;
