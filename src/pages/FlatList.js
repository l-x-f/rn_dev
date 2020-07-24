import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

const CITY_NAME = [
  '北京',
  '上海',
  '广州',
  '武汉',
  '杭州',
  '三亚',
  '宁波',
  '杭州',
  '合肥',
  '芜湖',
  '福州',
  '厦门',
  '温州'
]
export default class FlatListDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataArray: CITY_NAME
    }
  }

  loadData(refreshing) {
    if (refreshing) {
      this.setState({
        isLoading: true
      })
    }

    setTimeout(() => {
      let dataArray = []
      if (refreshing) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i])
        }
      } else {
        dataArray = this.state.dataArray.concat(CITY_NAME)
      }

      this.setState({
        dataArray: dataArray,
        isLoading: false
      })
    }, 2000)
  }

  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  _renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <FlatList
            data={this.state.dataArray}
            renderItem={data => this._renderItem(data)}
            // refreshing={this.state.isLoading}
            // onRefresh={()=>{
            //   this.loadData();
            // }}
            //要定制刷新外观不能用上面这个,要用下面这个
            refreshControl={
              <RefreshControl
                title={'加载中...'}
                colors={['red']} //此颜色无效
                tintColor={'orange'}
                titleColor={'red'} //只有ios有效
                refreshing={this.state.isLoading}
                onRefresh={() => {
                  this.loadData(true)
                }}
              />
            }
            ListFooterComponent={() => this.genIndicator()} //上拉加载更多视图
            onEndReached={() => {
              this.loadData()
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  item: {
    backgroundColor: '#168',
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center'
    //justifyContetnt:'center',
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'yellow',
    margin: 10
  }
})
