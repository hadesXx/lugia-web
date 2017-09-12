//@flow

import * as React from 'react';
import chai from 'chai';
import Menu from '../';
import 'jest-styled-components';
import { mount, render, } from 'enzyme';
import renderer from 'react-test-renderer';
import Theme from '../../theme';
import * as Widget from '../../consts/Widget';

const { MenuItem, } = Menu;
const { expect: exp, } = chai;

describe('Menu', () => {


  it('DropMenu single selectedKeys 2', () => {
    expect(renderer.create(<Menu selectedKeys={['2', '3',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>).toJSON()).toMatchSnapshot();
  });
  it('DropMenu width: 500px height: 333px', () => {
    expect(renderer.create(<Theme config={{ [Widget.Menu]: { width: 550, height: 333, }, }}><Menu>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu></Theme>).toJSON()).toMatchSnapshot();
  });

  it('DropMenu mutliple selectedKeys 2', () => {
    expect(renderer.create((<Menu selectedKeys={['3', '4',]} mutliple>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key="4">d</MenuItem>
    </Menu>)).toJSON()).toMatchSnapshot();
  });

  it('DropMenu mutliple onClick', () => {
    const checkedKey = '4';
    const dom = mount(<Menu mutliple>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    dom.find(MenuItem).forEach(node => {
      exp(node.prop('checked')).to.be.false;
    });
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    dom.find(MenuItem).forEach(node => {
      exp(node.prop('checked')).to.be.true;
    });
  });
  it('DropMenu mutliple onClick selectedKeys: 1 2', () => {
    const checkedKey = '4';
    const dom = mount(<Menu mutliple selectedKeys={['1', '2',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.false;
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.true;
  });

  it('DropMenu single onClick selectedKeys: 1 2', () => {
    const checkedKey = '4';
    const dom = mount(<Menu selectedKeys={['1', '2',]}>
      <MenuItem key="1">a</MenuItem>
      <MenuItem key="2">b</MenuItem>
      <MenuItem key="3">c</MenuItem>
      <MenuItem key={checkedKey} checked>d</MenuItem>
    </Menu>);
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.true;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.false;
    dom.find(MenuItem).forEach(node => node.simulate('click'));
    exp(dom.find(MenuItem).at(0).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(1).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(2).prop('checked')).to.be.false;
    exp(dom.find(MenuItem).at(3).prop('checked')).to.be.true;
  });

  it('compute see count', () => {
    const dom = render(<Menu>
      <MenuItem key="1">1</MenuItem>
      <MenuItem key="2">2</MenuItem>
      <MenuItem key="3">3</MenuItem>
      <MenuItem key="4" checked>4</MenuItem>
      <MenuItem key="5" checked>5</MenuItem>
      <MenuItem key="6" checked>6</MenuItem>
      <MenuItem key="7" checked>7</MenuItem>
      <MenuItem key="8" checked>8</MenuItem>
      <MenuItem key="9" checked>9</MenuItem>
      <MenuItem key="11" checked>10</MenuItem>
      <MenuItem key="12" checked>11</MenuItem>
      <MenuItem key="13" checked>12</MenuItem>
      <MenuItem key="13" checked>13</MenuItem>
    </Menu>);

    exp(dom.find('li').length).to.be.equal(8);
  });
});
