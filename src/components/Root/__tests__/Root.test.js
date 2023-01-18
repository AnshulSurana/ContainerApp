import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { -place-ContextProvider } from 'fe-tools';
import { RootContent } from '..';

jest.mock('../../Body', () => 'Body');
jest.mock('../../Header', () => 'Header');

jest.mock('fe-tools/lib/hooks/use-place-Context', () =>
  jest.fn(() => ({
    bootstrap: {}
  }))
);

describe('Root', () => {
  const { container } = render(
    <BrowserRouter>
      <RootContent />
    </BrowserRouter>
  );

  it('renders with footer', () => {
    const footer = container.querySelector('.universalFooter');
    expect(footer).toBeDefined();
    expect(container).toBeDefined();
  });

  it('renders footer', () => {});

  it('Root Execute Error page DOM event', async () => {
    fireEvent(
      document.body,
      new CustomEvent('ad-show-error-page', { detail: {} })
    );

    waitFor(() =>
      expect(
        screen.getByText('Internal Server Error', { exact: false })
      ).toBeVisible()
    );
  });

  it('Root Execute navigate page DOM event', async () => {
    fireEvent(
      document.body,
      new CustomEvent('ad-navigate', {
        detail: { path: '/hello-micro-container' }
      })
    );
    waitFor(() =>
      expect(
        screen.getByText('Welcome to MicroContainer', { exact: false })
      ).toBeVisible()
    );
  });
});
