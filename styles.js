import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rippleContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rippleOverlay: {
    height: 2,
    width: 2,
    borderRadius: 1,
    position: 'absolute',
  },
  buttonBasic: {
    padding: 5,
    borderRadius: 2,
    backgroundColor: '#FFF',
    overflow: 'visible',
  }
});

export default styles;
