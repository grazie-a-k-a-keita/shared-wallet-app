import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

type UseFetchPaymentProps = {
  actionFlag: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  year: number;
  month: number;
};

function useFetchPayment(props: UseFetchPaymentProps) {
  const { actionFlag, setIsLoading, year, month } = props;

  const navigate = useNavigate();

  const [fetchDataState, setFetchDataState] = useState<GetDetail>([]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // 取得情報のリセット
    setFetchDataState([]);
  }, [actionFlag]);

  // 収支情報の登録、更新（DB更新）が行われた場合
  useEffect(() => {
    // 初回ロード時はスキップ
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // API通信
    const fetchData = async (data: { yearMonth: string }) => {
      setIsLoading(true);

      try {
        const response = await axios.post<GetDetail>(
          import.meta.env.VITE_POST_PAYMENT_GET_DETAIL,
          data
        );

        // 同じ月の情報をすでに保持している場合は、それを上書きする
        // 同じ月の情報をまだ保持していない場合は、新規追加する
        const setData = [...fetchDataState];
        response.data.forEach((resItem) => {
          let setFlag = false;
          for (let i = 0; i < setData.length; i += 1) {
            if (resItem.yearMonth === setData[i].yearMonth) {
              setData[i] = resItem;
              setFlag = true;
              return;
            }
          }
          if (!setFlag) setData.push(resItem);
        });
        setFetchDataState(setData);
      } catch (error) {
        navigate('/error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData({ yearMonth: `${year}-${String(month).padStart(2, '0')}` });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionFlag]);

  // 年月が変更された場合
  useEffect(() => {
    // API通信
    const fetchData = async (data: { yearMonth: string }) => {
      setIsLoading(true);

      try {
        const response = await axios.post<GetDetail>(
          import.meta.env.VITE_POST_PAYMENT_GET_DETAIL,
          data
        );

        // 同じ月の情報をすでに保持している場合は、それを上書きする
        // 同じ月の情報をまだ保持していない場合は、新規追加する
        const setData = [...fetchDataState];
        response.data.forEach((resItem) => {
          let setFlag = false;
          for (let i = 0; i < setData.length; i += 1) {
            if (resItem.yearMonth === setData[i].yearMonth) {
              setData[i] = resItem;
              setFlag = true;
              return;
            }
          }
          if (!setFlag) setData.push(resItem);
        });
        setFetchDataState(setData);
      } catch (error) {
        navigate('/error');
      } finally {
        setIsLoading(false);
      }
    };

    let fetchFlag = true;
    fetchDataState.forEach((item) => {
      if (item.yearMonth === `${year}-${String(month).padStart(2, '0')}`) fetchFlag = false;
    });

    if (fetchFlag === true) {
      // まだ月の情報を持っていない場合はAPI通信を行う
      fetchData({ yearMonth: `${year}-${String(month).padStart(2, '0')}` });
    } else {
      // すでに月の収支情報を持っている場合はAPI通信をスキップする
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  return { fetchDataState };
}
export default useFetchPayment;
