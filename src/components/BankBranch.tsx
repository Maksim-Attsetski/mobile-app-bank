import React, { ChangeEvent, useMemo, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import useBankBranch from '../hooks/useBankBranch';
import { TypeNavigation } from '../navigation/navTypes';
import Button from './UI/Button';
import Input from './UI/Input';
import Loader from './UI/Loader';
import Title from './UI/Title';

interface INav {
  navigation: {
    navigate: (screen: keyof TypeNavigation, arg?: any) => void;
  };
}

const BankBranch = ({ navigation }: INav) => {
  const { isBankBranchesLoading, bankBranches } = useBankBranch();
  const [query, setQuery] = useState<string>('');

  const searchedBranches = useMemo(
    () => [...bankBranches].filter(branch => branch.street.includes(query)),
    [bankBranches, query]
  );

  return isBankBranchesLoading ? (
    <Loader size='small' />
  ) : (
    <View>
      <Title text='Отделения банков' style={{ marginBottom: 10 }} />
      <Input
        value={query}
        onChangeText={(value: string) => setQuery(value)}
        placeholder='Поиск по улице'
        style={{ marginBottom: 10 }}
      />
      <Button onPress={() => navigation.navigate('AllBankBranches')} style={{ marginBottom: 10 }}>
        Посмотреть все отделения на карте
      </Button>
      <View>
        {searchedBranches.map(branch => (
          <View key={branch.filial_id} style={styles.branch}>
            <View>
              <Text>{branch.filial_name}</Text>
              <Text>
                {branch.street_type} , {branch.street} {branch.home_number}
              </Text>
            </View>
            <Button style={{ marginVertical: 7 }} onPress={() => navigation.navigate('BankBranch', { branch })}>
              Подробнее
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  branch: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default BankBranch;
