/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:37
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Grid } from 'antd-mobile';

import styles from './index.less';

class Index extends PureComponent {

  handleGridClick = (el) => {
    console.log(el);
    router.push(el.link);
  };

  render() {
    const { route } = this.props;
    return (
      <div className={styles.index}>
        <div className={styles.test}>
          <h2>{route.title}</h2>
          <Grid
            data={[
              {
                icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                text: '搜索',
                action: 'search',
                link: '/search',
              }
            ]}
            activeStyle={false}
            columnNum={2}
            onClick={this.handleGridClick}
          />
        </div>
      </div>
    );
  }
}

export default Index;
