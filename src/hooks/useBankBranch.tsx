import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { IBankBranch } from '../types/bankBranch';

interface IUseBankBranch {
  (): {
    isBankBranchesLoading: boolean;
    bankBranches: IBankBranch[];
  };
}

const useBankBranch: IUseBankBranch = () => {
  const [bankBranches, setBankBranches] = useState<IBankBranch[]>([]);
  const [isBankBranchesLoading, setIsBankBranchesLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsBankBranchesLoading(true);
    const url = 'https://belarusbank.by/api/filials_info?city=Минск';

    const fetchData = async () => {
      try {
        const data = await axios(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
          },
        });

        setBankBranches(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsBankBranchesLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isBankBranchesLoading,
    bankBranches,
  };
};
export default useBankBranch;
