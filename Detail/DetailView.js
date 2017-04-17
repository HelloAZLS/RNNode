/**
 * Created by Administrator on 2017/4/15.
 */

import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    WebView,
} from 'react-native';
import  Api from '../Api';
// let Dimensions=require('Dimensions')
class DetailView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoad: false,
        };

    }

    render() {
        // var contentView = this.state.isLoad === false
        //    ?<Text style={{marginTop: 80, fontSize: 18, textAlign: 'center'}}>正在涮洗......</Text>
        //     :<View style={{flex:1,marginTop:64,backgroundColor:'yellow'}}></View>;
        //
        if (!this.state.isLoad) {
            return (
                <Text style={{marginTop: 80, fontSize: 18, textAlign: 'center'}}>正在刷新.....</Text>
            )
        }
        return (
            <View style={{flex: 1, marginBottom: 10, backgroundColor:'white'}}>
                <Text style={{ marginTop: 80,
                    color: '#333',
                    fontSize: 18,
                    marginLeft: 20}}>{this.state.title}</Text>
                <Text style={{ marginTop: 5,
                    color: '#666',
                    fontSize: 14,
                    marginLeft: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CCCCCC',}}>{this.state.tab} | {this.state.loginname} | {this.state.create_time}</Text>
                <WebView
                style={{flex:1}} source={{html:this.state.content}}
                />

            </View>
        )
    }

    componentDidMount() {
        this.getDetailData();
    }

    getDetailData() {
        console.log(this.props.cellId)
        var detailUrl = Api.topic + this.props.cellId;
        console.log(detailUrl)
        fetch(detailUrl)
            .then((detailData) => detailData.json())
            .then((dateDic) => {
            console.log(dateDic)
                this.setState({
                    isLoad: true,
                    tab: dateDic.data.tab,
                    content: dateDic.data.content,
                    title: dateDic.data.title,
                    create_time: dateDic.data.create_at,
                    loginname:dateDic.data.author.loginname,

                });
            }).done()
    }
}
export  default DetailView;
