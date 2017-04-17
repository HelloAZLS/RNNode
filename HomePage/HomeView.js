import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Navigator,
    NavigationBar,
} from 'react-native';

import Cell from './Cell';
import Api from '../Api';
import DetailView from '../Detail/DetailView';
let Dimensions =require('Dimensions');
let scrrenWidth =Dimensions.get("window").width;
class HomeView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isFirst: false,
            isLoadMore: true, //是否能够加载更多
            isLoading: true,//是否正在加载更多,用于更新脚布局
            page: 1,
            loadData: new Array(),
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            })
        };
    }

    render() {
        if (!this.state.isFirst) {
            return (
                <Text style={{marginTop: 80, textAlign: 'center'}}>正在刷新.....</Text>
            )
        }
        return (
            <ListView
                style={{marginTop: 80, backgroundColor: 'rgb(236,236,236)'}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderRow(rowData) }
                onEndReached={() => this._loadMore()}
                renderFooter={() => this._renderFooter()}
            />
        )
    }

    //下载数据
    componentDidMount() {
        this.getData();
    }

    //获取数据
    getData() {
        fetch(Api.topics)
            .then((data) => data.json())
            .then((dataDic) => {
                var dataArr = dataDic.data;
                this.state.loadData = dataArr;
                if (dataArr) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(dataArr),
                        isFirst: true,
                        isLoading:false,
                    });
                }
            })
            .done()
    }

    _loadMore() {
        //不是加载更多
        if (!this.state.isLoadMore) {
            return
        } else {
            this._getMoreData();
        }
    }

    //请求得到更多数据
    _getMoreData() {
        var page = this.state.page + 1;
        this.state.isLoadMore = false;
        this.state.isLoading=true;
        var loadMoreUrl = Api.topics + "?page=" + page;
        fetch(loadMoreUrl)
            .then((moreData) => moreData.json())
            .then((moreDataDic) => {
                var moreDataArr = moreDataDic.data;
                if (moreDataArr) {
                    this.state.loadData = this.state.loadData.concat(moreDataArr);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.state.loadData),
                        isFirst: true,
                        isLoadMore: true,
                        page: page,
                        isLoading:false,

                    });
                }
            })
            .done()
    };

    //此方法用于加载脚布局
    _renderFooter() {
        if(this.state.isLoading){
            return (
                <View style={{height: 25,width:scrrenWidth,backgroundColor:"#FFFAFA",alignItems:'center'}}>
                    <Text style={{textAlign:'center',color:'#CDCDC1'}}>玩命加载中...</Text>
                </View>
            )
        }
    }

    renderRow(rowData) {
        return (
            <Cell rowData={rowData}
                  selecrdCell={(rowData) => this.selecrdCell(rowData)}
            />
        )
    }

    selecrdCell(rowData) {
        this._navigate(rowData)

    }

    _navigate(rowData) {
        console.log(rowData.id + "二")
        this.props.navigator.push({
            component: DetailView,
            passProps: {
                cellId: rowData.id,
            },

        })
    }
}
export  default HomeView