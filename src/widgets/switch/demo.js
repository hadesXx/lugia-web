/**
 *
 * create by ZhangBoPing
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import React, { Component } from 'react';
import Switch from './index';
import Icon from '../icon/index';
import Widgets from '../consts/index';
import Theme from '../theme/index';

type TypeState = {
  load?: boolean,
  value: boolean,
};
export default class Sw extends Component<any, TypeState> {
  constructor() {
    super();
    this.state = {
      load: false,
      value: true,
    };
  }
  handleClick() {
    this.setState({
      load: !this.state.load,
    });
  }
  change = (item: Object) => {
    const { newValue } = item;
    this.setState({ value: newValue });
  };
  render() {
    return (
      <div className="demo-switch" style={{ margin: '20px' }}>
        <section style={{ marginBottom: '20px' }}>
          <h3>normal</h3>
          <Theme
            config={{
              [Widgets.Switch]: {
                normal: {
                  width: 200,
                  height: 20,
                },
                children: {
                  SwitchButton: {
                    normal: {
                      width: 50,
                      height: 60,
                      background: {
                        backgroundColor: 'red',
                      },
                    },
                    active: {
                      width: 54,
                      height: 64,
                    },
                  },
                },
                // hover:{
                //   width:300,
                //   height:20
                // },
                // clicked:{
                //   width:400,
                //   height:20
                // }
              },
            }}
          >
            <Switch />
          </Theme>
        </section>
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>size=‘small’</h3>*/}
        {/*<Switch size={'small'} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data.length=3</h3>*/}
        {/*<Switch data={[{ text: '年' }, { text: '月' }, { text: '日' }]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data.length=2 isInverse defaultValue</h3>*/}
        {/*<Switch data={[{ text: '开' }, { text: '关' }]} isInverse defaultValue />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data `data.length=1 isInverse`</h3>*/}
        {/*<Switch data={[{ text: '开' }]} isInverse />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data `data.length=0`</h3>*/}
        {/*<Switch data={[]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=null</h3>*/}
        {/*<Switch data={[null]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=null,data[1]=null</h3>*/}
        {/*<Switch data={[null, null]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=undefined</h3>*/}
        {/*<Switch data={[undefined]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=undefined,data[1]=undefined</h3>*/}
        {/*<Switch data={[undefined, undefined]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=null,data[1]=undefined</h3>*/}
        {/*<Switch data={[null, undefined]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data[0]=null,data[1]={'text:月'}</h3>*/}
        {/*<Switch data={[null, { text: '月' }]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>displayFiled</h3>*/}
        {/*<Switch*/}
        {/*displayFiled={'left'}*/}
        {/*data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]}*/}
        {/*/>*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>no displayFiled, have text</h3>*/}
        {/*<Switch*/}
        {/*data={[{ text: '日', left: '年', name: 'ppp' }, { text: '时', left: '月', name: 'ww' }]}*/}
        {/*/>*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>no displayFiled no text</h3>*/}
        {/*<Switch data={[{ left: '年', name: 'ppp' }, { left: '月', name: 'ww' }]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>isInverse</h3>*/}
        {/*<Switch isInverse />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>data `value`</h3>*/}
        {/*<Switch value />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>defaultValue</h3>*/}
        {/*<Switch defaultValue />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>defaultValue && value</h3>*/}
        {/*<Switch defaultValue={false} value />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>autoFocus</h3>*/}
        {/*<Switch autoFocus onChange={this.change} data={[{ text: '年' }, { text: '月' }]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>autoFocus && value</h3>*/}
        {/*<Switch autoFocus onChange={this.change} value data={[{ text: '年' }, { text: '月' }]} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>onChange</h3>*/}
        {/*<Switch data={[{ text: '年' }, { text: '月' }]} onChange={this.change} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>onChange value false</h3>*/}
        {/*<Switch data={[{ text: '年' }, { text: '月' }]} value={false} onChange={this.change} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>onChange value false</h3>*/}
        {/*<Switch*/}
        {/*data={[*/}
        {/*{ text: <Icon className={'lugia-icon-reminder_check'} /> },*/}
        {/*{ text: <Icon className={'lugia-icon-reminder_close'} /> },*/}
        {/*]}*/}
        {/*value={this.state.value}*/}
        {/*onChange={this.change}*/}
        {/*/>*/}
        {/*</section>*/}

        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>loading</h3>*/}
        {/*<Switch loading />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>'loading=delay:3000'</h3>*/}
        {/*<Switch loading={{ delay: 3000 }} />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>disabled</h3>*/}
        {/*<Switch disabled />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>disabled loading</h3>*/}
        {/*<Switch disabled loading />*/}
        {/*</section>*/}
        {/*<section style={{ marginBottom: '20px' }}>*/}
        {/*<h3>disabled loading=delay:3000</h3>*/}
        {/*<Switch disabled loading={{ delay: 3000 }} />*/}
        {/*</section>*/}
      </div>
    );
  }
}
