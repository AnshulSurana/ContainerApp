import styled from 'styled-components';
import PageContentHeader from 'ad-react-components/lib/PageContentHeader';
import Title from 'ad-react-components/lib/Text/Title';
import Icon from 'ad-react-components/lib/Icon';
import { StackItem } from 'ad-react-components/lib/Stack';
import Avatar from 'ad-react-components/lib/Avatar';
import Card from 'ad-react-components/lib/Card';
import Table from 'ad-react-components/lib/Table/Table';
import Container from 'ad-react-components/lib/Container/Container';
import {
  DARK_GRAY,
  DEEP_GRAY,
  MID_GRAY,
  LIGHT_GRAY,
  WHITE,
  SECONDARY,
  GRAY
} from 'ad-react-components/lib/constants/colors';

export const CreditMemoDetailsWrapper = styled.div`
  position: relative;
`;

export const HiddenElement = styled.div`
  display: none;
`;

export const CreditMemoPageContentHeader = styled(PageContentHeader)`
  position: relative;
  padding-top: '50px';
`;

export const SectionTitle = styled(Title)`
  margin-bottom: 7px;
`;

export const DetailsLabel = styled.dt`
  color: ${DARK_GRAY};
`;

export const DetailsData = styled.dd`
  color: ${DEEP_GRAY};
  margin-inline-start: 0px;
  margin-bottom: 10px;
`;
export const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DescriptionColumn = styled.div`
  width: 32%;
`;

export const Slat = styled.dl`
  padding: 14px;
`;

export const LeftSpan = styled.span`
  color: ${DARK_GRAY};
  display: inline-block;
  font-size: 14px;
  min-height: 14px;
  && {
    padding: 6px 0;
  }
`;

export const LeftAmountDueSpan = styled.span`
  display: inline-block;
  font-family: 'Helvetica Neue';
  font-size: 20px;
  && {
    padding: 6px 0;
  }
`;

export const RightAmountDueSpan = styled.span`
  display: inline-block;
  float: right;
  font-family: 'Helvetica Neue';
  font-size: 20px;
  && {
    padding: 6px 0;
  }
`;

export const RightSpan = styled.span`
  color: ${DARK_GRAY};
  display: inline-block;
  float: right;
  text-align: right;
  font-size: 14px;
  && {
    padding: 6px 0;
  }
`;

export const CreditMemoStackItem = styled(StackItem)`
  :last-child {
    background-color: ${LIGHT_GRAY};
    padding: 10px;
  }
  padding: 6px 10px;
  && {
    :nth-last-child(2) {
      border-bottom: none;
    }
    :nth-last-child(3) {
      border-bottom: ${({ creationMode }) =>
        creationMode ? 'none' : `1px solid ${MID_GRAY}`};
    }
  }

  > li {
    padding: 6px 0 0 0;
  }
`;

export const CreditMemoSubtotal = styled.li`
  border-bottom: ${(props) =>
    props.displayTaxBreakdown && props.displayTaxSubtotal
      ? `1px solid ${MID_GRAY}`
      : 'none'};
  padding: ${(props) =>
    props.displayTaxBreakdown && props.displayTaxSubtotal ? '0' : '6px 0'};
`;

export const SummaryContainer = styled.div`
  margin-left: auto;
  width: 45%;
  padding: 12px;
  background-color: ${WHITE};
`;

export const QuestionIcon = styled(Icon)`
  padding-left: 5px;
`;

export const CardCustom = styled(Card)`
  h2 {
    font-size: 14px;
  }
  line-height: 14px;
  width: 20%;
`;

export const CardCustomLogo = styled(Avatar)`
  height: 32px;
  width: 32px;
  border-radius: 7px;
  font-size: 25px;
  color: ${DARK_GRAY};
`;

export const Description = styled.div`
  display: flex;
`;

export const Subscription = styled.div`
  align-self: flex-end;
  line-height: 14px;
`;

export const LinesTable = styled(Table)`
  tbody tr td {
    border-top: 1px solid rgb(244, 244, 244);
    background-color: ${LIGHT_GRAY};
  }
  tr td:first-child {
    width: 55%;
  }
  tr td:nth-child(2) {
    width: 15%;
    text-align: right;
  }
  tr td:nth-child(3) {
    width: 15%;
    text-align: right;
  }
  tr td:nth-child(4) {
    width: 15%;
    text-align: right;
  }
  tr td {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  &&& {
    tbody tr td {
      padding: 4px 12px;
    }
  }
`;

export const ProductTable = styled(Table)`
  tbody tr {
    border-top-style: none;
    border-bottom-style: none;
  }
  tbody tr td:only-of-type {
    background-color: ${WHITE};
  }
  tbody tr:first-child td {
    padding: 10px 12px;
  }
  margin-bottom: 24px;
`;

export const LinesTableWrapper = styled.div`
  padding: 0 10px;
`;

export const MainCustomTable = styled(Table)`
  tbody tr {
    border-top-style: none;
    border-bottom-style: none;
  }
  th.description {
    width: 55%;
  }
  th.price {
    text-align: right;
    width: 15%;
  }
  th.quantity {
    width: 15%;
    text-align: right;
  }
  th.total {
    width: 15%;
    text-align: right;
    padding-right: 22px;
  }
  border: none;
  && {
    tr td h6 {
      margin-bottom: 0;
    }
  }
  margin-bottom: 0;
  tr td {
    background-color: ${WHITE};
  }
`;

export const SlimHr = styled.hr`
  border: 1px solid ${MID_GRAY};
  border-bottom: none;
  margin: 0;
`;

export const TableWrapper = styled(Container)`
  border-top: 1px solid ${GRAY};
`;

export const PlanLabel = styled.span`
  color: ${DARK_GRAY};
`;

export const PlanData = styled.span`
  color: ${DEEP_GRAY};
`;

export const SubscriptionLabel = styled.span`
  color: ${SECONDARY};
`;

export const SubscriptionData = styled.span`
  color: ${SECONDARY};
`;
