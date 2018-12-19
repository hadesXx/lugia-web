/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import Menu from '../menu';
import type { TransferMenuProps, TransferMenuState } from '../css/transfer-menu';
import { NoData } from '../css/transfer';
import {
  getMapData,
  getMenuDataByBlackList,
  getWhiteListDataAndCancelItem,
  getSearchData,
} from './menu-utils';

export default class TransferMenu extends React.Component<TransferMenuProps, TransferMenuState> {
  constructor(props: TransferMenuProps) {
    super(props);
    const { data = [], valueField } = props;
    const mapData = getMapData(data, valueField);

    this.state = {
      mapData,
      cancelItem: [],
      menuData: [],
    };
  }

  static getDerivedStateFromProps(props: TransferMenuProps, state: TransferMenuState) {
    const {
      data = [],
      blackList,
      whiteList,
      displayField = 'text',
      valueField = 'value',
      displayValue = [],
      direction,
      query,
      filterOption = (value, option) => {
        return option[valueField].indexOf(value) > -1;
      },
    } = props;
    if (direction === 'Source') {
      const menuWhiteListData = getMenuDataByBlackList(data, valueField, blackList);
      return {
        menuData: getSearchData(menuWhiteListData, query, filterOption),
      };
    }
    const { mapData = {} } = state;
    const { whiteListData } = getWhiteListDataAndCancelItem(
      mapData,
      displayValue,
      valueField,
      displayField,
      whiteList
    );

    return {
      menuData: getSearchData(whiteListData, query, filterOption),
    };
  }

  render() {
    const { menuData } = this.state;
    const { displayField, valueField, selectedKeys, query, direction } = this.props;
    if (query && !menuData.length) {
      return <NoData direction={direction}>无匹配数据</NoData>;
    }
    return (
      <Menu
        checkedCSS={'checkbox'}
        mutliple={true}
        data={menuData}
        selectedKeys={selectedKeys}
        onClick={this.onClick}
        displayField={displayField}
        valueField={valueField}
      />
    );
  }

  onClick = (e: Event, keys: Object, item: Object) => {
    const { onSelect } = this.props;
    const { selectedKeys } = keys;
    onSelect && onSelect(selectedKeys);
  };
}
