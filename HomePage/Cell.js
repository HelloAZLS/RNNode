/**
 * Created by Administrator on 2017/4/15.
 */
import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
class Cell extends  Component{
    render(){
        return(
        <TouchableHighlight onPress={()=>this.props.selecrdCell(this.props.rowData)}>
            <View style={{backgroundColor: 'white',height:65,marginTop:15}}>
                <Text style={{fontSize:16,color:'rgb(83,83,83)',flex:1,marginLeft:5}}>
                    {this.props.rowData.title}</Text>
                <View style={{flexDirection:'row',height:25,alignItems:'center'}}>
                    <Text style={[styles.base,{color:'rgb(169,212,99)'}]}>{this.props.rowData.tab}</Text>
                    <Text style={[styles.base,{color:'rgb(142,142,142)'}]}>{this.props.rowData.author.loginname}|
                        {this.props.rowData.reply_count}回复|{this.props.rowData.visit_count}阅读
                    </Text>
                </View>
            </View>
        </TouchableHighlight>

        )
    }
}
const styles =StyleSheet.create({
    base:{
        fontSize:12,
        margin:5,
    }
})
export  default Cell;