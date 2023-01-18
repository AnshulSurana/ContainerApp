import React, { FC } from 'react';
import { t } from 'fe-tools';
import Alert from 'ad-react-components/lib/Alert/Alert';

interface AlertBoxProps {
  alert: boolean;
  setAlert(value: boolean): void;
}

const AlertBox: FC<AlertBoxProps> = ({ alert, setAlert }) => {
  return (
    <div
      data-e2e="creditMemoAlertBoxComponent"
      data-testid="creditMemoAlertBoxComponent"
      style={{ position: 'relative', height: '400px' }}
    >
      {!alert && (
        <Alert
          state="error"
          onClose={() => setAlert(true)}
          style={{ fontSize: '14px', lineHeight: '22.4px' }}
        >
          <span>{t('credit.memo.error')}</span>
        </Alert>
      )}
    </div>
  );
};

export default AlertBox;
