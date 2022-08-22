import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Line from '../components/UI/Line';
import { IBankBranch } from '../types/bankBranch';

const BankBranchScreen = ({ route, navigation }: any) => {
  const branch: IBankBranch = useMemo(() => ({ ...route.params.branch }), [route.params]);

  return (
    <Layout>
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

      {!!branch.info_bank_bik && <Text>БИК: {branch.info_bank_bik}</Text>}
      {!!branch.info_bank_unp && <Text>УНП: {branch.info_bank_unp}</Text>}
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
});
export default BankBranchScreen;
