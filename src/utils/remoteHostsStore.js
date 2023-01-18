export const storeMicroUIremoteHost = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const microUIRemoteHost = urlParams.get('microUIRemoteHost');
  const microUIRemoteUrl = urlParams.get('microUIRemoteUrl') || '';
  const microUIRemoteAppName = urlParams.get('microUIRemoteAppName');
  if (microUIRemoteHost && microUIRemoteAppName) {
    window.sessionStorage.setItem(
      `micro_${microUIRemoteAppName}_host`,
      microUIRemoteHost
    );
  }
  if (microUIRemoteUrl && microUIRemoteAppName) {
    window.sessionStorage.setItem(
      `micro_${microUIRemoteAppName}_url`,
      microUIRemoteUrl
    );
  }
};

export const getMicroUIremoteHost = (microUIRemoteAppName) => {
  if (window.ad_micro_env !== 'production') {
    return (
      window.sessionStorage.getItem(`micro_${microUIRemoteAppName}_host`) || ''
    );
  }
  return '';
};

export const getMicroUIremoteUrl = (microUIRemoteAppName, defaultUrl) => {
  if (window.ad_micro_env !== 'production') {
    return (
      window.sessionStorage.getItem(`micro_${microUIRemoteAppName}_url`) ||
      defaultUrl
    );
  }
  return defaultUrl;
};
