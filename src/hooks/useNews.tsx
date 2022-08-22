import axios from 'axios';
import { useEffect, useState } from 'react';
import { INews } from '../types/news';

const useNews = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsNewsLoading(true);
    const url = 'https://belarusbank.by/api/news_info?lang=ru';

    const fetchData = async () => {
      try {
        const { data } = await axios(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
          },
        });

        const res: INews[] = [...data.filter((item: INews, idx: number) => idx < 50)];
        setNews(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsNewsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isNewsLoading,
    news,
  };
};

export default useNews;
