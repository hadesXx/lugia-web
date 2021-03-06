/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import RcTable from 'rc-table';
import 'rc-table/assets/index.css';
import './style/lugia-table.css';
import type { TableProps, TableState } from '../css/table';

export default ThemeProvider(
  class extends React.Component<TableProps, TableState> {
    render() {
      const {
        children,
        columns,
        data,
        showHeader = true,
        tableStyle = 'bordered',
        getTheme,
      } = this.props;
      const themeWidth = getTheme().width;
      const styles = {};
      if (themeWidth) {
        styles.width = themeWidth;
      }
      if (children) {
        return (
          <div className={this.getClass(tableStyle)} style={{ ...styles }}>
            <RcTable
              {...this.props}
              data={data}
              showHeader={showHeader}
              rowClassName={(record, i) => `row-${i}`}
              className="table"
            >
              {children}
            </RcTable>
          </div>
        );
      }
      return (
        <div className={this.getClass(tableStyle)} style={{ ...styles }}>
          <RcTable {...this.props} columns={columns} data={data} showHeader={showHeader} />
        </div>
      );
    }
    getClass = (tableStyle: 'zebraStripe' | 'linear' | 'bordered'): string => {
      return `lugia-table-${tableStyle}`;
    };
  },
  Widget.Table
);
