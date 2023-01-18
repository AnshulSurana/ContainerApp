import React from 'react';
import { render } from '@testing-library/react';
import DevTools from '../DevTools';

describe('Devtools', () => {
  it('Show DevTools', () => {
    const { container } = render(<DevTools />);

    expect(container).toBeVisible();
  });
});
