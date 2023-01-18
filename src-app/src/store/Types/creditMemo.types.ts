export interface CreditMemoUser {
  id: string;
}

export interface CreditMemoRecordedAddress {
  city: string;
  country: string;
  postalCode: string;
  region: string;
  streetLine1: string;
  streetLine2: string;
}
export interface CreditMemoRecordedAddressPair {
  address: CreditMemoRecordedAddress;
  type: string;
}
export interface CreditMemoRecordedUser {
  addresses: CreditMemoRecordedAddressPair[];
  email: string | null;
  firstName: string;
  lastName: string;
}
export interface CreditMemoUserInfo {
  current: CreditMemoUser;
  recorded: CreditMemoRecordedUser;
}

export interface Account {
  id: string;
}

export interface CreditMemoRecordedAccount {
  name: string;
}

export interface CreditMemoAccountInfo {
  current: Account;
  recorded: CreditMemoRecordedAccount;
}

export interface CreditMemoParty {
  account: CreditMemoAccountInfo;
  user: CreditMemoUserInfo;
}

export interface CreditMemoRecordedCostType {
  description: string;
  feeLabel: string;
  type: string;
}
export interface CreditMemoCostType {
  recorded: CreditMemoRecordedCostType;
}

export interface CreditMemoRecordedCostUnit {
  allowDecimals: Boolean;
  feeLabel: string;
  unitLabel: string;
  unitsLabel: string;
}
export interface CreditMemoCostUnit {
  recorded: CreditMemoRecordedCostUnit;
}
export interface CreditMemoCostInfo {
  cost?: string | null;
  credit: Boolean;
  percentage: Boolean;
  strategy: string | null;
  type: CreditMemoCostType | string;
  typeCategory: string | null;
  unit: CreditMemoCostUnit | string;
}

export interface CreditMemoRecordedCostPeriod {
  feeLabel: string;
  periodLabel: string;
  periodsLabel: string;
  unit: string;
  unitValue: number;
}

export interface CreditMemoCostPeriodInfo {
  recorded: CreditMemoRecordedCostPeriod;
}

export interface CreditMemoRecordedDiscountUnit {
  maximum: number;
  minimum: number;
  unitName: string;
}
export interface CreditMemoRecordedDiscount {
  code: string;
  description: string;
  type: string;
  unit: CreditMemoRecordedDiscountUnit;
  value: number;
}

export interface CreditMemoDiscountInfo {
  recorded: CreditMemoRecordedDiscount;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface CreditMemoEdition {
  id: string;
  version: string;
}
export interface CreditMemoRecordedEdition {
  name: string;
}

export interface CreditMemoEditionInfo {
  current: CreditMemoEdition;
  recorded: CreditMemoRecordedEdition;
}
export interface PricingPlan {
  id: string;
}

export interface Product {
  id: string;
  name: string | null;
  description: string | null;
  version: string;
}
export interface CreditMemoRecordedPricingPlan {
  period: string;
}

export interface CreditMemoRecordedProduct {
  name: string;
}
export interface CreditMemoPricingPlanInfo {
  current: PricingPlan;
  recorded: CreditMemoRecordedPricingPlan;
}

export interface CreditMemoProductInfo {
  current: Product;
  recorded: CreditMemoRecordedProduct | null;
}

export interface Subscription {
  id: string;
}

export interface Period {
  end: Date | string;
  start: Date | string;
}

export interface Cost {
  id: string;
}
export interface CreditMemoSubscription {
  current: Subscription;
}
export interface CreditMemoTaxType {
  id: string;
  name: string;
  rate: number | string;
  strategy: string;
}

export interface CreditMemoTaxDetail {
  taxAmount: number | string;
  taxType: CreditMemoTaxType;
  taxableAmount: number | string;
}

export interface CreditMemoSeller {
  invoiceLogoUrl: string;
  invoiceMemo: string;
  invoiceText: string;
  merchantOfRecord?: object | undefined;
}

export interface CreditMemoMarketplace {
  name: string;
}

export interface CreditMemoLine {
  id: string;
  buyer: CreditMemoParty;
  cost: CreditMemoCostInfo | null;
  costPeriod: CreditMemoCostPeriodInfo;
  description: string;
  discount: CreditMemoDiscountInfo | null;
  edition: CreditMemoEditionInfo;
  orderLineId: string;
  period: Period;
  pricingPlan: CreditMemoPricingPlanInfo;
  product: CreditMemoProductInfo;
  provider: CreditMemoParty;
  quantity: number | string;
  subscription: CreditMemoSubscription;
  total: number | string;
  type: string;
  unitPrice: number | string;
}

export interface CreditMemo {
  id: string;
  amountAvailable: string;
  amountUsed: string;
  creditMemoAppliedDate: string;
  creditMemoCreationDate: string;
  creditMemoLines: CreditMemoLine[];
  creditMemoNumber: number;
  currency: string;
  initialStatus: string | null;
  tenant: string;
  status: string | null;
  subTotal: number | string;
  taxDetails: CreditMemoTaxDetail[];
  total: number | string;
  totalTax: number | string;
  seller: CreditMemoSeller;
  customer: CreditMemoParty;
}
export interface Details {
  currentCreditMemo: CreditMemo;
}
export interface Listing {
  creditMemo: CreditMemo[];
  currentCreditMemoCount: number;
  pageInfo: PageInfo[];
}

export interface TableFilters {
  showFilter: Boolean;
  fromDate: null;
  toDate: null;
  status: string;
  name: string;
}

export interface CreditMemoData {
  tableFilters: TableFilters | {};
  orderBy: [
    {
      field: string;
      direction: string;
    }
  ];
  isRedirectedFromDetailsPage: Boolean;
  currentPage: number;
  totalCreditMemoCount: number;
  pageInfo: Object;
  deletedCreditMemo: string;
}
export interface CreditMemoFilter {
  creditMemoDate: Array<String>;
  creditMemoStatus: String;
  filterUserId: String;
  searchText: String;
  partner: String;
  userUuid: String;
}

export interface FILTERS {
  creditMemoStatus: String | null;
  creditMemoDate: Array<string> | null;
  searchText: String | null;
  scope: String;
  tenant: String;
  locale: String;
}
