// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import { -place-Context } from 'fe-tools/lib/providers/-place-ContextProvider';
import LoadHermes from '../LoadHermes';
import instantiate from '../hermes';

jest.mock('../hermes');

describe('LoadHermes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not call hermes instantiate when context status is loading', () => {
    const validBootstrap = {
      bootstrap: undefined,
      status: 'loading'
    };

    render(
      <-place-Context.Provider value={validBootstrap}>
        <LoadHermes />
      </-place-Context.Provider>
    );

    expect(instantiate).toHaveBeenCalledTimes(0);
  });

  it('should not call hermes instantiate when hermes is undefined', () => {
    const validBootstrap = {
      bootstrap: undefined,
      status: 'success'
    };

    render(
      <-place-Context.Provider value={validBootstrap}>
        <LoadHermes />
      </-place-Context.Provider>
    );

    expect(instantiate).toHaveBeenCalledTimes(0);
  });

  it('should call hermes instantiate when hermes is defined', () => {
    const validBootstrap = {
      bootstrap: {
        hermesOnInstance: true,
        hermesOnPartner: true
      },
      status: 'success'
    };

    global.Hermes = {
      mock: true
    };

    render(
      <-place-Context.Provider value={validBootstrap}>
        <LoadHermes />
      </-place-Context.Provider>
    );

    expect(instantiate).toHaveBeenCalledTimes(1);
  });
});
