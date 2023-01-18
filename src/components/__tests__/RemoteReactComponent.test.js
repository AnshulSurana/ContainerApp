import React from 'react';
import { render } from '@testing-library/react';
import RemoteMicroUIReactApp from '../RemoteReactComponent';

describe('RemoteMicroUIReactApp', () => {
  it('renders', () => {
    const { container } = render(
      <RemoteMicroUIReactApp url={'a_url'} name={'a_name'} />
    );
    expect(container).toBeDefined();
  });
});
