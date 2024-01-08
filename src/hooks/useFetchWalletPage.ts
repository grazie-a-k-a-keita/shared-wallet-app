import { useEffect, useState } from 'react';

import axios from 'axios';

import type { UseFetchWalletPageProps } from '../types/props';
import type { WalletPageBalanceInfo, WalletPageDisplayInfo } from '../types/type';

function useFetchWalletPage(props: UseFetchWalletPageProps) {
  const { actionFlag, setIsLoading, year, month } = props;

  const [walletPageBalanceInfo, setWalletPageBalanceInfo] = useState<WalletPageBalanceInfo>({
    totalAssets: 0,
    monthlyBalance: [],
  });

  const [walletPageDisplayInfo, setWalletPageDisplayInfo] = useState<WalletPageDisplayInfo>({
    totalAssets: 0,
    monthSpending: 0,
    monthIncome: 0,
  });

  // 年月が変更された場合
  useEffect(() => {
    setIsLoading(true);

    // API通信
    // API通信後、引数の"data.yearMonth"に一致するデータを"walletPageDisplayInfo"にセットする
    const fetchData = async (data: { yearMonth: string }) => {
      console.log('通信中...');
      try {
        const response = await axios.post<WalletPageBalanceInfo>(
          import.meta.env.VITE_POST_PAYMENT_GET_ALL,
          data
        );

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
        // TODO
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
      // すでに月の収支情報を持っている場合はAPI通信スキップし、"walletPageDisplayInfo"を更新する
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

  // 収支情報の登録、更新（DB更新）が行われた場合
  useEffect(() => {
    setIsLoading(true);

    // 収支情報のリセット
    setWalletPageBalanceInfo({ totalAssets: 0, monthlyBalance: [] });

    // API通信
    // API通信後、引数の"data.yearMonth"に一致するデータを"walletPageDisplayInfo"にセットする
    const fetchData = async (data: { yearMonth: string }) => {
      console.log('通信中...');
      try {
        const response = await axios.post<WalletPageBalanceInfo>(
          import.meta.env.VITE_POST_PAYMENT_GET_ALL,
          data
        );

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
        // TODO
      }
    };

    fetchData({ yearMonth: `${year}-${String(month).padStart(2, '0')}` });

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionFlag]);

  return { walletPageDisplayInfo };
}
export default useFetchWalletPage;
