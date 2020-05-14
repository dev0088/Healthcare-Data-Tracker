import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import commonStyles from '~/common/styles';
import { Button } from '~/common/components';
import { W, H, em, colors } from '~/common/constants';
import styles from './HRViewStyle';
import { getAllHeartRates, addHeartRate } from '~/common/services/rn-firebase/database';
import { getCurrentTime } from '~/common/utils/time';

const emptyData = {
  labels: ['0'],
  datasets: [{
    data: [ 0 ],
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
    heartRate: '0',
    adding: false,
    heartRates: null
  };

  UNSAFE_componentWillMount() {
    const _this = this;
    getAllHeartRates().then(res => {
      console.log('====== getAllHeartRates: res: ', res);
      _this.setState({heartRates: res || null});
    });
  }

  convertToChartData = (hrs) => {
    const hrsKeys = Object.keys(hrs);
    var labels = [];
    var values = [];
    
    for (var i = 0; i < hrsKeys.length; i++) {
      const bp = hrs[hrsKeys[i]];
      labels.push(bp.TimeStamp);
      values.push(bp.Value);
    }

    return {
      labels,
      datasets: [
        {
          data: values,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };
  };


  onChangeEdit = (name, value) => this.setState({[name]: value});

  onAdd = () => {
    const { heartRate } = this.state;
    const newHeartRate = {
      TimeStamp: getCurrentTime(),
      Value: parseInt(heartRate)
    };
    const _this = this;
    this.setState({adding: true}, () => {
      addHeartRate(newHeartRate).then(res => {
        var message = 'This value was added successfully.';
        if (!res) {
          message = 'It was failed to add this. Please try again, later.';
        }
        Alert.alert(message);  
        this.setState({adding: false});
        getAllHeartRates().then(res => {
          _this.setState({heartRates: res || null});
        });
      });  
    });
  }

  render() {
    const { _t } = this.props.appActions
    const { heartRate, adding, heartRates } = this.state;
    const chartData = heartRates ? this.convertToChartData(heartRates) : null;

    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <View style={styles.addContainer}>
            <Text style={styles.sectionTitle}>{getCurrentTime()}</Text>
          </View>
          <View style={styles.addContainer}>
            <View style={styles.addSection}>
              <TextInput
                style={[
                  commonStyles.textInput.default,
                  commonStyles.text.default,
                  styles.addEdit
                ]} 
                placeholderTextColor={colors.placeholderText}
                value={heartRate}
                onChangeText={(heartRate) => this.onChangeEdit('heartRate', heartRate)}
                keyboardType={'decimal-pad'}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                disabled={adding}
              />
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
            {heartRates &&
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

