/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Vibration,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import { Icon } from 'react-native-elements'
import { Button } from 'react-native-elements';



import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Slider from '@react-native-community/slider';


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      vibration:0,
      play:false,
      selectedMode:0,
      modes:['Normal', 'Slow to fast', 'Crazy','Intermitent']
    };
  }

  async componentDidMount() {
    Vibration.cancel()
  }


  ChangeVibration(value){
    Vibration.cancel()
    let val=value*1000
    this.setState({vibration:val})
    console.log(val)
    Vibration.vibrate([value,val],true)
  }

  start(){
    Vibration.cancel()
    if(this.state.selectedMode!=0){
      if(this.state.play==false){
        switch (this.state.selectedMode) {
          case 1:
            this.StF();
            break;
          case 2:
            this.Crazy();
            break;
          case 3:
            this.Intermitent();
            break;
          default:
            break;
        }
      }
      this.setState({
        play:!this.state.play
      })
    }
  }

  StF(){
    Vibration.vibrate([1000,100,900,200,800,300,700,400,600,500,500,600,400,700,300,800,200,900,100,1000],true)
  }

  Crazy(){
    Vibration.vibrate([100,100,90,200,80,300,70,400,60,500,50,600,40,700,30,800,20,900,10,1000],true)
  }

  Intermitent(){
    Vibration.vibrate([100,200],true)

  }

  changeMode(i){
    Vibration.cancel();
    this.setState({
      selectedMode:i,
      play:false
    })
  }


  render(){
    const Modes=this.state.modes.map((mode,i)=>(
      <Button buttonStyle={[styles.button,this.state.selectedMode==i?{backgroundColor:'#4F1536'}:{backgroundColor:'#694057'}]} key={mode} 
              title={mode}
              onPress={()=>this.changeMode(i)}
      ></Button>
    ))
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#CFC8CC" />
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
            <View style={styles.buttonContainer}>
              <Image style={{height:150, width:150, resizeMode:'contain'}} source={ Platform.OS === "android" ? {uri: "asset:/images/YoungLust.png"} : null} />
            </View> 
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#4F1536"
                maximumTrackTintColor="#000000"
                thumbTintColor="#4F1536"
                onValueChange={(value)=>{
                  this.ChangeVibration(value)
                }}
                disabled={this.state.selectedMode==0?false:true}
              />
              <View style={styles.buttonContainer}>
                <Button onPress={()=>this.start()} buttonStyle={[styles.mainButton,this.state.selectedMode!=0?{backgroundColor:'#4F1536'}:{backgroundColor:'#694057'}]} 
                    icon={{
                      color:'#fff',
                      name:this.state.play==false?'play':'pause',
                      type:'font-awesome' 
                    }} >
                </Button> 
              </View>
              <View style={styles.patterns}>
                {Modes}
              </View>
            </View>
        </SafeAreaView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#CFC8CC',
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#CFC8CC',
  },
  slider:{
    width: 300, 
    height: 80
  },
  button:{
    backgroundColor:'#4F1536',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#000033',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    width:150,
    margin:5
  },
  mainButton:{
    height:75,
    width:200,
    backgroundColor:'#4F1536',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#000033',
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  patterns:{
    flexWrap:'wrap',
    flexDirection:'row',
    width:'80%'
  },
  text:{
    color:'#fff'
  },
  buttonContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});
