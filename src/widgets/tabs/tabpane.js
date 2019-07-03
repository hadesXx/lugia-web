/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import { TabType, TabPositionType, CardMarginRight } from '../css/tabs';
import Icon from '../icon';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes, getBorder } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';

import { addMouseEvent } from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';

const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

const BaseTabHoc = CSSComponent({
  tag: 'div',
  className: 'DefaultTabPan',
  normal: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['margin'],
      ['padding'],
      ['font'],
      ['opacity'],
    ],
    getCSS: (theme: Object, themeProps: Object) => {
      const { color, background } = theme;
      const {
        propsConfig: { isSelect, tabType, tabPosition },
      } = themeProps;
      let display = 'inline-block';
      let textAlign = 'text-align: center';
      let position = '';
      let border = '';
      if (isVertical(tabPosition)) {
        display = 'block';
        if (tabPosition === 'left') {
          textAlign = 'text-align: right';
        } else {
          textAlign = 'text-align: left';
        }
      }
      if (isSelect && tabType === 'line') {
        let cssString = css`
          width: 100%;
          height: 2px;
          left: 50%;
          animation: ${addWidth} 0.2s linear forwards;
          transform: translateX(-50%);
        `;
        let pos = tabPosition === 'top' ? 'bottom: -1px;' : 'top: -1px;';
        if (isVertical(tabPosition)) {
          pos = tabPosition === 'left' ? 'right: -21px;' : 'left: -21px;';
          cssString = css`
            width: 2px;
            height: 100%;
            top: 50%;
            animation: ${addHeight} 0.2s linear forwards;
            transform: translateY(-50%);
          `;
        }
        return css`
          display: ${display};
          ${textAlign}
          & > div::before {
            content: '';
            background: ${color || themeColor};
            border-radius: 2px;
            position: absolute;
            ${pos}
            ${cssString}
          }
        `;
      }
      if (tabType === 'card') {
        position = 'bottom: -1px;';
      }
      if (isSelect && tabType === 'card') {
        border = `border-bottom: 1px solid ${background ? background.color : '#fff'};`;
      }
      return css`
        display: ${display};
        ${textAlign}
        ${position}
        ${border}
      `;
    },
  },
  hover: {
    selectNames: [['color'], ['background'], ['border'], ['font'], ['opacity']],
    defaultTheme: {
      color: themeColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      let cssString = `
        & > span {
          opacity: 1;
        }
         &  > div {
          background: 'red';
        }
       
      `;
      if (tabType === 'card') {
        cssString += ` & > div {
          transition: all 0.3s linear;
          transform: translateX(-3px);
        }`;
      }
      return css`
        ${cssString}
      `;
    },
  },
  disabled: {
    selectNames: [],
    defaultTheme: {
      cursor: 'not-allowed',
      color: '#999',
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { color } = theme;
      return css`
        color: ${color || '#999'};

        & > div.lineTitle::before {
          content: '';
          width: 0;
          height: 0;
        }
        & > div.cardTitle {
          transition: none;
          transform: none;
        }
      `;
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    padding: 0 20px;
  `,
});

const BaseTab = ThemeHoc(BaseTabHoc, 'BaseTab', { hover: true, active: false });

BaseTab.displayName = 'Tabpane';

const SelectTabHoc = CSSComponent({
  extend: BaseTabHoc,
  className: 'SelectTabPan',
});

const SelectTab = ThemeHoc(SelectTabHoc, 'SelectTab', { hover: true, active: false });

const addWidth = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;

const addHeight = keyframes`
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
`;

const Title = CSSComponent({
  tag: 'div',
  className: 'TitleLine',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 42,
      lineHeight: 42,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '3.4rem',
      };
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}` : '3.4rem',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    &:focus {
      color: ${themeColor};
    }
  `,
});

const CardTitle = CSSComponent({
  tag: 'div',
  className: 'TitleCard',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 35,
      lineHeight: 35,
    },
    getStyle: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}px` : '34px',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
  },
  css: css`
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    &:focus {
      color: ${themeColor};
    }
  `,
});

