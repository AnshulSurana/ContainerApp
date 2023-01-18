import styled from 'styled-components';
import DateRangePicker from 'ad-react-components/lib/Forms/DateRangePicker';
import Dropdown from 'ad-react-components/lib/Forms/Dropdown';
import Label from 'ad-react-components/lib/Forms/Label';
import Table from 'ad-react-components/lib/Table/ApiTable';
import Badge from 'ad-react-components/lib/Badge';
import { DEEP_GRAY } from 'ad-react-components/lib/constants/colors';

export const Container = styled.div`
  margin-top: 1px;
`;

export const FilterRow = styled.div`
  margin-top: 12px;
`;

export const StatusDropdown = styled(Dropdown)`
  margin-left: 0px;
  margin-right: 20px;
  width: 100px;
`;

export const StatusLabel = styled(Label)`
  margin-left: 38px;
`;

export const DateRangeField = styled(DateRangePicker)`
  input[data-auto-input='calender'] {
    height: 29px;
  }
`;

export const StyledTable = styled(Table)`
  table-layout: fixed;

  th {
    > div {
      display: inline;
    }
  }
`;

export const TableHeaderLabel = styled.span`
  display: inline-block;
`;

export const StyledLink = styled.span`
  text-decoration: none;
  color: ${DEEP_GRAY};
  cursor: pointer;
`;

export const TooltipContainer = styled.div`
  :hover {
    position: relative;
  }
`;
export const Ellipses = styled.div`
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  color: ${DEEP_GRAY};
  text-decoration: none;
  white-space: nowrap;

  :hover {
    align-content: center;
    padding: 0 4px;
    margin-left: -4px;
    border-radius: 5px;
    overflow: visible;
    box-shadow: rgb(255 255 255 / 95%) 0px 1px 3px 0px inset,
      rgb(0 0 0 / 10%) 0px 3px 10px 0px;
    background-color: rgb(230, 245, 249);
    overflow-wrap: break-word;
    display: inline-block;
    text-overflow: inherit;
    white-space: initial;
    max-width: 780px;
  }
`;
export const StatusBadge = styled(Badge)`
  width: fit-content;
  min-width: 72px;
`;
