import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '..';

jest.mock('fe-tools/lib/hooks/use-place-Context', () =>
  jest.fn(() => ({
    bootstrap: {}
  }))
);

global.AdUniversalHeader = () => ({ configure: () => ({}), init: () => ({}) });

describe('Header', () => {
  it('renders', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeDefined();
  });
});
