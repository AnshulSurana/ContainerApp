export const SECONDARY_NAV_NAVIGATION_RESULT = {
  data: {
    navigationMenusByCollectionNames: {
      navigationMenus: [
        {
          collectionName: 'secondaryNav',
          menus: [
            {
              label: 'Marketplace',
              menuName: 'channel-secondary-menu',
              menuItems: [
                {
                  name: 'setup',
                  label: 'Setup',
                  url: '/channel/guide',
                  metaData: null,
                  child: null
                },
                {
                  name: 'marketplace',
                  label: 'Dashboard',
                  url: '/channel/marketplace',
                  metaData: null,
                  child: null
                },
                {
                  name: 'products',
                  label: 'Products',
                  url: '/channel/products',
                  metaData: null,
                  child: null
                },
                {
                  name: 'settings',
                  label: 'Settings',
                  url: '/channel/settings',
                  metaData: null,
                  child: null
                },
                {
                  name: 'reports',
                  label: 'Reports',
                  url: '/channel/reports/history',
                  metaData: null,
                  child: null
                },
                {
                  name: 'MicroContainer',
                  label: 'MicroContainer',
                  url: '/hello-micro-container',
                  metaData: null,
                  child: null
                }
              ]
            }
          ]
        }
      ],
      error: null
    }
  }
};

export const TERTIARY_MARKETPLACE_NAVIGATION_RESULT = {
  data: {
    navigationMenusByCollectionNames: {
      navigationMenus: [
        {
          collectionName: 'tertiary-marketplace',
          menus: [
            {
              label: 'Home',
              menuName: 'marketplace',
              menuItems: [
                {
                  name: 'dashboard',
                  label: 'Overview',
                  url: '/channel/marketplace#dashboard',
                  metaData: null,
                  child: null
                },
                {
                  name: 'users',
                  label: 'Users',
                  url: '/channel/marketplace#users',
                  metaData: null,
                  child: null
                },
                {
                  name: 'companies',
                  label: 'Companies',
                  url: '/channel/marketplace#companies',
                  metaData: null,
                  child: {
                    name: 'pending-companies',
                    menus: [
                      {
                        label: 'marketplace',
                        menuName: 'marketplace',
                        menuItems: [
                          {
                            name: 'pendingCompanies',
                            label: 'PendingCompanies',
                            url: "/channel/marketplace/pending-companies'",
                            metaData: null
                          }
                        ]
                      }
                    ]
                  }
                },
                {
                  name: 'leads',
                  label: 'Leads',
                  url: '/channel/marketplace#leads',
                  metaData: null,
                  child: null
                },
                {
                  name: 'bulkUpload',
                  label: 'Bulk Creation',
                  url: '/channel/marketplace#migration-company-access',
                  metaData: null,
                  child: null
                }
              ]
            }
          ]
        }
      ],
      error: null
    }
  }
};

export const FAILED_NAMESPACE_NAVIGATION_RESULT = {
  error: {
    message: "Namespace 'marketplace' was not found.",
    locations: [
      {
        line: 2,
        column: 5
      }
    ],
    path: ['navigationMenusByCollectionNames'],
    extensions: {
      code: 'BAD_USER_INPUT',
      exception: {}
    }
  },
  data: null
};

export const NAMESPACE_WITH_URL_ERROR_RESULT = {
  error: {
    message: 'URL invalidURL is invalid, relative URL expected.',
    locations: [
      {
        line: 11,
        column: 17
      }
    ],
    path: [
      'navigationMenusByCollectionNames',
      'navigationMenus',
      1,
      'menus',
      0,
      'menuItems',
      0,
      'url'
    ],
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      exception: {}
    }
  },
  data: null
};

export const NAMESPACE_COLLECTION_NAMES_WITH_ERROR_RESULT = {
  data: {
    navigationMenusByCollectionNames: {
      navigationMenus: null,
      errors: [
        {
          message: 'Collections not found.',
          invalidCollectionNames: ['tertiary-marketplace']
        }
      ]
    }
  }
};
