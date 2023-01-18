import { storeMicroUIremoteHost } from '../remoteHostsStore';

jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);

describe('remoteHostsStore', () => {
  it('stores remote host and url', () => {
    storeMicroUIremoteHost();
    expect(
      window.sessionStorage.getItem(`micro_microUIRemoteAppName_host`)
    ).toBe('microUIRemoteHost');
    expect(
      window.sessionStorage.getItem(`micro_microUIRemoteAppName_url`)
    ).toBe('microUIRemoteUrl');
  });
});
