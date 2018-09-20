/**
 * Col
 * create by guorg
 * @flow
 */
import styled from 'styled-components';

const share = 24;
const width = 100 / share;

type BasicType = {
  span: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number,
  gutter?: number,
};
export type ColProps = {
  children?: any,
  onMouseEnter?: Function,
  onMouseOut?: Function,
  onMouseOver?: Function,
  scrrenSize?: string,
} & BasicType;
export type ColState = {};
type ColCSSProps = BasicType;

const getSpanCSS = (props: ColCSSProps): string => {
  const { span = 1 } = props;
  return `
      width: ${width * span}%;
    `;
};
const getOffsetCSS = (props: ColCSSProps): string => {
  const { offset = 0 } = props;
  return `
      margin-left: ${width * offset}%;
    `;
};
const getPullAndPushCSS = (props: ColCSSProps) => {
  const { push = 0, pull = 0 } = props;
  if (push) {
    return `
      left: ${width * push}%;
    `;
  }
  if (pull) {
    return `
      right: ${width * pull}%;
    `;
  }
};
const getOrderCSS = (props: ColCSSProps) => {
  const { order = 0 } = props;
  if (order) {
    return `
      order: ${order};
    `;
  }
};
const getGutterCSS = (props: ColCSSProps) => {
  const { gutter } = props;
  if (gutter && typeof gutter === 'number') {
    const result = gutter / 2;
    return `
      padding-left: ${result}px;
      padding-right: ${result}px;
    `;
  }
};

export const ColWrap = styled.div`
  display: block;
  box-sizing: border-box;
  float: left;
  position: relative;
  ${getSpanCSS}
  ${getOffsetCSS}
  ${getPullAndPushCSS}
  ${getOrderCSS}
  ${getGutterCSS}
`;
