import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage500 from '../ErrorPage500';

describe('ErrorPage500', () => {
  it('renders', () => {
    render(<ErrorPage500 />);

    expect(screen.getByRole('alert')).toBeDefined();
  });
});
