import React, { FC } from 'react';

import { t } from 'fe-tools';

import TableHeader from 'ad-react-components/lib/Table/TableHeader';
import Title from 'ad-react-components/lib/Text/Title';

import {
  SubscriptionData,
  SubscriptionLabel,
  PlanData,
  PlanLabel,
  TableWrapper,
  MainCustomTable,
  LinesTableWrapper,
  ProductTable,
  LinesTable,
  Subscription,
  Description,
  CardCustomLogo,
  CardCustom
} from './detailsStyle';
import PriceSummary from './PriceSummary';
import {
  formatCurrency,
  formatDateWithFormat,
  formatNumber,
  formatPercentage
} from '../../utils';
import { CreditMemo } from '../../store/Types/creditMemo.types';
import { DATE_FORMAT } from '../../constants';

interface SummaryProps {
  creditMemo: CreditMemo;
  currencyFormats: any;
  localeLanguage: any;
}

const Summary: FC<SummaryProps> = ({
  creditMemo,
  currencyFormats,
  localeLanguage
}: SummaryProps) => {
  const { creditMemoLines, subTotal, total, totalTax, currency } = creditMemo;

  const lineData: Array<object | void> = [];
  creditMemoLines.forEach((memo) => {
    const {
      product,
      subscription: { current: subCurrent },
      period
    } = memo;
    lineData.push({
      period: {
        ...period
      },
      products: [
        {
          description: {
            product: { ...product },
            subscription: subCurrent
          },
          lines: [
            {
              quantity: memo?.quantity,
              total: memo?.total,
              price: memo?.unitPrice,
              description: memo?.description
            }
          ]
        }
      ]
    });
    lineData.map((x) => {
      console.log('line data is: ', x);
    });
  });

  const formatBillingPeriod = (period) => {
    const startDate =
      period && formatDateWithFormat(period?.start, DATE_FORMAT);
    const endDate = period && formatDateWithFormat(period?.end, DATE_FORMAT);
    const data = `${startDate} - ${endDate}`;
    return <Title type="xxSmall">{data}</Title>;
  };

  const formatDescriptionCard = ({ product, subscription }) => (
    <Description>
      <CardCustom
        title={product?.recorded?.name}
        image={<CardCustomLogo icon="image" />}
      >
        <div>
          <PlanLabel>{`${t(
            'credit.memo.details.summary.plan.name.label'
          )} `}</PlanLabel>
          <PlanData>{product?.recorded?.name}</PlanData>
        </div>
      </CardCustom>
      <Subscription>
        <SubscriptionLabel>
          {t('credit.memo.details.summary.subscription.label')}
        </SubscriptionLabel>
        <SubscriptionData>{subscription?.id}</SubscriptionData>
      </Subscription>
    </Description>
  );

  const displayPrice = (entry, percentage, locale) => {
    if (entry) {
      if (percentage) {
        // JS numberFormatter converts 1 as 100%
        const discountPercentage = entry / 100.0;
        return (
          <div>
            {formatPercentage(discountPercentage, locale, currencyFormats)}
          </div>
        );
      }
      const priceByParts = entry.split('/');
      const price = priceByParts[0];
      const unit = priceByParts[1];
      return (
        <div>
          {formatCurrency(price, currency, locale, currencyFormats)}
          {unit && <span> / {unit}</span>}
        </div>
      );
    }
    return null;
  };
  const formatLines = ({ lines }) => (
    <LinesTableWrapper>
      <LinesTable data-testid="lines-table" headerless rows={lines}>
        <TableHeader name="description" className="description" />
        <TableHeader
          name="price"
          className="price"
          cellFormatter={(entry, { percentage }) =>
            displayPrice(entry, percentage, localeLanguage)
          }
        />
        <TableHeader
          name="quantity"
          className="quantity"
          cellFormatter={(entry) => formatNumber(entry, localeLanguage)}
        />
        <TableHeader
          name="total"
          className="total"
          cellFormatter={(entry) =>
            formatCurrency(entry, currency, localeLanguage)
          }
        />
      </LinesTable>
    </LinesTableWrapper>
  );

  const formatDescription = ({ products }) => {
    return (
      <ProductTable
        data-testid="product-table"
        rows={products}
        headerless
        rowDetails={formatLines}
        id="productTable"
      >
        <TableHeader name="description" cellFormatter={formatDescriptionCard} />
      </ProductTable>
    );
  };
  return (
    <TableWrapper elevated>
      <MainCustomTable
        id="mainTable"
        data-testid="main-table"
        bordered
        rows={lineData}
        rowDetails={formatDescription}
      >
        <TableHeader
          highlight
          name="period"
          className="description"
          cellFormatter={formatBillingPeriod}
        >
          {t('credit.memo.details.summary.table.description.table.header')}
        </TableHeader>
        <TableHeader highlight name="price" className="price">
          {t('credit.memo.details.summary.table.unit.price.table.header')}
        </TableHeader>
        <TableHeader highlight name="quantity" className="quantity">
          {t('credit.memo.details.summary.table.quantity.table.header')}
        </TableHeader>
        <TableHeader highlight name="total" className="total">
          {t('credit.memo.details.summary.table.total.credit.table.header')}
        </TableHeader>
      </MainCustomTable>
      <PriceSummary
        subTotal={subTotal}
        tax={totalTax}
        total={total}
        currencyFormats={currencyFormats}
        currency={currency}
        localeLanguage={localeLanguage}
      />
    </TableWrapper>
  );
};

export default Summary;
