/*
 * @Author: cuzofu
 * @Date: 2018-12-18
 * @Last Modified by: cuzofu
 * @Last Modified time: 2018-12-18
 */

import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import {SearchBar, WhiteSpace, WingBlank, NavBar, Icon, List, Badge, Tag, Card, Checkbox, Flex} from 'antd-mobile';

import styles from './index.less';
import Ellipsis from "@/components/Ellipsis";

@connect(({search}) => ({
  search,
}))
class Search extends PureComponent {

  state = {
    searchPlaceholder: '请输入企业名称查询',
    searchHistory: [],
    searchCategory: {
      cioType: ['施工', '监理', '勘察', '房地产开发', '检测', '造价咨询', '招标代理', '施工图审', '园林绿化', '物业管理'],
      credit: ['A级', 'B级', 'C级', '100分以上', '80~99分', '80分以下'],
    },
    showSearchResult: false,
  };

  componentDidMount() {
    this.searchBar.focus();
  }

  onSearchBarBlur = () => {
  };

  onSearchBarFocus = () => {
    clearInterval(this.interval);
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
    console.log(value);
    const {
      searchHistory,
      searchKeyword,
    } = this.state;
    console.log(searchKeyword);
    console.log(searchHistory);

    console.log(searchHistory.indexOf(value));
    if (searchHistory.indexOf(value) < 0) {
      searchHistory.push(value);
      this.setState({
        searchHistory,
      });
    }
  };

  renderContent = () => {
    const {
      showSearchResult,
    } = this.state;
    return showSearchResult ? this.renderSearchResult() : this.renderSearchDefault();
  };

  renderSearchDefault = () => {

    const {
      searchHistory,
      searchCategory: {
        cioType,
        credit
      },
    } = this.state;

    return (
      <div>
        {
          searchHistory && searchHistory.length > 0 && (
            <List renderHeader="最近搜索">
              <List.Item wrap className={styles.searchTag}>
                {
                  searchHistory && searchHistory.map(t => (
                    <Tag key={t} closable data-seed="logId" onClose={(e) => console.log(e)}>{t}</Tag>
                  ))
                }
              </List.Item>
            </List>
          )
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

  renderItem = (props) => (
    <Fragment>
      <WhiteSpace size="xs" />
      <WingBlank size="sm">
        <Card className={styles.resultCard}>
          <Card.Header
            title={
              <div>
                <div>
                  <Ellipsis lines={2}>{props.orgName}</Ellipsis>
                </div>
                <div style={{paddingTop: 6}}>
                  <Badge text={props.creditLevel} className={styles.searchKeyWord} />
                  <Badge text={props.creditScore} className={styles.searchKeyWord} />
                </div>
              </div>
            }
            extra={
              <Checkbox.CheckboxItem style={{width: '50px'}} data-seed="logId" onChange={e => console.log('checkbox', e)} />
            }
          />
        </Card>
      </WingBlank>
      <WhiteSpace size="xs" />
    </Fragment>
  );

  renderSearchResult = () => {
    const results = [
      {
        orgName: '升思科技股份有限公司升思科技股份有限公司升思科技股份有限公司升思科技股份有限公司',
        creditLevel: 'A级',
        creditScore: '360分',
      },
      {
        orgName: '升思科技股份有限公司',
        creditLevel: 'B级',
        creditScore: '88分',
      },
      {
        orgName: '升思科技股份有限公司',
        creditLevel: 'C级',
        creditScore: '55分',
      },
      {
        orgName: '升思科技股份有限公司',
        creditLevel: 'A级',
        creditScore: '120分',
      },
    ];

    const PlaceHolder = ({ className = '', content, ...restProps }) => (
      <div className={`${className} placeholder`} {...restProps}>{content}</div>
    );

    return (
      <List
        renderHeader={() => (
          <Flex>
            <Flex.Item>
              <span>
                {`${results.length}个结果`}
              </span>
            </Flex.Item>
            <Flex.Item>
              <PlaceHolder content="比一比" />
            </Flex.Item>
          </Flex>
        )}
      >
        {
          results.map(r => this.renderItem(r))
        }
      </List>
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
