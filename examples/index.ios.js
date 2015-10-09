/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Button = require('react-native-material-switch');

var example = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Material Buttons'}</Text>
        <View style={styles.block}>
          <Text style={styles.blockText}>{'Default button'}</Text>
          <Button style={{marginBottom: 10, padding: 15}}>
            <Text>{'Button 1'}</Text>
          </Button>
        </View>
        <View style={styles.block}>
          <Text style={styles.blockText}>{'With shadow'}</Text>
          <Button withShadow={true} style={{marginBottom: 10, padding: 15}}>
            <Text>{'Button 1'}</Text>
          </Button>
        </View>
        <View style={styles.block}>
          <Text style={styles.blockText}>{'No ripple effect'}</Text>
          <Button withRipple={false} withShadow={true} style={{marginBottom: 10, padding: 15}}>
            <Text>{'No ripple'}</Text>
          </Button>
        </View>
        <View style={styles.block}>
          <Text style={styles.blockText}>{'Custom ripple color'}</Text>
          <Button rippleColor='rgba(255, 209, 36, 0.2)' style={{marginBottom: 10, padding: 15}}>
            <Text>{'Ripple color'}</Text>
          </Button>
        </View>
        <View style={styles.block}>
          <Text style={styles.blockText}>{'Custom color'}</Text>
          <Button rippleColor='rgba(255, 255, 255, 0.1)' style={{marginBottom: 10, padding: 15, backgroundColor: '#3F51B5'}}>
            <Text style={{color: '#FFF'}}>{'Custom color'}</Text>
          </Button>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93deff',
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  blockText: {
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

AppRegistry.registerComponent('example', () => example);
