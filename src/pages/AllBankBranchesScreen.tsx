import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Loader from '../components/UI/Loader';
import useBankBranch from '../hooks/useBankBranch';

const AllBankBranchesScreen = ({ navigation }: any) => {
  const { bankBranches, isBankBranchesLoading } = useBankBranch();

  return isBankBranchesLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.9045,
          longitude: 27.5615,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {bankBranches.map(branch => (
          <Marker
            key={branch.filial_id}
            coordinate={{
              latitude: +branch.GPS_X,
              longitude: +branch.GPS_Y,
            }}
          >
            <Callout>
              <Text>{branch.filial_name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Button style={styles.backBtn} textStyle={{ color: '#fff' }} onPress={() => navigation.goBack()}>
        Назад
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  backBtn: {
    position: 'absolute',
    top: '5%',
    right: 10,
    zIndex: 1111,
    backgroundColor: '#5460fe',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.92,
  },
});

export default AllBankBranchesScreen;
