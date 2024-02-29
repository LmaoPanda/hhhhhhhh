import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal, Switch, FlatList, Pressable, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function App() {

  const[teamNum, setName] = useState('');
  const[scoringMech, setMech] = useState('');
  const[intake, setIntake] = useState('');
  const[comments, setComments] = useState('');
  const[centerOfGravity, setGravity] = useState('');
  const [canClimbStage, setStage] = useState(false);
  const [canBuddyClimb, setClimb] = useState(false);
  const toggleStage = () => setStage(previousState => !previousState);
  const toggleClimb = () => setClimb(previousState => !previousState);

  const[driveTrain, setTrain] = useState();

  const DATA = [
    {
      id: 'tank',
      title: 'Tank',
    },
    {
      id: 'western',
      title: 'West',
    },
    {
      id: 'swerve',
      title: 'Swerve',
    },
    {
      id: 'other',
      title: 'Other',
    },
  ]

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === driveTrain ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === driveTrain ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setTrain(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style = {styles.firstrow}>
        <Pressable onPress = {(value) => setComments(value)}>
            <Image
              style={styles.home}
              source={
                require('./home.png')
              }
            />
          </Pressable>
          <TextInput 
          style = {[styles.input, styles.top]} 
          placeholder = "Team Name"
          onChangeText = {(value) => setName(value)}
          />
          <Pressable
            style = {styles.blank}
          />
      </View>
        <View style={styles.container}>
        <Text>Drivetrain:</Text>
        <View style = {styles.list}>
          <SafeAreaView>
            <FlatList
              horizontal = {true}
              data = {DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={driveTrain}
            />
          </SafeAreaView>
        </View>
        <Text>Dimensions in Metres</Text>
        <View style = {styles.DimensionRow}>
          <TextInput
            placeholder="L"
            style = {styles.L}
          />
          <TextInput
            placeholder="W"
            style = {styles.L}
          />
          <TextInput
            placeholder="H"
            style = {styles.L}
          />
        </View>
        <TextInput 
        style = {styles.input} 
        placeholder = "Scoring Mechanism"
        onChangeText = {(value) => setMech(value)}
        />
        <TextInput 
        style = {styles.input} 
        placeholder = "Intake"
        onChangeText = {(value) => setIntake(value)}
        />
        <TextInput 
        style = {styles.input} 
        placeholder = "Center of Gravity"
        onChangeText = {(value) => setGravity(value)}
        />
        <View style = {styles.switchContainer}>
          <Switch 
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={canClimbStage ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleStage}
            value={canClimbStage}
          />
          <Text>Can the bot go under the stage?</Text>
        </View>
        <View style = {styles.switchContainer}>
          <Switch 
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={canBuddyClimb ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleClimb}
            value={canBuddyClimb}
          />
          <Text>Buddy climb?</Text>
        </View>
          <ScrollView style = {styles.scrollView}>
            <TextInput 
              multiline
              style = {styles.comments}
              placeholder = "Additional Comments"
              value={comments}
              onChangeText = {(value) => setComments(value)}
            />
          </ScrollView>
        
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
  },
  input: {
    borderColor: "gray",
    width: "50%",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    marginTop: 30,
    textAlign: 'left',
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    flexGrow: 0,
    height: 60,
  },
  list: {
    flexDirection: 'row',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  comments: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    width: 250,
    maxWidth: 250,
    textAlign: 'left',
  },
  firstrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  home: {
    marginTop: 50,
    marginLeft: 15,
    width: 50,
    height: 50,
  },  
  top: {
    left: '50%',
    marginBottom: 30,
    width: 100,
    maxWidth: 100,
    textAlign: 'center',
  },
  blank: {
    width: 50,
    height:50,
    marginLeft: 'auto',
  },
  L: {
    borderColor: "gray",
    width: "25%",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    textAlign: 'center',
  },
  DimensionRow: {
    columnGap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  }
});
