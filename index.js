'use strict';

var React = require('react-native');
var {
  View,
  Animated,
  PanResponder
} = React;
var styles = require('./styles');

var MaterialButton = React.createClass({
  getDefaultProps() {
    return {
      withRipple: true,
      withShadow: false,
      shadowLevel: 1,
      pressedShadowLevel: 5,
      shadowColor: '#000',
      shadowOpacity: 0.4,
      pressedShadowOpacity: 0.6,
      animationTime: 600,

      onClick: function() {},
      onPressIn: function() {},
      onPressOut: function() {},

      rippleColor: 'rgba(0,0,0,0.1)',
      style: {},
    };
  },

  getInitialState() {
    this.currentLevel = this.props.shadowLevel;

    return {
      radius: new Animated.Value(0),
      opacity: new Animated.Value(1),
      shadowRadius: new Animated.Value(this.props.shadowLevel),
      shadowOpacity: new Animated.Value(this.props.shadowOpacity),
      shadowOffset: {height: this.props.shadowLevel, width: 0},
      width: 0,
      height: 0,
      fromTop: 0,
      fromLeft: 0,
    };
  },

  currentLevel: 0,

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onShouldBlockNativeResponder: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.liftDown();
        this.isTouching = false;
        this.hideRipple();

        this.props.onPressOut();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.liftDown();
        this.isTouching = false;
        this.hideRipple();
      },
      onPanResponderGrant: (evt, gestureState) => {
        var x = evt.nativeEvent.locationX;
        var y = evt.nativeEvent.locationY;
        this.isTouching = true;
        this.shouldHide = false;
        this.startRipple();
        this.rippleAnimation(x, y);
        this.liftUp();

        this.props.onClick();
        this.props.onPressIn();
      },
    });
  },

  liftUp() {
    Animated.parallel([
      Animated.timing(this.state.shadowRadius, {
        toValue: this.props.topShadowLevel,
        duration: this.animationTime,
      }),
      Animated.timing(this.state.shadowOpacity, {
        toValue: this.props.pressedShadowOpacity,
        duration: this.animationTime,
      })
    ]).start();
    this.slideShadowTo(this.props.pressedShadowLevel);
  },

  liftDown() {
    Animated.parallel([
      Animated.timing(this.state.shadowRadius, {
        toValue: 1,
        duration: this.animationTime,
      }),
      Animated.timing(this.state.shadowOpacity, {
        toValue: this.props.shadowOpacity,
        duration: this.animationTime,
      })
    ]).start();
    this.slideShadowTo(this.props.shadowLevel);
  },

  slideShadowTo(h) {
    clearInterval(this.liftInterval);
    var step = h == this.currentLevel ? 0 : (h > this.currentLevel ? 1 : -1);
    this.liftInterval = setInterval(() => {
      this.currentLevel += step;
      this.setState({shadowOffset: {height: this.currentLevel, width: 0}});
      if ((step > 0 && this.currentLevel >= h) || (step < 0 && this.currentLevel <= h)) clearInterval(this.liftInterval);
    }, 100);
  },

  rippleAnimation(x,y) {
    this.setState({
      fromTop: y,
      fromLeft: x
    });
    Animated.sequence([
      Animated.timing(this.state.radius, {
        toValue: this.state.maxScale,
        duration: this.animationTime,
      }),
    ]).start();
  },

  startRipple() {
    this.rippleInterval = setInterval(() => {
      this.shouldHide = true;
      clearInterval(this.rippleInterval);
      this.hideRipple();
    }, this.props.animationTime);
  },

  hideRipple() {
    if (this.shouldHide && !this.isTouching) {
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 100,
        }),
        Animated.parallel([
          Animated.timing(this.state.radius, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 0,
          }),
        ])
      ]).start();
    }
  },

  onLayout(e) {
    var { x, y, width, height } = e.nativeEvent.layout;
    console.log(x, y, width, height);
    this.setState({
      top: y,
      left: x,
      width: width,
      height: height,
      maxScale: width + height,  // TODO: optimize value
    });
  },

  renderShadow() {
    if (!this.props.withShadow) return {};

    return {
      shadowColor: this.props.shadowColor,
      shadowOpacity: this.state.shadowOpacity,
      shadowRadius: this.state.shadowRadius,
      shadowOffset: this.state.shadowOffset,
    };
  },

  renderRipple() {
    if (!this.props.withRipple) return null;

    return (
      <View style={[styles.rippleContainer, {height: this.state.height, width: this.state.width}]}>
        <Animated.View style={[
            styles.rippleOverlay,
            {
              backgroundColor: this.props.rippleColor,
              top: this.state.fromTop,
              left: this.state.fromLeft,
              opacity: this.state.opacity,
              transform: [{scale: this.state.radius}]
            }
        ]}/>
      </View>
    );
  },

  render() {
    return (
      <Animated.View
        onLayout={this.onLayout}
        pointerEvents='box-only'
        style={[styles.buttonBasic, this.renderShadow(), this.props.style]}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
        {this.renderRipple()}
      </Animated.View>
    );
  }
});

module.exports = MaterialButton;
