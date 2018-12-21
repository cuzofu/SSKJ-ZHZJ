/*
 * @Author: cuzofu
 * @Date: 2018-12-18
 * @Last Modified by: cuzofu
 * @Last Modified time: 2018-12-18
 */

import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {SearchBar, WhiteSpace, WingBlank, NavBar, Icon, List, Badge, Tag, Card, Checkbox, Flex, Button} from 'antd-mobile';

import styles from './index.less';
import Ellipsis from "@/components/Ellipsis";

const CompareButton = ({ content, type, disabled, ...restProps }) => (
  <div className={styles.compareButton} {...restProps}>
    <Button type={type} disabled={disabled} inline size="small">{content}</Button>
  </div>
);

@connect(({search}) => ({
  search,
}))
class Search extends PureComponent {

  state = {
    searchPlaceholder: '请输入企业名称查询',
    showHistory: false,
    searchHistory: [],
    searchCategory: {
      cioType: ['施工', '监理', '勘察', '房地产开发', '检测', '造价咨询', '招标代理', '施工图审', '园林绿化', '物业管理'],
      credit: ['A级', 'B级', 'C级', '100分以上', '80~99分', '80分以下'],
    },
    showSearchResult: false,
    compareOrg: [],
    orgList: [
      {
        orgId: '1',
        orgName: '升思科技股份有限公司升思科技股份有限公司升思科技股份有限公司升思科技股份有限公司',
        creditLevel: 'A级',
        creditScore: '360分',
        compare: false,
      },
      {
        orgId: '2',
        orgName: '升思科技股份有限公司',
        creditLevel: 'B级',
        creditScore: '88分',
        compare: false,
      },
      {
        orgId: '3',
        orgName: '升思科技股份有限公司',
        creditLevel: 'C级',
        creditScore: '55分',
        compare: false,
      },
      {
        orgId: '4',
        orgName: '升思科技股份有限公司',
        creditLevel: 'A级',
        creditScore: '120分',
        compare: false,
      },
    ],
};

  componentDidMount() {
    this.searchBar.focus();
  }

  onSearchBarBlur = () => {
  };

  onSearchBarFocus = () => {
    clearInterval(this.interval);
  };

  handleCloseSearchHistory = (key) => {
    let { searchHistory } = this.state;
    if (key) {
      const index = searchHistory.indexOf(key);
      searchHistory.splice(index, 1);
    } else {
      searchHistory = [];
    }
    this.setState({
      searchHistory,
      showHistory: searchHistory.length > 0,
    });
    this.renderContent();
  };

  onBadgeClick = (searchCategory) => {
    this.setState({
      searchPlaceholder: `搜索${searchCategory}企业`,
      searchKeyword: searchCategory,
      showSearchResult: true,
    });
    this.handleSearch(searchCategory);
    this.searchBar.focus();
  };

  handleChange = (value) => {
    this.setState({
      searchKeyword: value,
      showSearchResult: value !== '',
    });
  };

  handleSearch = (value) => {
    const {
      searchHistory,
    } = this.state;

    if (searchHistory.indexOf(value) < 0) {
      searchHistory.push(value);
      this.setState({
        searchHistory,
        showHistory: searchHistory.length > 0,
      });
    }
  };

  handleCancel = () => {
    const {
      orgList,
    } = this.state;
    this.setState({
      compareOrg: [],
      orgList: orgList.map(o => ({
        ...o,
        compare: false,
      }))
    })
  };

  renderContent = () => {
    const {
      showSearchResult,
    } = this.state;
    return showSearchResult ? this.renderSearchResult() : this.renderSearchDefault();
  };

  renderSearchDefault = () => {

    const {
      showHistory,
      searchHistory,
      searchCategory: {
        cioType,
        credit
      },
    } = this.state;

    return (
      <div>
        {
          showHistory ? (
            <List
              renderHeader={() => (
                <Flex>
                  <Flex.Item>
                    <span>搜索历史</span>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.clearSearchHistory}>
                      <Icon type="cross" onClick={() => this.handleCloseSearchHistory()} />
                    </div>
                  </Flex.Item>
                </Flex>
              )}
            >
              <List.Item wrap className={styles.searchTag}>
                {
                  searchHistory && searchHistory.map(t => (
                    <Tag key={t} closable onClose={() => this.handleCloseSearchHistory(t)}>{t}</Tag>
                  ))
                }
              </List.Item>
            </List>
          ) : null
        }
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
  };

