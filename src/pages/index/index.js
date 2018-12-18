/*
 * @Author: Jan-superman
 * @Date: 2018-09-27 20:38:37
 * @Last Modified by: Jan-superman
 * @Last Modified time: 2018-11-07 23:33:55
 */

import React, { PureComponent } from 'react';
import { Grid } from 'antd-mobile';

import styles from './index.less';

class Index extends PureComponent {
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
                url: 'rank',
              }
            ]}
            activeStyle={false}
            columnNum={2}
          />
        </div>
      </div>
    );
  }
}

export default Index;
