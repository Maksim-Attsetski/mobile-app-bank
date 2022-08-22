import axios from 'axios';
import { useEffect, useState } from 'react';
import { IExchange } from '../types/kurs';

const useExchanges = () => {
  const [exchanges, setExchanges] = useState<IExchange[]>([]);
  const [isExchangesLoading, setIsExchangesLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsExchangesLoading(true);
    const url = 'https://belarusbank.by/api/kurs_cards';

    const fetchData = async () => {
      try {
        const data = await axios(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
          },
        });
        setExchanges(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsExchangesLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    exchanges,
    isExchangesLoading,
  };
};

export default useExchanges;
