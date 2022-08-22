import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICredit } from '../types/credit';

const useCredit = () => {
  const [credits, setCredits] = useState<ICredit[]>([]);
  const [isCreditLoading, setIsCreditLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsCreditLoading(true);
    const url = 'https://belarusbank.by/api/kredits_info';

    const fetchData = async () => {
      try {
        const data = await axios(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
          },
        });
        setCredits(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCreditLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isCreditLoading,
    credits,
  };
};
export default useCredit;
