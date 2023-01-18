import React from 'react';
import use-place-Context from 'fe-tools/lib/hooks/use-place-Context';
import fetchAppConfigr from 'fe-tools/lib/api/fetchAppConfigr';
import { useQuery } from 'react-query';

const RequiredFlag = ({ children, requiredFeatureFlag }) => {
  const { bootstrap } = use-place-Context();

  const { isSuccess, isError, error, data } = useQuery(
    `feature_flag_${requiredFeatureFlag}`,
    () =>
      fetchAppConfigr({
        flagKey: requiredFeatureFlag,
        entityContext: { tenant: bootstrap?.CHANNEL_SETTINGS?.partner }
      })
  );

  if (isSuccess && !!data.variant) {
    return children;
  } else if (isSuccess && !data.variant) {
    window.location.href = '/logout';
  } else if (isError) {
    document.body.dispatchEvent(
      new CustomEvent('ad-show-error-page', {
        detail: { source: 'RequiredFlag', error: error }
      })
    );
  }

  return null;
};

export default RequiredFlag;
