/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'
import { RNCamera } from 'react-native-camera'

class App extends Component {
  //构造函数
  constructor(props) {
    super(props)
    this.state = {
      cameraType: RNCamera.Constants.Type.front,
      cameraInfo: { uri: 'https://reactnative.dev/img/tiny_logo.png' }
    }
  }

  //切换前后摄像头
  switchCamera() {
    let _cameraType = ''
    const { cameraType } = this.state
    if (cameraType === RNCamera.Constants.Type.back) {
      _cameraType = RNCamera.Constants.Type.front
    } else {
      _cameraType = RNCamera.Constants.Type.back
    }
    this.setState({ cameraType: _cameraType })
  }

  //拍摄照片
  takePicture = async () => {
    if (this.camera) {
      try {
        const data = await this.camera.takePictureAsync()
        console.warn('takePictureResponse ', data)
        this.setState({ cameraInfo: data })
      } catch (error) {
        console.log(error)
      }
    }
  }

  //渲染
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={e => {
            this.camera = e
          }}
          style={styles.preview}
          type={this.state.cameraType}>
          <Image
            style={styles.img}
            source={{ uri: this.state.cameraInfo.uri }}
          />
          <Button
            title="切换摄像头"
            style={styles.button}
            onPress={this.switchCamera.bind(this)}
          />
          <Button
            title="拍照"
            style={styles.button}
            onPress={this.takePicture.bind(this)}
          />
        </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  toolBar: {
    width: 200,
    margin: 40,
    backgroundColor: '#000000',
    justifyContent: 'space-between'
  },
  img: {
    flex: 1,
    width: 200,
    height: 200
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})

export default App
