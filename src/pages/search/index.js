/*
 * @Author: cuzofu
 * @Date: 2018-12-18
 * @Last Modified by: cuzofu
 * @Last Modified time: 2018-12-18
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { SearchBar, WhiteSpace, NavBar, Icon, List, Badge, Tag } from 'antd-mobile';

import styles from './index.less';

@connect(({ search }) => ({
  search,
}))
class Search extends PureComponent {

  state = {
    searchPlaceholder: '请输入企业名称查询',
    searchHistory: ['湖北', '广盛', '宜昌', '建设'],
    searchCategory: {
      cioType: ['施工', '监理', '勘察', '房地产开发', '检测', '造价咨询', '招标代理', '施工图审', '园林绿化', '物业管理'],
      credit: ['A级', 'B级', 'C级', '100分以上', '80~99分', '80分以下'],
    },
  };

  componentDidMount() {
    console.log(this.props);
    this.autoFocusInst.focus();
  }

  onBadgeClick = (searchCategory) => {
    this.autoFocusInst.focus();
    console.log(searchCategory);
    this.setState({
      searchPlaceholder: `搜索${searchCategory}企业`,
    });
  };

  render() {

    const {
      searchPlaceholder,
      searchHistory,
      searchCategory: {
        cioType,
        credit
      },
    } = this.state;
    console.log(searchPlaceholder);

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          leftContent={<span style={{width: 100}}>企业诚信查询</span>}
          onLeftClick={() => console.log('onLeftClick')}
        />
        <SearchBar placeholder={searchPlaceholder} ref={ref => {this.autoFocusInst = ref}} />
        <List renderHeader="最近搜索">
          <List.Item wrap className={styles.searchTag}>
            {
              searchHistory && searchHistory.map(t => (
                <Tag key={t} closable data-seed="logId" onClose={(e) => console.log(e)}>{t}</Tag>
              ))
            }
          </List.Item>
        </List>
        <WhiteSpace size="sm" style={{backgroundColor: '#efeff4'}} />
        <List renderHeader={() => '从业企业类型'}>
          <List.Item wrap>
            {
              cioType && cioType.map(t => (
                <Badge key={t} text={t} onClick={() => this.onBadgeClick(t)} className={styles.searchKeyWord} />
              ))
            }
          </List.Item>
        </List>
        <WhiteSpace size="xs" style={{backgroundColor: '#efeff4'}} />
        <List renderHeader={() => '诚信等级'}>
          <List.Item wrap>
            {
              credit && credit.map(t => (
                <Badge key={t} text={t} onClick={() => this.onBadgeClick(t)} className={styles.searchKeyWord} />
              ))
            }
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Search;
