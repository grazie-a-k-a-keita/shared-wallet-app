import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

type UseFetchWalletPageProps = {
  actionFlag: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  year: number;
  month: number;
};

function useFetchWalletPage(props: UseFetchWalletPageProps) {
  const { actionFlag, setIsLoading, year, month } = props;

  const navigate = useNavigate();

  const [walletPageBalanceInfo, setWalletPageBalanceInfo] = useState<GetAll>({
    totalAssets: 0,
    monthlyBalance: [],
  });

  const [walletPageDisplayInfo, setWalletPageDisplayInfo] = useState<WalletPageDisplayInfo>({
    totalAssets: 0,
    monthSpending: 0,
    monthIncome: 0,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    // 収支情報のリセット
    setWalletPageBalanceInfo({ totalAssets: 0, monthlyBalance: [] });
  }, [actionFlag]);

  // 収支情報の登録、更新（DB更新）が行われた場合
  useEffect(() => {
    // 初回ロード時はスキップ
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsLoading(true);

    // API通信
    // API通信後、引数の"data.yearMonth"に一致するデータを"walletPageDisplayInfo"にセットする
    const fetchData = async (data: { yearMonth: string }) => {
      try {
        const response = await axios.post<GetAll>(import.meta.env.VITE_POST_PAYMENT_GET_ALL, data);

        // 同じ月の収支情報をすでに保持している場合は、それを上書きする
        // 同じ月の収支情報をまだ保持していない場合は、新規追加する
        const setData = { ...walletPageBalanceInfo };
        setData.totalAssets = response.data.totalAssets;
        response.data.monthlyBalance.forEach((resItem) => {
          let setFlag = false;
          for (let i = 0; i < setData.monthlyBalance.length; i += 1) {
            if (resItem.yearMonth === setData.monthlyBalance[i].yearMonth) {
              setData.monthlyBalance[i] = resItem;
              setFlag = true;
              return;
            }
          }
          if (!setFlag) setData.monthlyBalance.push(resItem);
        });
        setWalletPageBalanceInfo(setData);

        // WalletPage表示用の変数をセットする
        const setDisplayData = {
          totalAssets: setData.totalAssets,
          monthSpending: 0,
          monthIncome: 0,
        };
        setData.monthlyBalance.forEach((item) => {
          if (item.yearMonth === data.yearMonth) {
            setDisplayData.monthSpending = item.monthSpending;
            setDisplayData.monthIncome = item.monthIncome;
          }
        });
        setWalletPageDisplayInfo(setDisplayData);
      } catch (error) {
        navigate('/error');
      }
    };

    fetchData({ yearMonth: `${year}-${String(month).padStart(2, '0')}` });

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionFlag]);

  // 年月が変更された場合
  useEffect(() => {
    setIsLoading(true);

    // API通信
    // API通信後、引数の"data.yearMonth"に一致するデータを"walletPageDisplayInfo"にセットする
    const fetchData = async (data: { yearMonth: string }) => {
      try {
        const response = await axios.post<GetAll>(import.meta.env.VITE_POST_PAYMENT_GET_ALL, data);

        // 同じ月の収支情報をすでに保持している場合は、それを上書きする
        // 同じ月の収支情報をまだ保持していない場合は、新規追加する
        const setData = { ...walletPageBalanceInfo };
        setData.totalAssets = response.data.totalAssets;
        response.data.monthlyBalance.forEach((resItem) => {
          let setFlag = false;
          for (let i = 0; i < setData.monthlyBalance.length; i += 1) {
            if (resItem.yearMonth === setData.monthlyBalance[i].yearMonth) {
              setData.monthlyBalance[i] = resItem;
              setFlag = true;
              return;
            }
          }
          if (!setFlag) setData.monthlyBalance.push(resItem);
        });
        setWalletPageBalanceInfo(setData);

        // WalletPage表示用の変数をセットする
        const setDisplayData = {
          totalAssets: setData.totalAssets,
          monthSpending: 0,
          monthIncome: 0,
        };
        setData.monthlyBalance.forEach((item) => {
          if (item.yearMonth === data.yearMonth) {
            setDisplayData.monthSpending = item.monthSpending;
            setDisplayData.monthIncome = item.monthIncome;
          }
        });
        setWalletPageDisplayInfo(setDisplayData);
      } catch (error) {
        navigate('/error');
      }
    };

    let fetchFlag = true;
    walletPageBalanceInfo.monthlyBalance.forEach((item) => {
      if (item.yearMonth === `${year}-${String(month).padStart(2, '0')}`) fetchFlag = false;
    });

    if (fetchFlag === true) {
      // まだ月の収支情報を持っていない場合はAPI通信を行う
      fetchData({ yearMonth: `${year}-${String(month).padStart(2, '0')}` });
    } else {
      // すでに月の収支情報を持っている場合はAPI通信をスキップし、"walletPageDisplayInfo"を更新する
      const setDisplayData = {
        totalAssets: walletPageBalanceInfo.totalAssets,
        monthSpending: 0,
        monthIncome: 0,
      };
      walletPageBalanceInfo.monthlyBalance.forEach((item) => {
        if (item.yearMonth === `${year}-${String(month).padStart(2, '0')}`) {
          setDisplayData.monthSpending = item.monthSpending;
          setDisplayData.monthIncome = item.monthIncome;
        }
      });
      setWalletPageDisplayInfo(setDisplayData);
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  return { walletPageDisplayInfo };
}
export default useFetchWalletPage;
