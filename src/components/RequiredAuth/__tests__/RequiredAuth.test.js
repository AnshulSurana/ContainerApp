import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequiredAuth from '../RequiredAuth';
import use-place-Context from 'fe-tools/lib/hooks/use-place-Context';

let mock = jest.fn();

delete window.location;
window.location = { assign: mock, replace: mock };

jest.mock('fe-tools/lib/hooks/use-place-Context');

global.IS_DEVELOPMENT = false;

describe('RequiredAuth', () => {
  it('redirect to login when user is undefined', () => {
    use-place-Context.mockReturnValue({ bootstrap: {} });
    render(
      <RequiredAuth authorizedRoles={['USER']}>
        <div>children</div>
      </RequiredAuth>
    );
    expect(screen.queryByText('children')).toBeNull();
  });
  it('render children when user is defined', () => {
    use-place-Context.mockReturnValue({
      bootstrap: {
        UserInfo: { roles: ['USER'] }
      }
    });
    render(
      <RequiredAuth authorizedRoles={['USER']}>
        <div>children</div>
      </RequiredAuth>
    );
    expect(screen.getByText('children')).toBeVisible();
  });
});
