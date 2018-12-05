/**
 *
 * create by liangguodong on 2018/10/22
 *
 * @flow
 */
import * as React from 'react';
import Steps from './steps';
import Button from '../button/index';
import Step from './step';
import Widget from '../consts/index';
import Theme from '../theme/';
import styled from 'styled-components';

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Third-content',
  },
];
const StepContent = styled.div`
  margin-top: 30px;
  margin-left: 45px;
  border: 1px solid #ccc;
  height: 100px;
`;
const ButtonContainer = styled.div`
  margin-bottom: 30px;
`;

class StepsDemo extends React.Component<Object, Object> {
  constructor(props) {
    super(props);
    this.state = {
      currentStepNumber: 1,
    };
  }
  next() {
    const currentStepNumber =
      this.state.currentStepNumber > 3 ? 1 : this.state.currentStepNumber + 1;
    this.setState({ currentStepNumber });
  }
  pre() {
    const currentStepNumber =
      this.state.currentStepNumber <= 1 ? 3 : this.state.currentStepNumber - 1;
    this.setState({ currentStepNumber });
  }
  render() {
    const { currentStepNumber } = this.state;
    const matchCurrentNumber = currentStepNumber > 0 && currentStepNumber <= 3;
    const theCurrentStepNumber = matchCurrentNumber ? currentStepNumber : 1;
    const content = matchCurrentNumber ? steps[theCurrentStepNumber - 1].content : '';

    return (
      <div>
        <Theme config={view}>
          <ButtonContainer>
            <Button type="primary" onClick={() => this.pre()}>
              pre
            </Button>
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          </ButtonContainer>
          <Steps currentStepNumber={currentStepNumber} stepType={'simple'} size={'normal'}>
            {steps.map((item, i) => <Step title={item.title} />)}
          </Steps>
          <StepContent>{content}</StepContent>
        </Theme>
      </div>
    );
  }
}

const Wrapper = styled.div`
  text-align: left;
  margin: 50px;
`;
const VWrapper = styled.div`
  text-align: left;
  margin: 50px;
  display: inline-block;
`;
const view = {
  [Widget.Steps]: {
    width: 1000,
  },
  [Widget.Step]: {
    width: 350,
    height: 100,
  },
};
export default () => {
  return (
    <Theme config={view}>
      <div>
        <Wrapper>
          <p>带有描述</p>
          <Steps orientation="horizontal" size={'normal'}>
            <Step title="1111" description={'description111'} stepStatus="finish" />
            <Step title="222" description={'description2'} stepStatus="process" />
            <Step title="33" description={'description33'} stepStatus="next" />
            <Step title="444" description={'description444'} stepStatus="wait" />
            <Step title="555" description={'description5555'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>带有描述 居中显示</p>
          <Steps orientation="horizontal" size={'normal'} desAlign={'center'}>
            <Step title="1111" description={'description111'} stepStatus="finish" />
            <Step title="222" description={'description2'} stepStatus="process" />
            <Step title="33" description={'description33'} stepStatus="next" />
            <Step title="444" description={'description444'} stepStatus="wait" />
            <Step title="555" description={'description5555'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>简洁风格 size mini</p>
          <Steps orientation="horizontal" stepType={'simple'} size={'mini'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'mini'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>半扁平风格</p>
          <Steps orientation="horizontal" stepType={'flat'} size={'normal'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>

        <Wrapper>
          <p>icon</p>
          <Steps orientation="horizontal" stepType={'icon'} size={'mini'}>
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="finish" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="process" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="next" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="wait" />
            <Step icon={'lugia-icon-financial_cloud'} stepStatus="error" />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 虚线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" isDashed={true} />
            <Step title="33" stepStatus="next" isDashed={true} />
            <Step title="444" stepStatus="wait" isDashed={true} />
            <Step title="555" stepStatus="error" isDashed={true} />
          </Steps>
        </Wrapper>
        <Wrapper>
          <p>点状 实线</p>
          <Steps orientation="horizontal" stepType={'dot'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" />
            <Step title="33" stepStatus="next" />
            <Step title="444" stepStatus="wait" />
            <Step title="555" stepStatus="error" />
          </Steps>
        </Wrapper>
        <StepsDemo />
        <VWrapper>
          <p>简洁风格 size mini</p>

          <Steps orientation="vertical" stepType="simple" size="mini">
            <Step title="1111" stepStatus="finish" content="content1" />
            <Step title="222" stepStatus="process" content="content2" />
            <Step title="33" stepStatus="next" content="content3" />
            <Step title="444" stepStatus="wait" content="content4" />
            <Step title="555" stepStatus="error" content="content5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>简洁风格 size normal</p>

          <Steps orientation="vertical" stepType="simple" size="normal">
            <Step title="1111" stepStatus="finish" content="content1" />
            <Step title="222" stepStatus="process" content="content2" />
            <Step title="33" stepStatus="next" content="content3" />
            <Step title="444" stepStatus="wait" content="content4" />
            <Step title="555" stepStatus="error" content="content5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>带有描述</p>
          <Steps orientation="vertical" stepType="simple" size={'normal'}>
            <Step title="1111" description={'description111'} stepStatus="finish" />
            <Step title="222" description={'description2'} stepStatus="process" />
            <Step title="33" description={'description33'} stepStatus="next" />
            <Step title="444" description={'description444'} stepStatus="wait" />
            <Step title="555" description={'description5555'} stepStatus="error" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>半扁平风格 size normal</p>

          <Steps orientation="vertical" stepType="flat" size="normal">
            <Step title="1111" stepStatus="finish" content="content1" />
            <Step title="222" stepStatus="process" content="content2" />
            <Step title="33" stepStatus="next" content="content3" />
            <Step title="444" stepStatus="wait" content="content4" />
            <Step title="555" stepStatus="error" content="content5" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>icon</p>
          <Steps orientation="vertical" stepType={'icon'} size={'mini'}>
            <Step icon={'lugia-icon-financial_cloud'} title="1111" stepStatus="finish" />
            <Step icon={'lugia-icon-financial_cloud'} title="222" stepStatus="process" />
            <Step icon={'lugia-icon-financial_cloud'} title="333" stepStatus="next" />
            <Step icon={'lugia-icon-financial_cloud'} title="444" stepStatus="wait" />
            <Step icon={'lugia-icon-financial_cloud'} title="555" stepStatus="error" />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状 虚线 size normal</p>
          <Steps orientation="vertical" stepType={'dot'}>
            <Step title="1111" stepStatus="finish" />
            <Step title="222" stepStatus="process" isDashed={true} />
            <Step title="33" stepStatus="next" isDashed={true} />
            <Step title="444" stepStatus="wait" isDashed={true} />
            <Step title="555" stepStatus="error" isDashed={true} />
          </Steps>
        </VWrapper>
        <VWrapper>
          <p>点状风格 size normal</p>
          <Steps orientation="vertical" stepType="dot" size="normal">
            <Step title="1111" stepStatus="finish" content="content1" />
            <Step title="222" stepStatus="process" content="content2" />
            <Step title="33" stepStatus="next" content="content3" />
            <Step title="444" stepStatus="wait" content="content4" />
            <Step title="555" stepStatus="error" content="content5" />
          </Steps>
        </VWrapper>
      </div>
    </Theme>
  );
};