import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { t, use-place-Context } from 'fe-tools';
import { isEmpty } from 'lodash';

import Icon from 'ad-react-components/lib/Icon';
import ContextMenu from 'ad-react-components/lib/ContextMenu';
import Modal from 'ad-react-components/lib/Modal';
import LoadingOverlay from 'ad-react-components/lib/Loading/LoadingOverlay';
import Button from 'ad-react-components/lib/Button';
import Toolbar from 'ad-react-components/lib/Toolbar';

import { Bootstrap } from 'fe-tools/lib/providers/types';
import BreadCrumb from '../Common/BreadCrumbs/InternalBreadCrumb';
import Details from './Details';
import Summary from './Summary';
import { CREDIT_MEMO_URL, CUSTOMER_CREDIT_MEMO_URL } from '../../constants';
import listing from '../../store/mocks/creditMemoListing';
import {
  FETCH_MEMO_DETAILS_FAILURE,
  FETCH_MEMO_DETAILS_SUCCESS
} from '../../store/actions';
import {
  CreditMemoDetailsWrapper,
  CreditMemoPageContentHeader
} from './detailsStyle';
import { CreditMemo } from '../../store/Types/creditMemo.types';
import fetchCreditMemoDetails from '../../hook/fetchCreditMemoDetails';
import { getBadgeType, getStatus } from '../../utils';
import documentBuilderService from '../../service/documentBuilderService';
import { setRedirectFromDetailsPage } from '../../utils/sessionUtil';
import AlertBox from '../Common/AlertBox';

interface CreditMemoDetailsContainerProps {
  memoDetails: CreditMemo;
  loading: Boolean;
}

const CreditMemoDetailsContainer: FC<CreditMemoDetailsContainerProps> = ({
  memoDetails,
  loading
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const { bootstrap, locale } = use-place-Context();
  const { currencyFormats, localeLanguage } = bootstrap as Bootstrap;

  const { data, isError } = fetchCreditMemoDetails(String(id), locale);

  // if (true)   {
  //   const { data: mockData } = listing;
  //   const { nodes } = mockData.creditMemos;
  //   const creditMemo = nodes.find(
  //     (node) => String(node.creditMemoNumber) === '8564321'
  //   );
  //   console.log("creditmemo 86:", creditMemo);
  //   dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: creditMemo });
  // }
  // else {
  // dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: data?.creditMemo });
  // }

  if (isError) {
    const { data: mockData } = listing;
    const { nodes } = mockData.creditMemos;
    const creditMemo = nodes.find(
      (node) => String(node.creditMemoNumber) === '8564321'
    );
    console.log('creditmemo 86:', creditMemo);
    dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: creditMemo });
  } else {
    dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: data?.creditMemo });
  }

  const redirectToMemoListPage = () => {
    setRedirectFromDetailsPage(true);
    document.body.dispatchEvent(
      new CustomEvent('ad-navigate', {
        detail: { path: CREDIT_MEMO_URL }
      })
    );
  };

  const redirectToCustomerCreditMemo = (creditMemoId) =>
    window.open(`${CUSTOMER_CREDIT_MEMO_URL}/${creditMemoId}`);

  const renderCustomerCreditMemoButton = (creditMemoId) => (
    <Button
      data-branding="button--secondary"
      data-testid="creditMemoDetailsButton"
      onClick={() => redirectToCustomerCreditMemo(creditMemoId)}
    >
      {t('credit.memo.details.customer.credit.memo.button')}
    </Button>
  );

  const voidOperation = () => {
    // TODO: Add Void Operation.
    setModal(true);
  };

  const downloadOperation = () => {
    documentBuilderService();
  };
  const items = [t('credit.memo.details.breadcrumbs.listing.text')];
  if (memoDetails?.creditMemoNumber != null) {
    items.push(
      t(
        'credit.memo.details.breadcrumbs.id.text',
        String(memoDetails?.creditMemoNumber)
      )
    );
  }

  const getFooter = () => (
    <Toolbar>
      <Button
        primary
        data-branding="button--primary"
        data-testid="void-modal-close-button"
        onClick={() => setModal(false)}
      >
        {t('credit.memo.details.close.button')}
      </Button>
    </Toolbar>
  );

  if (loading) {
    return (
      <div
        data-e2e="creditMemoDetailsContainer"
        data-testid="creditMemoDetailsLoader"
        style={{ position: 'relative', height: '400px' }}
      >
        <LoadingOverlay />
      </div>
    );
  }
  return (
    <CreditMemoDetailsWrapper
      data-e2e="creditMemoDetailsContainer"
      data-testid="creditMemoDetailsContainer"
      data-auto-container="credit:details"
    >
      <BreadCrumb
        data-testid="creditMemoDetailsBreadcrumb"
        Items={items}
        onClick={redirectToMemoListPage}
      />
      {/* <Alert> */}
      {/*  <HiddenElement data-auto-value="invoice:details:carried"> */}
      {/*    2 */}
      {/*  </HiddenElement> */}
      {/*  <p>{t('invoice.delegated.description', '2')}</p> */}
      {/*  <Button */}
      {/*    data-auto-action="redirect:delegated-invoice" */}
      {/*    data-branding="button--primary" */}
      {/*    primary */}
      {/*    onClick={() => redirectToMemoListPage()} */}
      {/*  > */}
      {/*    {t('invoice.delegated.view')} */}
      {/*  </Button> */}
      {/* </Alert> */}
      {/* {isError && <AlertBox alert={alert} setAlert={setAlert} />} */}
      {!isEmpty(memoDetails) && (
        <>
          <CreditMemoPageContentHeader
            elevated
            title={t('credit.memo.details.credit.memo.title')}
            identifier={memoDetails?.creditMemoNumber}
            badgeType={getBadgeType(memoDetails?.status)}
            badgeText={getStatus(memoDetails?.status)}
            badgeTooltipContent={memoDetails?.status}
            data-auto-container="credit-memo:details:header"
            data-testid="creditMemoPageContainer"
          >
            {renderCustomerCreditMemoButton(id)}
            <ContextMenu
              label={<Icon name="cog" />}
              resultsProps={{ widthByContent: true }}
            >
              <a
                onKeyPress={() => voidOperation()}
                onClick={() => voidOperation()}
                role="button"
                data-testid="voidOperation"
                tabIndex={0}
              >
                {t('credit.memo.details.void.dropdown.button')}
              </a>
              <a
                onKeyPress={() => downloadOperation()}
                onClick={() => downloadOperation()}
                role="button"
                data-testid="downloadOperation"
                tabIndex={0}
              >
                {t('credit.memo.details.download.dropdown.button')}
              </a>
            </ContextMenu>
          </CreditMemoPageContentHeader>

          <Details
            creditMemo={memoDetails as CreditMemo}
            localeLanguage={localeLanguage}
          />
          <Summary
            creditMemo={memoDetails as CreditMemo}
            currencyFormats={currencyFormats}
            localeLanguage={localeLanguage}
          />
          {modal && (
            <Modal
              data-testid="credit-memo-void-modal"
              header={t('credit.memo.modal.void.credit.memo.header')}
              dismissible
              onDismiss={() => setModal(false)}
              footer={getFooter()}
            >
              <p>{t('credit.memo.modal.void.credit.memo.text', String(id))}</p>
            </Modal>
          )}
        </>
      )}
    </CreditMemoDetailsWrapper>
  );
};

const mapStateToProps = ({ memo }) => ({
  memoDetails: memo.creditMemo,
  loading: memo.loadingDetails
});

export default connect(mapStateToProps, {})(CreditMemoDetailsContainer);
