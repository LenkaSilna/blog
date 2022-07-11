import { Box, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../Articles/ArticleDetail';

const AdminArticles = () => {
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
    <Container maxWidth="xl">
      <Box>
        <h1>My articles</h1>
        <Link to="/admin-new-article" className="link">
          <Button variant="contained">Create new article</Button>
        </Link>
      </Box>
    </Container>
  );
};
export default AdminArticles;
