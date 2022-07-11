import { ReactElement, useEffect, useState } from 'react';

export type Article = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string;
  createdAt: string;
  lastUpdatedAt: string;
};

const ArticleDetail = (article: {
  imageId: string;
  articleId: string;
  perex: string;
  createdAt: string;
  lastUpdateAt: string;
  title: string;
}): ReactElement => {
  const [loadImageUrl, setLoadImageUrl] = useState<string>('');
  useEffect(() => {
    const fetchImage = async (): Promise<void> => {
      try {
        const response = await fetch(
          (process.env.REACT_APP_URL as string) + '/images/' + article.imageId,
          {
            method: 'GET',
            headers: {
              'X-API-KEY': process.env.REACT_APP_API_KEY as string,
              'Content-Type': 'application/json',
            },
          },
        );
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setLoadImageUrl(imageObjectURL);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [article.imageId]);
  return (
    <>
      <h1>{article.title}</h1>
    </>
  );
};
export default ArticleDetail;
