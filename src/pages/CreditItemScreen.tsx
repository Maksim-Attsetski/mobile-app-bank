import { FC, useEffect, useMemo } from 'react';
import { Text, StyleSheet, View, StyleProp } from 'react-native';
import { ICredit } from '../types/credit';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Line from '../components/UI/Line';
import Title from '../components/UI/Title';

const FlexItem = ({
  text1,
  text2,
  flexStyle = {},
}: {
  text1: string;
  text2: string | null;
  flexStyle?: StyleProp<any>;
}) => {
  return (
    <View style={{ ...styles.flex, ...flexStyle }}>
      <Text style={styles.creditItem}>{text1}</Text>
      {text2 && <Text style={styles.creditItem}>{text2}</Text>}
    </View>
  );
};

const CreditItemScreen: FC = ({ route, navigation }: any) => {
  const credit: ICredit = useMemo(() => ({ ...route.params.credit }), [route.params]);

  return (
    <Layout>
      <Button onPress={() => navigation.goBack()} filled style={{ marginBottom: 10, alignSelf: 'flex-end' }}>
        Назад
      </Button>
      <Title text={`Название: "${credit.group_name_ru}"`} style={styles.title} />

      <Line />

      <FlexItem
        flexStyle={{ alignItems: 'center' }}
        text1={`Тип: ${credit.kredit_type}, ${credit.val_key}`}
        text2={null}
      />
      <Line />

      <FlexItem flexStyle={{ justifyContent: 'center' }} text1={'Срок кредита'} text2={`${credit.inf_time} м.`} />
      <FlexItem
        flexStyle={{ justifyContent: 'center' }}
        text1={'% ставка годовых'}
        text2={`${credit.inf_proc_formula}%`}
      />

      <Line />

      <FlexItem text1={'Отсрочка платежа по основному долгу'} text2={`${credit.inf_odolg} м.`} />
      <FlexItem text1={'Отсрочка платежа по процентам'} text2={`${credit.inf_oproc} м.`} />
      <FlexItem
        text1={'Макс. размер кредита'}
        text2={credit.inf_max_size === 0 ? ' не ограничено' : `${credit.inf_max_size} BYN`}
      />
      <FlexItem text1={'Уплата процентов'} text2={credit.platName} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
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
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default CreditItemScreen;
