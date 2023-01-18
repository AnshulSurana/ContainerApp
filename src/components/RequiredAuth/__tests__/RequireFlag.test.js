import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequiredAuth from '../RequiredAuth';
import use-place-Context from 'fe-tools/lib/hooks/use-place-Context';
import { useQuery } from 'react-query';

let mock = jest.fn();

delete window.location;
window.location = { assign: mock, replace: mock };

jest.mock('fe-tools/lib/hooks/use-place-Context');
jest.mock('react-query');

global.IS_DEVELOPMENT = false;

describe('RequiredFlag', () => {
  it('do not show children when flag is false', async () => {
    use-place-Context.mockReturnValue({ bootstrap: {} });
    useQuery.mockReturnValue({
      isSuccess: true,
      isError: false,
      data: { variant: false }
    });

    render(
      <RequiredAuth requiredFeatureFlag="testFlag">
        <div>children</div>
      </RequiredAuth>
    );
    await expect(screen.queryByText('children')).toBeNull();
  });

  it('do not show children when flag fail', async () => {
    use-place-Context.mockReturnValue({ bootstrap: {} });
    useQuery.mockReturnValue({
      isSuccess: false,
      isError: true,
      data: { variant: false }
    });
    render(
      <RequiredAuth requiredFeatureFlag="testFlag">
        <div>children</div>
      </RequiredAuth>
    );
    await expect(screen.queryByText('children')).toBeNull();
  });
  it('render children when flag return true', async () => {
    use-place-Context.mockReturnValue({ bootstrap: {} });
    useQuery.mockReturnValue({
      isSuccess: true,
      isError: false,
      data: { variant: true }
    });
    render(
      <RequiredAuth requiredFeatureFlag="testFlag">
        <div>children</div>
      </RequiredAuth>
    );
    await expect(screen.getByText('children')).toBeVisible();
  });
});
