import React, { useEffect, useMemo } from 'react';
import { Text, View, StyleSheet, StyleProp, Dimensions } from 'react-native';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Line from '../components/UI/Line';
import { IBankBranch } from '../types/bankBranch';
import MapView, { Callout, Marker } from 'react-native-maps';

const FlexItem = ({
  text1,
  text2,
  style = {},
  flexStyle = {},
}: {
  text1: string;
  text2: string;
  style?: StyleProp<any>;
  flexStyle?: StyleProp<any>;
}): any => {
  return (
    !!text2 && (
      <View style={{ marginBottom: 10, ...flexStyle }}>
        <Text style={{ ...styles.text, ...style }}>{text1}</Text>
        <Text style={{ ...styles.creditItem, ...style }}>{text2}</Text>
      </View>
    )
  );
};

const BankBranchScreen = ({ route, navigation }: any) => {
  const branch: IBankBranch = useMemo(() => ({ ...route.params.branch }), [route.params]);

  return (
    <Layout isScroll>
      <View style={{ ...styles.flex, marginBottom: 10 }}>
        <Text style={styles.creditItem}>{branch.filial_name}</Text>
        <Button onPress={() => navigation.goBack()}>Назад</Button>
      </View>
      <Line />
      <View style={{ ...styles.flex, justifyContent: 'flex-end' }}>
        <Text style={{ ...styles.creditItem }}>
          {branch.street_type} , {branch.street} {branch.home_number}
        </Text>
      </View>

      <View>
        <FlexItem text1={'БИК: '} text2={branch.info_bank_bik} />
        <FlexItem text1={'УНП: '} text2={branch.info_bank_unp} />
        <FlexItem text1={''} text2={branch.info_text} />
        <FlexItem text1={'Бел. счёт:'} text2={branch.bel_number_schet} />
        <FlexItem text1={'Иностранный счёт:'} text2={branch.foreign_number_schet} />
        <FlexItem text1={'Рабочик график:'} text2={branch.info_worktime} />
        <FlexItem text1={'Телефон:'} text2={branch.phone_info} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: +branch.GPS_X,
          longitude: +branch.GPS_Y,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: +branch.GPS_X,
            longitude: +branch.GPS_Y,
          }}
        >
          <Callout>
            <Text>{branch.filial_name}</Text>
          </Callout>
        </Marker>
      </MapView>
      <Line />
      <Button onPress={() => navigation.navigate('AllBankBranches')}>Посмотреть все отделения</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  creditItem: {
    backgroundColor: '#5460FE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
    marginRight: 5,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
  },
});
export default BankBranchScreen;
