import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import {Image} from 'react-native';
import LogoSvg from '../assets/img/logo.svg';
import CameraSvg from '../assets/img/Camera.svg';
import SearchSvg from '../assets/img/find.svg'

export default function Main({navigation}) {
  const [text, setText] = React.useState('');
  
  // 임시의 알러지 값
  foodallerge = '양파';
  async function openai_say(foodname){
    try{
      const respond = await fetch('http://172.30.1.42:3000/openAI/say',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          allerge: foodallerge,
          food: foodname
        })
      })
      if (!respond.ok) {
        throw new Error(`HTTP error! Status: ${respond.status}`);
      }
      const textResponse = await respond.text(); // 응답 본문을 문자열로 읽기
      console.log(textResponse); // 응답된 텍스트 출력
      
      return textResponse;
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1}}>
      <StatusBar style="auto" />
      <LinearGradient style={styles.container} colors={['#51CE54', '#0D7FFB']}>
      <KeyboardAvoidingView
          style={{flex:1}}
          behavior={"padding"}
      > 
          <ImageBackground style={styles.backgroundImg} source={require('../assets/img/background.png')} resizeMode="cover">
          </ImageBackground>
          <View style={[styles.logo, { height: 62 }]}>
            <LogoSvg height={62}></LogoSvg>
            <Text style={styles.logoText}>Allergic</Text>
          </View>
          
          <View style={styles.main}>
              <View style={styles.mainBox}>
                  <Text style={styles.mainText}>식사를 하기전</Text>{/* class="text" style="display: inline-block; margin-bottom:10px"*/}
                  <Text style={styles.mainText}>알러지 식품을 체크해보세요!</Text>{/* class="text" */}
                  <Text style={styles.mainSmallText}>사진촬영이나 요리명을 검색해보세요.</Text>{/* class="small-text" */}
              </View>
              <View style={styles.section}>
                  <TouchableOpacity
                    title="Go to Camera"
                    onPress={() => navigation.navigate("Picture")}
                  >
                  <View style={styles.But}>
                      <CameraSvg/>
                      <View style={styles.textBox}>{/* class="textBox" */}
                          <Text style={styles.Cam_text}>사진촬영</Text>{/* class="text" */}
                          <Text style={styles.Cam_smallText}>완성된 요리를 촬영해주세요</Text>{/* class="small-text" */}
                      </View>
                  </View>
                  </TouchableOpacity>
                  <View style={styles.find}>
                      <TouchableOpacity
                        onPress={async () => {
                          const result = await openai_say(text); // 비동기 함수의 결과를 기다림
                          alert(result); // 응답 받은 문자열을 alert로 표시
                        }}
                      >
                        <SearchSvg/>
                      </TouchableOpacity>
                      <View>{/* class="textBox" */}
                          <TextInput
                            style={styles.input}
                            placeholder="요리명 검색"
                            onChangeText={text => setText(text)} 
                            value={text}
                          />
                          <View></View>{/* class="searchImg" */}
                      </View>
                      <TouchableOpacity
                        // 글자 삭제
                        onPress={()=>{setText('')}}
                      >
                      <Image source={require('../assets/img/X.png')}/>{/* class="smallImg" id="inputDelete" */}
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          </KeyboardAvoidingView>
          {/* 여기서부터 푸터 */}
          <View style={styles.footer}>
            <View style={styles.footerBar}>
              <View style={styles.footerCenter}>
                <Image source={require('../assets/img/Home.png')} style={styles.icon} />
                <Text style={styles.MFText}>홈</Text>
              </View>
              <View style={styles.footerCenter}>
                <Image source={require('../assets/img/CheckSquare.png')} style={styles.icon} />
                <Text style={styles.FText}>알러지 등록</Text>
              </View>
              <View style={styles.footerCenter}>
                <Image source={require('../assets/img/Camera.png')} style={styles.icon} />
                <Text style={styles.FText}>알러지 검색</Text>
              </View>
              <View style={styles.footerCenter}>
                <Image source={require('../assets/img/record.png')} style={styles.icon} />
                <Text style={styles.FText}>기록</Text>
              </View>
            </View>
          </View>
      </LinearGradient>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
  },
  backgroundImg: {
    flex:1,
    marginTop:30,
  },
  logo: {
    position: 'relative',
    flexDirection:'row',
    left: 20,
    top:-30,
  },
  logoText:{
    position: 'relative',
    left: 13,
    top: 9,
    color: "#FFF",
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
  },
  main:{
    flex:1.3,
    top:-30,
    backgroundColor: "#FFF",
    position: 'relative',
    borderTopRightRadius: 100,
  },
  mainText:{
    marginBottom:4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainBox:{
    flex:1,
    top:45,
    left:20,
  },
  mainSmallText:{
    marginTop:4,
    fontSize: 16.2,
  },
  section:{
    flex:4,
    top:45,
    position: 'relative',
    alignItems: 'center',
  },
  But:{
    marginTop:30,
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 5.995,
    padding: (11.991, 22.482, 11.991, 21.482),
    margin: 10,
    alignItems: 'center',
    gap: 18.735,
    backgroundColor: '#0075FF',
  },
  find: {
    height:60,
    width: 300,
    flexDirection:'row',
    borderRadius: 5.995,
    padding: (11.991, 22.482, 11.991, 21.482),
    margin: 10,
    alignItems: 'center',
    gap: 18.735,
    borderWidth:2,
    borderStyle: 'solid',
    borderColor:'#0075FF',
    backgroundColor: '#FFF',
  },
  textBox:{
    flexDirection:'row',
  },
  Cam_text:{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 17.4,
    fontWeight: 'bold',
  },
  Cam_smallText:{
    marginLeft: 9,
    marginTop: 2,
    color:'#FFF',
    fontFamily: 'Inter',
    fontSize: 11.4,
    fontWeight: 400,
  },
  input:{
    marginRight:-8,
    width:170,
    height:50,
    fontFamily: 'Inter',
    fontSize: 17.986,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  // 여기서 부터 푸터
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth:1,
    borderTopColor: "rgb( 243, 245, 248)",
    height: 95,
    alignItems:'center',
  },
  footerBar: {
    width: '95%',
    flexDirection: 'row',
    marginTop: 5,
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    height: 50,
  },
  footerCenter: {
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  MFText: {
    marginTop: 5,
    color: "#51CE54",
    textAlign: "center",
    fontWeight: 'bold',
  },
  FText: {
    color: 'rgb( 117, 117, 117)',
    marginTop: 5,
    textAlign: "center",
    fontWeight: 'bold',
  }
});
