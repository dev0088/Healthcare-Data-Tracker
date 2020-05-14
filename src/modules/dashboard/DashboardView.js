import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import styles from './DashboardViewStyle';

const templates = [
  {
    title: 'Heart Rate',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Pressure',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
  {
    title: 'Hours Slept',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Sugar',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
  {
    title: 'Heart Rate',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Pressure',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
  {
    title: 'Hours Slept',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Sugar',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
  {
    title: 'Heart Rate',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Pressure',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
  {
    title: 'Hours Slept',
    description: 'descriptions...',
    path: 'heartRate'
  },
  {
    title: 'Blood Sugar',
    description: 'descriptions...',
    path: 'bloodPressure'
  },
]

export default class DashboardView extends React.Component {
  onClickItem = (path) => {
    Actions['dashboard']({type: ActionConst.RESET});
    Actions[path]();
  }
  
  render() {
    var contents = [];
    for(var i = 0; i < templates.length; i +=2) {
      const template1 = templates[i];
      const template2 = templates[i + 1];
      contents.push(
        <View style={styles.row} key={i}>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => this.onClickItem(template1.path)}
          >
            <View style={styles.sectionContainer} >
              <Text style={styles.sectionTitle}>{template1.title}</Text>
              <Text style={styles.sectionDescription}>{template1.description}</Text>
            </View>
          </TouchableOpacity>
          { template2 && 
            <TouchableOpacity
              style={styles.tile}
              onPress={() => this.onClickItem(template2.path)}
            >
              <View style={styles.sectionContainer} >
                <Text style={styles.sectionTitle}>{template2.title}</Text>
                <Text style={styles.sectionDescription}>{template2.description}</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
      );
    }
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        {contents}
      </ScrollView>
    )
  }
}
