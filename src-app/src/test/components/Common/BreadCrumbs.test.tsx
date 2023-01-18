import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import WrappedRender from '../../../../__setup__/setupTests';
import BreadCrumb from '../../../components/Common/BreadCrumbs/InternalBreadCrumb';
import AlertBox from '../../../components/Common/AlertBox';

const store = {
  memoList: {
    creditMemos: []
  }
};

describe('BreadCrumbs common component testing', () => {
  it('Should render BreadCrumbComponent on Details Page', () => {
    const Items = ['CreditMemo', 'CreditMemo #1'];
    const onClick = jest.fn();
    WrappedRender(<BreadCrumb Items={Items} onClick={onClick} />, store);

    expect(screen.getAllByTestId('breadcrumb:item')).toHaveLength(2);
  });
  it('should test BreadCrumbComponent onClick button', async () => {
    const Items = ['CreditMemo', 'CreditMemo #1'];
    const onClick = jest.fn().mockImplementationOnce(() => true);

    WrappedRender(<BreadCrumb Items={Items} onClick={onClick} />, store);

    expect(screen.getAllByTestId('breadcrumb:item')).toHaveLength(2);
    fireEvent.click(screen.getAllByTestId('breadcrumb:item')[0], {});
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  it('Should test BreadCrumbComponent when one element is available', async () => {
    const Items = ['CreditMemo'];
    const onClickSingle = jest.fn().mockImplementationOnce(() => true);
    WrappedRender(<BreadCrumb Items={Items} onClick={onClickSingle} />, store);

    expect(screen.getByTestId('breadcrumb:item')).toBeInTheDocument();
  });
  it('Should test AlertBox component when error occurred', async () => {
    const alertFlag = false;
    const onClickSingle = jest.fn().mockImplementationOnce(() => true);
    WrappedRender(<AlertBox alert={alertFlag} setAlert={onClickSingle} />);

    expect(
      screen.getByTestId('creditMemoAlertBoxComponent')
    ).toBeInTheDocument();
  });
});