const TabIcon = CSSComponent({
  extend: Icon,
  className: 'TabIcon',
  css: css`
    vertical-align: middle !important;
    display: inline-block;
  `,
  normal: {
    selectNames: [['color'], ['margin']],
    defaultTheme: {
      margin: {
        left: 4,
        right: 4,
      },
    },
  },
  hover: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableColor,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      return 'cursor: not-allowed';
    },
  },
});

const ClearButtonContainer = CSSComponent({
  tag: 'span',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    opacity: 0;
    color: #999;
  `,
  normal: {
    selectNames: [],
    getCSS: (a, themeProps) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      if (tabType !== 'card') {
        return 'opacity: 1;margin-left:10px;';
      }
    },
  },
  hover: {
    selectNames: [],
  },

  disabled: {
    selectNames: [],
  },
});

const ClearIcon = ThemeHoc(
  CSSComponent({
    extend: Icon,
    className: 'ClearIcon',
    css: css`
      font-size: 1rem;
    `,
    normal: {
      selectNames: [['color']],
    },
    hover: {
      selectNames: [['color']],
      defaultTheme: {
        color: mediumGreyColor,
      },
    },
    disabled: {
      selectNames: [['cursor']],
      getCSS: (theme: Object, themeProps: Object) => {
        return 'cursor: not-allowed';
      },
    },
  }),
  'ClearIcon',
  { hover: true, active: false }
);

ClearIcon.displayName = 'deleteIcon';

type TabpaneState = {
  iconClass: string,
};

type TabpaneProps = {
  title: string,
  onDelete?: Function,
  icon?: string,
  suffixIcon?: string,
  tabType?: TabType,
  tabPosition?: TabPositionType,
  index: number,
  isSelect?: boolean,
  disabled?: boolean,
  showDeleteBtn?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  getTabpaneWidthOrHeight?: Function,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static defaultProps = {};
  static displayName = Widget.Tabpane;
  tabpane: any;

  constructor(props: TabpaneProps) {
    super(props);
    this.tabpane = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: TabpaneProps, state: TabpaneState) {
    if (!state) {
      return {
        iconClass: 'lugia-icon-reminder_close',
      };
    }
  }

  render() {
    const { title, tabType, tabPosition, isSelect, icon, suffixIcon, disabled } = this.props;

    const { TargetTab, theme, viewClass, titleThemeProps } = this.getHTabPaneThemeProps(
      tabType,
      isSelect
    );
    // console.log('nextProps', title,isSelect,viewClass,theme);
    // const titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan');
    let Target = (
      <TargetTab
        propsConfig={{ tabType, tabPosition, isSelect }}
        theme={theme}
        viewClass={viewClass}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        tabPosition={tabPosition}
        ref={this.tabpane}
        {...addMouseEvent(this, { enter: this.onMouseEnter, leave: this.onMouseLeave })}
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
      >
        {tabType === 'line' ? (
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
            {this.getTabIconContainer(suffixIcon, titleThemeProps)}
          </Title>
        ) : (
          <CardTitle
            className={'cardTitle'}
            themeProps={titleThemeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
            {this.getTabIconContainer(suffixIcon, titleThemeProps)}
          </CardTitle>
        )}

        {this.getClearButton()}
      </TargetTab>
    );
    if (matchType(tabType, 'line') && isVertical(tabPosition)) {
      Target = (
        <TargetTab
          propsConfig={{ tabType, tabPosition, isSelect }}
          theme={theme}
          viewClass={viewClass}
          disabled={disabled}
          tabType={tabType}
          onClick={this.handleClick}
          tabPosition={tabPosition}
          isSelect={isSelect}
          ref={this.tabpane}
          {...addMouseEvent(this, { enter: this.onMouseEnter, leave: this.onMouseLeave })}
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
        >
          <Title
            className={'lineTitle'}
            themeProps={titleThemeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, titleThemeProps)}
            {title}
          </Title>
        </TargetTab>
      );
    }
    return Target;
  }

  getHTabPaneThemeProps(tabType: ?string, isSelect: ?boolean) {
    const { viewClass: defaultViewClass, theme: defaultTheme } = this.props.getPartOfThemeHocProps(
      'DefaultTabPan'
    );
    const { viewClass: selectViewClass, theme: selectTheme } = this.props.getPartOfThemeHocProps(
      'SelectTabPan'
    );
    const titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan');
    const baseDefaultTab = BaseTab;
    let baseDefaultTheme = defaultTheme;
    const baseDefaultViewClass = defaultViewClass;
    let baseSelectTheme = deepMerge(
      { [selectViewClass]: defaultTheme[defaultViewClass] },
      selectTheme
    );
    switch (tabType) {
      case 'card':
        const targetObj = {
          [baseDefaultViewClass]: {
            normal: {
              border: getBorder(
                { color: '#e8e8e8', width: 1, style: 'solid' },
                { directions: ['l', 'r', 't'], radius: 4, radiusDirections: ['tl', 'tr'] }
              ),
              margin: {
                left: 4,
                right: 4,
              },
              background: {
                color: '#e8e8e8',
              },
            },
          },
        };
        baseDefaultTheme = deepMerge(targetObj, baseDefaultTheme);
        const cardSelectObj = {
          [selectViewClass]: {
            normal: {
              margin: {
                left: 4,
                right: 4,
              },
              border: getBorder(
                { color: '#e8e8e8', width: 1, style: 'solid' },
                { directions: ['l', 'r', 't'], radius: 4, radiusDirections: ['tl', 'tr'] }
              ),
            },
          },
        };
        baseSelectTheme = deepMerge(cardSelectObj, baseSelectTheme);
        break;
      case 'window':
        const windowSelectObj = {
          [selectViewClass]: {
            normal: {
              border: getBorder({ border: 'none' }, { radius: 4, radiusDirections: ['tl', 'tr'] }),
              background: {
                color: '#fff',
              },
            },
          },
        };
        baseSelectTheme = deepMerge(windowSelectObj, baseSelectTheme);
        break;
      default:
        break;
    }
    const TargetTab = isSelect ? SelectTab : baseDefaultTab;
    const theme = isSelect ? baseSelectTheme : baseDefaultTheme;
    const viewClass = isSelect ? selectViewClass : baseDefaultViewClass;
    return { TargetTab, theme, viewClass, titleThemeProps };
  }

  componentDidMount() {}

  handleClick = () => {
    const { index, onClick, disabled } = this.props;
    if (!disabled) onClick && onClick(index);
  };

  getTabIconContainer(icon: ?string, themeProps?: Object = {}) {
    return icon ? this.getIcon(icon, themeProps) : null;
  }
  getIcon(icon: string, themeProps: Object) {
    const { isSelect, disabled } = this.props;
    if (ObjectUtils.isString(icon)) {
      // const { viewClass, theme } = themeProps;
      return (
        <TabIcon themeProps={themeProps} isSelect={isSelect} iconClass={icon} disabled={disabled} />
      );
    }
    return icon;
  }
  onDeleteClick = () => {
    const { onDelete, index } = this.props;
    onDelete && onDelete(index);
  };
  getClearButton() {
    const { tabType, themeProps, disabled, showDeleteBtn } = this.props;
    const { iconClass } = this.state;
    const cBtnthemeProps = deepMerge({ propsConfig: { tabType } }, themeProps);
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('DefaultTabPan');
    if (!matchType(tabType, 'line') && showDeleteBtn) {
      return (
        <ClearButtonContainer
          themeProps={cBtnthemeProps}
          onMouseEnter={this.clearButtonMouseEnter}
          onMouseLeave={this.clearButtonMouseLeave}
          onClick={this.onDeleteClick}
          tabType={tabType}
        >
          <ClearIcon
            theme={theme}
            viewClass={viewClass}
            iconClass={iconClass}
            disabled={disabled}
          />
        </ClearButtonContainer>
      );
    }
    return null;
  }
  clearButtonMouseEnter = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close_circle' });
  };
  clearButtonMouseLeave = () => {
    this.setState({ iconClass: 'lugia-icon-reminder_close' });
  };
  onMouseEnter = (e: Object) => {
    const { onMouseEnter, index } = this.props;
    onMouseEnter && onMouseEnter(index);
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, index } = this.props;
    onMouseLeave && onMouseLeave(index);
  };
}
//
const TabPanHoc = ThemeHoc(KeyBoardEventAdaptor(Tabpane), Widget.Tabpane, {
  hover: true,
  active: false,
});
export default TabPanHoc;
