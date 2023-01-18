import React from 'react';
import { render } from '@testing-library/react';
import LocalDevelopmentLogin from '../LocalDevelopmentLogin';

describe('LocalDevelopmentLogin', () => {
  it('renders', () => {
    const { container } = render(<LocalDevelopmentLogin />);
    expect(container).toBeDefined();
  });
});
