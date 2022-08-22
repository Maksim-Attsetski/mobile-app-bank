import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import Layout from '../components/Layout';
import Loader from '../components/UI/Loader';
import Title from '../components/UI/Title';
import useNews from '../hooks/useNews';

const NewsScreen = () => {
  const { news, isNewsLoading } = useNews();

  return isNewsLoading ? (
    <Loader />
  ) : (
    <Layout isScroll>
      <Title text='Новости' style={{ marginBottom: 15 }} />

      {news &&
        news.map((item, i) => (
          <View key={i} style={styles.news}>
            <View style={{ ...styles.flex, marginBottom: 10 }}>
              <Text>{item.name_ru}</Text>
              <Image source={{ uri: item.img }} />
            </View>
            <WebView source={{ html: item.html_ru }} />
            <Text style={styles.date}>{item.start_date}</Text>
          </View>
        ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  news: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  date: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default NewsScreen;
