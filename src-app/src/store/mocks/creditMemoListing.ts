const listing = {
  data: {
    creditMemos: {
      nodes: [
        {
          id: '2702874e-3aa5-11ed-a261-0242ac120002',
          amountAvailable: '1000',
          amountUsed: '2324',
          creditMemoAppliedDate: '2022-09-16T10:57:09.667Z',
          creditMemoCreationDate: '2022-09-16T10:57:09.667Z',
          creditMemoNumber: 8564321,
          currency: 'USD',
          initialStatus: null,
          tenant: 'partner',
          status: 'APPLIED',
          subTotal: '220',
          taxDetails: [
            {
              taxAmount: '112',
              taxType: {
                id: 'id',
                name: 'name',
                rate: '324',
                strategy: 'strategy'
              },
              taxableAmount: '234'
            }
          ],
          total: '250',
          totalTax: '30',
          seller: {
            invoiceLogoUrl: 'en_US value',
            invoiceMemo: 'en_US value',
            invoiceText: 'en_US value'
          },
          customer: {
            company: {
              current: {
                id: 'uuid'
              },
              recorded: {
                name: 'Bravo'
              }
            },
            user: {
              current: {
                id: 'uuid'
              },
              recorded: {
                email: null,
                firstName: 'Luna',
                lastName: 'Lovegood',
                addresses: [
                  {
                    type: 'key',
                    address: {
                      city: 'city',
                      country: 'USA',
                      postalCode: 'CODE',
                      region: 'CAL',
                      streetLine1: 'line1',
                      streetLine2: 'line2'
                    }
                  }
                ]
              }
            }
          },
          creditMemoLines: [
            {
              id: 'id',
              buyer: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: 'Bravo'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'firstname',
                    lastName: 'lastName',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              cost: {
                type: 'ONE_TIME_PER_UNIT',
                typeCategory: 'ONE_TIME',
                unit: 'USER',
                strategy: null,
                credit: false,
                percentage: false
              },
              costPeriod: {
                recorded: {
                  feeLabel: 'Monthly',
                  periodLabel: 'Month',
                  periodsLabel: 'Months',
                  unit: 'MONTHS',
                  unitValue: 1
                }
              },
              description: 'Business',
              discount: null,
              edition: {
                current: {
                  id: 'id',
                  version: 'PUBLISHED'
                },
                recorded: {
                  name: 'locale'
                }
              },
              orderLineId: 'orderLineId1',
              period: {
                end: '2022-09-16T10:57:09.668Z',
                start: '2022-09-16T10:57:09.668Z'
              },
              pricingPlan: {
                current: {
                  id: 'uuid'
                },
                recorded: {
                  period: 'period'
                }
              },
              product: {
                current: {
                  id: '369626',
                  name: 'BOX',
                  description: 'Business',
                  version: 'PUBLISHED'
                },
                recorded: null
              },
              provider: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: 'Bravo'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'firstname',
                    lastName: 'lastName',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              quantity: '10',
              subscription: {
                current: {
                  id: '1da70cdc-cd18-4fad-80dc-37ac51fdb2c4'
                }
              },
              total: '110',
              type: 'ITEM',
              unitPrice: '11'
            },
            {
              id: 'id',
              buyer: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: 'Bravo'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'firstname',
                    lastName: 'lastName',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              cost: {
                type: 'ONE_TIME_PER_UNIT',
                typeCategory: 'ONE_TIME',
                unit: 'USER',
                strategy: null,
                credit: false,
                percentage: false
              },
              costPeriod: {
                recorded: {
                  feeLabel: 'Monthly',
                  periodLabel: 'Month',
                  periodsLabel: 'Months',
                  unit: 'MONTHS',
                  unitValue: 1
                }
              },
              description: 'New product',
              discount: null,
              edition: {
                current: {
                  id: 'id',
                  version: 'PUBLISHED'
                },
                recorded: {
                  name: 'locale'
                }
              },
              orderLineId: 'orderLineId2',
              period: {
                end: '2022-09-16T10:57:09.668Z',
                start: '2022-09-16T10:57:09.668Z'
              },
              pricingPlan: {
                current: {
                  id: 'uuid'
                },
                recorded: {
                  period: 'period'
                }
              },
              product: {
                current: {
                  id: '369627',
                  name: 'CHIP',
                  description: 'Business',
                  version: 'PUBLISHED'
                },
                recorded: null
              },
              provider: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: 'Bravo'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'firstname',
                    lastName: 'lastName',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              quantity: '11',
              subscription: {
                current: {
                  id: '1da70cdc-cd18-4fad-80dc-34rf0h89dgg33'
                }
              },
              total: '110',
              type: 'ITEM',
              unitPrice: '10'
            }
          ]
        },
        {
          id: '1a95009a-3aa5-11ed-a261-0242ac120002',
          amountAvailable: '1000',
          amountUsed: '2323',
          creditMemoAppliedDate: '2022-09-15T10:57:09.667Z',
          creditMemoCreationDate: '2022-09-15T10:57:09.667Z',
          creditMemoNumber: 8675443,
          currency: 'USD',
          initialStatus: null,
          tenant: 'partner',
          status: 'UNAPPLIED',
          subTotal: '110',
          taxDetails: [
            {
              taxAmount: '111',
              taxType: {
                id: 'id',
                name: 'name',
                rate: '323',
                strategy: 'strategy'
              },
              taxableAmount: '232'
            }
          ],
          total: '125',
          totalTax: '15',
          seller: {
            invoiceLogoUrl: 'en_US value',
            invoiceMemo: 'en_US value',
            invoiceText: 'en_US value'
          },
          customer: {
            company: {
              current: {
                id: 'uuid'
              },
              recorded: {
                name: '-place-'
              }
            },
            user: {
              current: {
                id: 'uuid'
              },
              recorded: {
                email: null,
                firstName: 'Mathew',
                lastName: 'Morris',
                addresses: [
                  {
                    type: 'key',
                    address: {
                      city: 'city',
                      country: 'USA',
                      postalCode: 'CODE',
                      region: 'CAL',
                      streetLine1: 'line1',
                      streetLine2: 'line2'
                    }
                  }
                ]
              }
            }
          },
          creditMemoLines: [
            {
              id: 'id',
              buyer: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: '-place-'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'firstname',
                    lastName: 'lastName',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              cost: {
                type: 'ONE_TIME_PER_UNIT',
                typeCategory: 'ONE_TIME',
                unit: 'USER',
                strategy: null,
                credit: false,
                percentage: false
              },
              costPeriod: {
                recorded: {
                  feeLabel: 'feelabel',
                  periodLabel: 'periodLabel',
                  periodsLabel: 'periodsLabel',
                  unit: 'USD',
                  unitValue: 123
                }
              },
              description: 'description',
              discount: null,
              edition: {
                current: {
                  id: 'id',
                  version: 'PUBLISHED'
                },
                recorded: {
                  name: 'locale'
                }
              },
              orderLineId: 'orderLineId',
              period: {
                end: '2022-09-15T10:57:09.668Z',
                start: '2022-09-15T10:57:09.668Z'
              },
              pricingPlan: {
                current: {
                  id: 'uuid'
                },
                recorded: {
                  period: 'period'
                }
              },
              product: {
                current: {
                  id: 'uuid',
                  name: 'Box',
                  description: 'Product Description',
                  version: 'PUBLISHED'
                },
                recorded: null
              },
              provider: {
                company: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    name: '-place-'
                  }
                },
                user: {
                  current: {
                    id: 'uuid'
                  },
                  recorded: {
                    email: null,
                    firstName: 'Mathew',
                    lastName: 'Morris',
                    addresses: [
                      {
                        type: 'key',
                        address: {
                          city: 'city',
                          country: 'USA',
                          postalCode: 'CODE',
                          region: 'CAL',
                          streetLine1: 'line1',
                          streetLine2: 'line2'
                        }
                      }
                    ]
                  }
                }
              },
              quantity: '10',
              subscription: {
                current: {
                  id: 'uuid'
                }
              },
              total: '110',
              type: 'ITEM',
              unitPrice: '11'
            }
          ]
        }
      ],
      totalCount: 20,
      pageInfo: {
        startCursor: 1,
        endCursor: 2,
        hasPreviousPage: false,
        hasNextPage: false
      }
    }
  }
};

export default listing;
