export const fallback = () => {
  window.hermes = {
    push(data, callback) {
      return callback ? callback() : null;
    }
  };
};

export const instantiate = (hermesOnInstance, hermesOnPartner) => {
  if (hermesOnInstance && hermesOnPartner) {
    fetch('/api/hermes/v2/config')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `fetchHermesConfig failed with status code - ${response.status.toString()}`
        );
      })
      .then((config) => {
        const { platforms, identity } = config;
        try {
          // Instantiate if library was loaded successfully
          window.hermes = new window.Hermes(platforms, identity);
        } catch (error) {
          fallback();
        }
      })
      .catch(() => fallback());
  } else {
    fallback();
  }
};

export default instantiate;
