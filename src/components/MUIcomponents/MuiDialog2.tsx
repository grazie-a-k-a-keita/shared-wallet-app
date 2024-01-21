import * as React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Fab, TextField, ThemeProvider, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import axios from 'axios';

import messageData from '../../configs/messageData.json';
import theme from '../../configs/textFieldTheme';
import {
  DefaultSystemBlue,
  DefaultSystemRed,
  LabelColorLightPrimary,
  Size2,
  Size3,
  Size4,
  Size5,
  Size8,
} from '../../styles/variables';

import MuiTextField from './MuiTextField';
import MuiTextFieldNumber from './MuiTextFieldNumber';
import MuiTextFieldSelect from './MuiTextFieldSelect';

type DialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paymentDate: string;
  seqId: number;
  memosOrder: number;
  paymentType: boolean;
  categoryID: number;
  memo: string;
  subMemo: string;
  subAmount: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  actionFlag: boolean;
  setActionFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
};

type SimpleDialogProps = {
  open: boolean;
  handleClose: () => void;
  paymentType: boolean;
  paymentDate: string;
  seqId: number;
  memosOrder: number;
  Category: number;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
  memo: string;
  subMemo: string;
  setSubMemo: React.Dispatch<React.SetStateAction<string>>;
  subAmount: number;
  setSubAmount: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  actionFlag: boolean;
  setActionFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setBarInfo: React.Dispatch<React.SetStateAction<BarInfo>>;
};

function SimpleDialog(props: SimpleDialogProps) {
  const {
    open,
    handleClose,
    paymentType,
    paymentDate,
    seqId,
    memosOrder,
    Category,
    setCategory,
    memo,
    subMemo,
    setSubMemo,
    subAmount,
    setSubAmount,
    setIsLoading,
    actionFlag,
    setActionFlag,
    setBarInfo,
  } = props;

  const [errorInfo1, setErrorInfo1] = React.useState({ error: false, message: '' });
  const [errorInfo2, setErrorInfo2] = React.useState({ error: false, message: '' });

  // 更新、削除ボタン押下時の処理
  const handleUpdate = async (updateFlag: 'Back' | 'Update' | 'Delete') => {
    if (updateFlag === 'Back') {
      // 戻るボタン return
      handleClose();
      return;
    }

    setIsLoading(true);

    const data: PostUpdateData = {
      updateFlag: updateFlag as 'Update' | 'Delete',
      seqId,
      paymentDate,
      paymentType,
      totalAmount: undefined,
      categoryID: Category,
      memo,
      memosOrder,
      memos: undefined,
    };

    if (paymentType) data.memos = { memo: subMemo, amount: subAmount };
    if (!paymentType) data.totalAmount = subAmount;

    // 入力チェック（削除の場合は無視）
    let errorFlag: boolean = false;

    // メモ（小）が空文字の場合
    if (updateFlag === 'Update' && paymentType && subMemo === '') {
      setErrorInfo1({ error: true, message: messageData.ERROR_MESSAGE_1 });
      errorFlag = true;
    }

    // 金額が0円以下の場合
    if (updateFlag === 'Update' && subAmount <= 0) {
      setErrorInfo2({ error: true, message: messageData.ERROR_MESSAGE_2 });
      errorFlag = true;
    }

    if (errorFlag) {
      // エラーの場合 return
      setIsLoading(false);
      return;
    }

    // API通信
    try {
      await axios.post(import.meta.env.VITE_POST_PAYMENT_POST_ITEM, data);
      // fetch情報を再更新する
      setActionFlag(!actionFlag);
    } catch (error) {
      setBarInfo({
        open: true,
        severity: 'error',
        message: messageData.BAR_STATUS_MESSAGE_3,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    handleClose();

    if (updateFlag === 'Delete') {
      setBarInfo({
        open: true,
        severity: 'success',
        message: messageData.BAR_STATUS_MESSAGE_4,
      });
    } else if (updateFlag === 'Update') {
      setBarInfo({
        open: true,
        severity: 'success',
        message: messageData.BAR_STATUS_MESSAGE_5,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog onClose={handleClose} open={open}>
        <Box sx={{ padding: Size8 }}>
          <Typography
            fontSize={Size3}
            style={{ color: LabelColorLightPrimary, textAlign: 'center' }}
          >
            編集 または 削除を行う
          </Typography>
          <Box sx={{ padding: Size2 }} />

          <TextField
            type='date'
            label='日付'
            value={paymentDate}
            variant='standard'
            fullWidth
            disabled
          />
          <Box sx={{ padding: Size2 }} />

          <TextField
            label={paymentType ? 'メモ（店名など）' : 'メモ（名前など）'}
            value={memo}
            variant='standard'
            fullWidth
            disabled
          />
          <Box sx={{ padding: Size2 }} />

          {paymentType ? (
            <>
              <MuiTextFieldSelect
                label='カテゴリー'
                value={String(Category)}
                setState={setCategory}
              />
              <Box sx={{ padding: Size2 }} />
            </>
          ) : null}

          {paymentType ? (
            <>
              <MuiTextField
                label='メモ（商品名など）'
                value={subMemo}
                setState={setSubMemo}
                errorInfo={errorInfo1}
              />
              <Box sx={{ padding: Size2 }} />
            </>
          ) : null}

          <MuiTextFieldNumber
            label='金額'
            value={subAmount}
            setState={setSubAmount}
            errorInfo={errorInfo2}
            isValue
          />
          <Box sx={{ padding: Size4 }} />

          <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Fab
              aria-label='back'
              sx={{ background: '#fff', boxShadow: 'none' }}
              onClick={() => handleUpdate('Back')}
            >
              <ArrowBackIcon color='primary' />
            </Fab>
            <Box sx={{ marginX: Size5 }} />

            <Fab
              aria-label='delete'
              sx={{ background: DefaultSystemRed }}
              onClick={() => handleUpdate('Delete')}
            >
              <DeleteForeverIcon sx={{ color: '#fff' }} />
            </Fab>
            <Box sx={{ marginX: Size5 }} />

            <Fab
              aria-label='edit'
              sx={{ background: DefaultSystemBlue }}
              onClick={() => handleUpdate('Update')}
            >
              <EditIcon sx={{ color: '#fff' }} />
            </Fab>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}

function MuiDialog2(props: DialogProps) {
  const {
    open,
    setOpen,
    paymentDate,
    seqId,
    memosOrder,
    paymentType,
    categoryID,
    memo,
    subMemo,
    subAmount,
    setIsLoading,
    actionFlag,
    setActionFlag,
    setBarInfo,
  } = props;

  const [categoryIDState, setCategoryIDState] = React.useState(categoryID);
  const [subMemoState, setSubMemoState] = React.useState(subMemo);
  const [subAmountState, setSubAmountState] = React.useState(subAmount);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <SimpleDialog
        open={open}
        handleClose={handleClose}
        paymentType={paymentType}
        paymentDate={paymentDate}
        seqId={seqId}
        memosOrder={memosOrder}
        Category={categoryIDState}
        setCategory={setCategoryIDState}
        memo={memo}
        subMemo={subMemoState}
        setSubMemo={setSubMemoState}
        subAmount={subAmountState}
        setSubAmount={setSubAmountState}
        setIsLoading={setIsLoading}
        actionFlag={actionFlag}
        setActionFlag={setActionFlag}
        setBarInfo={setBarInfo}
      />
    </div>
  );
}

export default MuiDialog2;
