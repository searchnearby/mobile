/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

// window.navigator.userAgent = "react-native";

var io = require("socket.io-client/socket.io");

class mobile extends Component {

  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3000/nearby',{
      jsonp: false,
      transports: ['websocket']
    });
  }

  componentDidMount() {
    console.log('mount')
    this.socket.connect(function(res) {
      console.log('res', res)
    })
    this.socket.on('connect', (msg) => {
      console.log('connect', msg)
      this.socket.emit('test')
    });
    console.log('test', this.socket.emit('test'))
    this.socket.on('message', (msg) => {
      console.log('msg', msg)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mobile', () => mobile);
