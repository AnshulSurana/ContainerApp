import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '..';

describe('Footer', () => {
  it('renders', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toBeDefined();
  });
});