  removeCompareOrg = (org) => {
    let {
      compareOrg,
      orgList,
    } = this.state;
    const index = compareOrg.findIndex(o => o.orgId === org.orgId);
    if (index > -1) {
      compareOrg.splice(index, 1);
    }

    orgList = orgList.map(o => {
      const i = compareOrg.findIndex(c => o.orgId === c.orgId);
      if (i > -1) {
        return {
          ...o,
          compare: true,
        }
      }
      return {
        ...o,
        compare: false,
      }
    });
    this.setState({
      compareOrg,
      orgList,
    });
  };

  handleCheckboxChange = (org, e) => {
    const {
      target: {
        checked
      }
    } = e;
    let {
      compareOrg,
      orgList,
    } = this.state;

    if (checked) {
      if (compareOrg.length === 2) {
        compareOrg.shift();
      }
      compareOrg.push(org);
    } else {
      const index = compareOrg.findIndex(o => o.orgId === org.orgId);
      if (index > -1) {
        compareOrg.splice(index, 1);
      }
    }

    orgList = orgList.map(o => {
      const i = compareOrg.findIndex(c => o.orgId === c.orgId);
      if (i > -1) {
        return {
          ...o,
          compare: true,
        }
      }
      return {
        ...o,
        compare: false,
      }
    });
    this.setState({
      compareOrg,
      orgList,
    });
  };

  renderItem = (org) => {
    const { compareOrg } = this.state;
    const index = compareOrg.findIndex(o => o.orgId === org.orgId);
    return (
      <Fragment key={org.orgId}>
        <WhiteSpace size="xs" />
        <WingBlank size="sm">
          <Card className={styles.resultCard}>
            <Card.Header
              title={
                <div>
                  <div>
                    <Ellipsis lines={2}>{org.orgName}</Ellipsis>
                  </div>
                  <div style={{paddingTop: 6}}>
                    <Badge text={org.creditLevel} className={styles.searchKeyWord} />
                    <Badge text={org.creditScore} className={styles.searchKeyWord} />
                  </div>
                </div>
              }
              extra={
                <Checkbox checked={index > -1} style={{width: '50px'}} data-seed="orgId" onChange={e => this.handleCheckboxChange(org, e)} />
              }
            />
          </Card>
        </WingBlank>
        <WhiteSpace size="xs" />
      </Fragment>
    );
  };

  renderSearchResult = () => {

    const { orgList, compareOrg } = this.state;
    const count = compareOrg.length;
    let compareContent = null;
    if (count > 0) {
      compareContent = (
        <Fragment>
          <Flex>
            <Flex.Item style={{margin: 10}}>
              <Card>
                <Card.Body>
                  <div onClick={() => this.removeCompareOrg(compareOrg[0])} style={{position: 'absolute', top: -10, right: -10}}><Icon type="cross" /></div>
                  <Ellipsis lines={2}>{compareOrg[0].orgName}</Ellipsis>
                </Card.Body>
                <Card.Footer content={compareOrg[0].creditScore} />
              </Card>
            </Flex.Item>
            <div><CompareButton type="primary" disabled={compareOrg.length < 2} content="比一比" /></div>
            <Flex.Item style={{margin: 10}}>
              <Card>
                {count > 1 ? (
                  <Fragment>
                    <div onClick={() => this.removeCompareOrg(compareOrg[1])} style={{position: 'absolute', top: -10, right: -10}}><Icon type="cross" /></div>
                    <Card.Body>
                      <Ellipsis lines={2}>{compareOrg[1].orgName}</Ellipsis>
                    </Card.Body>
                    <Card.Footer content={compareOrg[1].creditScore} />
                  </Fragment>
                ) : (
                  <Card.Body style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    选择一个企业进行比较
                  </Card.Body>
                )}
              </Card>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="xs" style={{backgroundColor: '#efeff4'}} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {compareContent}
        <List
          renderHeader={() => (
            <Flex>
              <Flex.Item><span>{`${orgList.length}个结果`}</span></Flex.Item>
            </Flex>
          )}
        >
          {
            orgList.map(r => this.renderItem(r))
          }
        </List>
      </Fragment>
    );
  };

  render() {

    const {
      searchPlaceholder,
      searchKeyword,
    } = this.state;

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          leftContent={<span style={{width: 100}}>企业诚信查询</span>}
          onLeftClick={() => console.log('onLeftClick')}
        />
        <SearchBar
          onBlur={this.onSearchBarBlur}
          onFocus={this.onSearchBarFocus}
          placeholder={searchPlaceholder}
          ref={ref => {this.searchBar = ref}}
          value={searchKeyword}
          onChange={this.handleChange}
          onSubmit={this.handleSearch}
        />
        {this.renderContent()}
      </div>
    );
  }
}

export default Search;
