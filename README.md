## Customizable material button for react-native
<p align="center">
    <img src ="http://s28.postimg.org/3zcyab5j1/out.gif" />
</p>

### Content
- [Installation](#installation)
- [Usage example](#usage-example)
- [Properties](#properties)
- [Events](#events)
- [Live example](#live-example)
- [Questions?](#questions)

### Installation
```bash
npm install --save react-native-material-button
```

### Usage example
```javascript
var Button = require('react-native-material-button');

var Application = React.createClass({
  render: function() {
    return (
      <View>
        <Button onPress={()=>{alert('pressed!')}}/>
      </View>
    );
  }
});
```

### Properties
* `withRipple` (Boolean) - Show ripple animation (default: true),
* `withShadow` (Boolean) - Show shadow (default: false),
* `shadowLevel` (Number) - Shadow radius when button is unpressed (default: 1),
* `pressedShadowLevel` (Number) - Shadow radius when button is pressed (default: 5),
* `shadowColor` (String) - Shadow color (default: #000),
* `shadowOpacity` (Number) - Shadow opacity when button is unpressed (default: 0.4),
* `pressedShadowOpacity` (Number) - Shadow opacity when button is pressed (default: 0.6),
* `animationTime` (Number) - Ripple animation time in ms (default: 600),
* `rippleColor` (String) - Ripple color (Should be transparent) (default: rgba(0,0,0,0.1)),
* `styles` (Object) - Styles for outer container (margins, ...),

### Events
* `onPress`: This function is called when the button is pressed.
* `onPressIn`: This function is called when the button is pressed in.
* `onPressOut`: This function is called when the button is pressed out :)

### Live example
```sh
git clone git@github.com:Recr0ns/react-native-material-button.git
cd react-native-material-button/examples
npm install
open ios/example.xcodeproj
```
Then `Cmd+R` to start the React Packager, build and run the project in the simulator.

### License
MIT License

### Questions?
Feel free to [create an issue](https://github.com/Recr0ns/react-native-material-button/issues)
