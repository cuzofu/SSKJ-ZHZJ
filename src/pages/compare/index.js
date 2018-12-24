import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Icon, Card, Flex, Button, NavBar} from 'antd-mobile';

import Ellipsis from "@/components/Ellipsis";
import styles from './index.less';

@connect(({compare}) => ({
  compare,
}))
class Compare extends PureComponent {

  state = {
  };

  render() {

    const {
      compare: {
        orgs
      }
    } = this.props;

    console.log(orgs);
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          leftContent={<span style={{width: 100}}>比一比</span>}
          onLeftClick={() => router.goBack()}
        />

        <Flex>
          <Flex.Item style={{margin: 10}}>
            <div style={{position: 'relative'}}>
              <div onClick={() => this.removeCompareOrg(orgs[0])} style={{position: 'absolute', top: -11, right: -11}}><Icon type="cross" /></div>
              <Ellipsis lines={2}>{orgs[0].orgName}</Ellipsis>
            </div>
          </Flex.Item>
          <div className={styles.compareButton}>VS</div>
          <Flex.Item style={{margin: 10}}>
            <div style={{position: 'relative'}}>
              <div onClick={() => this.removeCompareOrg(orgs[1])} style={{position: 'absolute', top: -11, right: -11}}><Icon type="cross" /></div>
              <Ellipsis lines={2}>{orgs[1].orgName}</Ellipsis>
            </div>
          </Flex.Item>
        </Flex>
      </div>
    );
  };
}

export default Compare;
