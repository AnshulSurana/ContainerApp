import { navigationItems } from '../navigation';

describe('Navigation', () => {
  it('navigationItems should not have any unsupported properties', () => {
    const supportedProperties = [
      'getTitle',
      'pathPattern',
      'isSecondaryNavEnabled',
      'isTertiaryNavEnabled',
      'collectionName',
      'secondaryNavItemSelected',
      'verticalNavigationItemSelected',
      'namespace',
      'backgroundColor',
      'authorizedRoles',
      'isFooterEnabled',
      'isHeaderEnabled',
      'isLegacyStylePage',
      'autoSetup',
      'settings',
      'RemoteMicroUIurl',
      'RemoteMicroUIName',
      'isLegacyLayoutPage',
      'requiredFeatureFlag'
    ];
    const unsupportedProperties = [];
    Object.keys(navigationItems).forEach((route) => {
      Object.keys(navigationItems[route]).forEach((property) => {
        if (!supportedProperties.includes(property)) {
          unsupportedProperties.push(property);
        }
      });
    });
    expect(unsupportedProperties.length).toBe(0);
  });

  it('Should not override an existing path', () => {
    const paths = Object.values(navigationItems).map(
      (item) => item.pathPattern
    );
    const uniquePaths = [...new Set(paths)];
    expect(paths).toHaveLength(uniquePaths.length);
  });

  it('Should not use pathPattern from denied list', () => {
    const deniedPathPatterns = ['/myapps'];
    const pathPatterns = Object.keys(navigationItems).map(
      (key) => navigationItems[key].pathPattern
    );
    const unsupportedPathPatterns = pathPatterns.filter((pathPattern) =>
      deniedPathPatterns.includes(pathPattern)
    );
    expect(unsupportedPathPatterns).toHaveLength(0);
  });
});
