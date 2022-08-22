import React, { ChangeEvent, useMemo, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import useBankBranch from '../hooks/useBankBranch';
import { TypeNavigation } from '../navigation/navTypes';
import Input from './UI/Input';
import Loader from './UI/Loader';
import Title from './UI/Title';

interface INav {
  navigation: {
    navigate: (screen: keyof TypeNavigation, arg: any) => void;
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
    <Loader />
  ) : (
    <View>
      <Title text='Отделения банков' style={{ marginBottom: 10 }} />
      <Input
        value={query}
        onChangeText={(value: string) => setQuery(value)}
        placeholder='Поиск по улице'
        style={{ marginBottom: 10 }}
      />
      <View>
        {searchedBranches.map(branch => (
          <View key={branch.filial_id} style={styles.branch}>
            <Text>{branch.filial_name}</Text>
            <Text>
              {branch.street_type} , {branch.street} {branch.home_number}
            </Text>
            <Pressable onPress={() => navigation.navigate('BankBranch', { branch })}>
              <Text>Подробнее</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  branch: {
    borderColor: '#5460fe',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default BankBranch;
