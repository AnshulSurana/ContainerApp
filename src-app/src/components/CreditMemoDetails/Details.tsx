import React, { FC } from 'react';
import { t } from 'fe-tools';

import Container from 'ad-react-components/lib/Container/Container';

import {
  DetailsLabel,
  DetailsData,
  DescriptionRow,
  DescriptionColumn,
  Slat
} from './detailsStyle';
import {
  CreditMemo,
  CreditMemoUserInfo
} from '../../store/Types/creditMemo.types';
import { formatDate } from '../../utils';
import { DATE_FORMAT } from '../../constants';

interface DetailsProps {
  creditMemo: CreditMemo;
  localeLanguage: string;
}

const Details: FC<DetailsProps> = ({
  creditMemo,
  localeLanguage
}: DetailsProps) => {
  const formDisplayName = (user: CreditMemoUserInfo) => {
    return `${user?.recorded?.firstName} ${user?.recorded?.lastName}`;
  };

  return (
    <Container elevated>
      <Slat>
        <DescriptionRow>
          <DescriptionColumn>
            <DetailsLabel>
              {t('credit.memo.details.summary.user.label')}
            </DetailsLabel>
            <DetailsData data-testid="details-customer-user-name">
              {formDisplayName(creditMemo?.customer?.user)}
            </DetailsData>
            <DetailsLabel>
              {t('credit.memo.details.summary.company.label')}
            </DetailsLabel>
            <DetailsData data-testid="details-customer-company-name">
              {creditMemo?.customer?.account?.recorded?.name}
            </DetailsData>
            <DetailsLabel>
              {t('credit.memo.details.summary.id.label')}
            </DetailsLabel>
            <DetailsData data-testid="details-credit-memo-id">
              {creditMemo?.id}
            </DetailsData>
          </DescriptionColumn>
          <DescriptionColumn>
            <DetailsLabel>
              {t('credit.memo.details.summary.date.label')}
            </DetailsLabel>
            <DetailsData data-testid="details-credit-memo-date">
              {formatDate(creditMemo?.creditMemoCreationDate, localeLanguage, {
                DATE_FORMAT
              })}
            </DetailsData>
            <DetailsLabel>
              {t('credit.memo.details.summary.number.label')}
            </DetailsLabel>
            <DetailsData data-testid="details-credit-memo-number">
              {creditMemo?.creditMemoNumber}
            </DetailsData>
            <DetailsLabel>
              {t('credit.memo.details.summary.source.label')}
            </DetailsLabel>
            <DetailsData>Credit</DetailsData>
          </DescriptionColumn>
        </DescriptionRow>
      </Slat>
    </Container>
  );
};

export default Details;
