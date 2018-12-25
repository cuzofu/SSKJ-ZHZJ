import React, {PureComponent,Fragment} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import classnames from 'classnames';
import {Icon, Flex, List, NavBar} from 'antd-mobile';

import Ellipsis from "@/components/Ellipsis";
import styles from './index.less';

@connect(({compare}) => ({
  compare,
}))
class Compare extends PureComponent {

  state = {
  };

  toSearch = () => {
    router.push('/search')
  };

  render() {

    const {
      compare: {
        orgs
      }
    } = this.props;

    return (
      <Fragment>
        <div style={{position: 'relative'}}>

          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => router.goBack()}
            rightContent={<Icon type="search" onClick={this.toSearch} />}
          >
            比一比
          </NavBar>

          <Flex className={styles.compareFlex}>
            <Flex.Item className={styles.compareFlexLeft}>
              <div className={styles.compareDiv}>
                <div onClick={() => this.removeCompareOrg(orgs[0])} style={{position: 'absolute', top: -11, right: -11}}><Icon type="cross" /></div>
                <Ellipsis lines={2}>{orgs[0].orgName}</Ellipsis>
              </div>
            </Flex.Item>
            <div className={styles.compareVS}>VS</div>
            <Flex.Item className={styles.compareFlexRight}>
              <div className={styles.compareDiv}>
                <div onClick={() => this.removeCompareOrg(orgs[1])} style={{position: 'absolute', top: -11, right: -11}}><Icon type="cross" /></div>
                <Ellipsis lines={2}>{orgs[1].orgName}</Ellipsis>
              </div>
            </Flex.Item>
          </Flex>

        </div>
        <div style={{overflowY: 'scroll', height: window.innerHeight - 125}}>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>企业诚信总分</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>100</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>VS</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>123</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>专项诚信总分</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>100</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>施工总承包_建筑工程_壹级</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>123</span>
              </Flex.Item>
            </Flex>
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>100</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>施工总承包_市政公用工程_壹</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>123</span>
              </Flex.Item>
            </Flex>
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>100</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>专业承包_起重设备安装工程_壹级</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>123</span>
              </Flex.Item>
            </Flex>
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>100</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>公路路面工程_贰级</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>123</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>获奖级别</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>1</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>国家级</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>-</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>工程数量</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>22</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>VS</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>10</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>获奖次数</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>5</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>VS</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>7</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>良好行为加分</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>8</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>VS</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>9</span>
              </Flex.Item>
            </Flex>
          </List>

          <List
            className={styles.compareList}
            renderHeader={() => <div style={{textAlign: 'center'}}>不良行为扣分</div>}
          >
            <Flex style={{minHeight: 50}}>
              <Flex.Item className={classnames(styles.compareItem, styles.compareRed)}>
                <span>6</span>
              </Flex.Item>
              <Flex.Item className={styles.compareItem}>
                <span>VS</span>
              </Flex.Item>
              <Flex.Item className={classnames(styles.compareItem)}>
                <span>3</span>
              </Flex.Item>
            </Flex>
          </List>

        </div>
      </Fragment>
    );
  };
}

export default Compare;
