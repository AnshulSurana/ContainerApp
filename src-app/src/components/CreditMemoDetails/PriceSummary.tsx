import React, { FC } from 'react';
import { t } from 'fe-tools';

import {
  SummaryContainer,
  CreditMemoStackItem,
  CreditMemoSubtotal,
  RightSpan,
  RightAmountDueSpan,
  LeftAmountDueSpan,
  LeftSpan
} from './detailsStyle';

import { formatCurrency } from '../../utils';

interface PriceSummaryProps {
  subTotal: any;
  tax: any;
  total: any;
  currencyFormats: any;
  currency: string | null;
  localeLanguage: string | null;
}

const PriceSummary: FC<PriceSummaryProps> = ({
  subTotal,
  tax,
  total,
  currencyFormats,
  currency,
  localeLanguage
}: PriceSummaryProps) => {
  return (
    <SummaryContainer>
      <CreditMemoStackItem>
        <CreditMemoSubtotal>
          <LeftSpan>
            {t('credit.memo.details.price.summary.subtotal.label')}
          </LeftSpan>
          <RightSpan data-testid="subtotal-value">
            {formatCurrency(
              subTotal,
              currency,
              localeLanguage,
              currencyFormats
            )}
          </RightSpan>
        </CreditMemoSubtotal>
        <LeftSpan>{t('credit.memo.details.price.summary.tax.label')}</LeftSpan>
        <RightSpan data-testid="tax-value">
          {formatCurrency(tax, currency, localeLanguage, currencyFormats)}
        </RightSpan>
      </CreditMemoStackItem>
      <CreditMemoStackItem>
        <LeftAmountDueSpan>
          <strong>
            {t('credit.memo.details.price.summary.total.credit.label')}
          </strong>
        </LeftAmountDueSpan>
        <RightAmountDueSpan data-testid="total-value">
          <strong>
            {formatCurrency(total, currency, localeLanguage, currencyFormats)}
          </strong>
        </RightAmountDueSpan>
      </CreditMemoStackItem>
    </SummaryContainer>
  );
};
export default PriceSummary;
