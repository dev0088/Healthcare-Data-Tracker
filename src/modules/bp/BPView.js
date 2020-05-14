import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import commonStyles from '~/common/styles';
import { Button, Spacer } from '~/common/components';
import { W, H, em, colors } from '~/common/constants';
import styles from './BPViewStyle';
import { getAllBloodPressures, addBloodPressure } from '~/common/services/rn-firebase/database';
import { getCurrentTime } from '~/common/utils/time';

const emptyData = {
  labels: ['0'],
  datasets: [{
    data: [0],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    strokeWidth: 2
  }]
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

export default class DashboardView extends React.Component {
  state = {
    systolic: '0',
    diastolic: '0',
    adding: false,
    bloodPressures: null
  };

  UNSAFE_componentWillMount() {
    const _this = this;
    getAllBloodPressures().then(res => {
      console.log('====== getAllBloodPressures: res: ', res);
      _this.setState({bloodPressures: res || null});
    });
  }

  convertToChartData = (bps) => {
    const bpsKeys = Object.keys(bps);
    var labels = [];
    var systolics = [];
    var diastolics = [];
    
    for (var i = 0; i < bpsKeys.length; i++) {
      const bp = bps[bpsKeys[i]];
      labels.push(bp.TimeStamp);
      systolics.push(bp.Systolic);
      diastolics.push(bp.Diastolic);
    }

    return {
      labels,
      datasets: [
        {
          data: systolics,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        },
        {
          data: diastolics,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        },
      ]
    };
  };

  onChangeEdit = (name, value) => this.setState({[name]: value});

  onAdd = () => {
    const { systolic, diastolic } = this.state;
    const newBloodPressure = {
      TimeStamp: getCurrentTime(),
      Systolic: parseInt(systolic),
      Diastolic: parseInt(diastolic)
    };
    const _this = this;
    this.setState({adding: true}, () => {
      addBloodPressure(newBloodPressure).then(res => {
        var message = 'This value was added successfully.';
        if (!res) {
          message = 'It was failed to add this. Please try again, later.';
        }
        Alert.alert(message);  
        _this.setState({adding: false});
        getAllBloodPressures().then(res => {
          _this.setState({bloodPressures: res || null});
        });
      })
    });
  };

  render() {
    const { _t } = this.props.appActions
    const { bloodPressures, systolic, diastolic, adding } = this.state;
    const chartData = bloodPressures ? this.convertToChartData(bloodPressures) : emptyData;

    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.addContainer}>
            <Text style={styles.sectionTitle}>{getCurrentTime()}</Text>
          </View>
          <View style={styles.addContainer}>
            <View style={styles.addSection}>
              <View style={styles.addEditsContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 90*em
                  }}
                >
                  <TextInput
                    style={[
                      commonStyles.textInput.default,
                      commonStyles.text.default,
                      styles.addEdit
                    ]} 
                    placeholderTextColor={colors.placeholderText}
                    value={systolic}
                    onChangeText={(text) => this.onChangeEdit('systolic', text)}
                    keyboardType={'decimal-pad'}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    disabled={adding}
                  />
                  <Spacer size={10} />
                  <TextInput
                    style={[
                      commonStyles.textInput.default,
                      commonStyles.text.default,
                      styles.addEdit
                    ]} 
                    placeholderTextColor={colors.placeholderText}
                    value={diastolic}
                    onChangeText={(text) => this.onChangeEdit('diastolic', text)}
                    keyboardType={'decimal-pad'}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    disabled={adding}
                  />
                </View>
              </View>
              <View style={styles.addButton}>
                <Button
                  caption={_t('Add')}
                  containerHeight={40*em}
                  onPress={this.onAdd}
                  loading={adding}
                  disabled={adding}
                />
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            {bloodPressures &&
              <LineChart
                data={chartData}
                width={(W-120)*em}
                height={(H/3)*em}
                chartConfig={chartConfig}
              />
            }
          </View>
        </View> 
      </View>
    )
  }
}

