import React, { FC, useState, useEffect } from 'react';
import { Repository } from '../types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabNavigationParamList} from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<TabNavigationParamList, 'Favorite'>;
};

export const FavoriteList: FC<Props> = ({navigation}) => {
  const [favorites, setFavorites] = useState<Repository[]>([]);

  const getData = async () => {
    await getAllKeys()
      .then (async (res) => {
        const list: Repository[] = [];
        for (let i = 0; i < res.length; i++) {
          await getProject(res[i]).then(project => {
            if (project) {
              list.push(JSON.parse(project))
            }
          })
        }
        setFavorites(list)
      })
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, []);

  const getAllKeys = async () => {
    let keys = await AsyncStorage.getAllKeys();
    return keys;
  };

  const getProject = async (id: string) => {
    let project = await AsyncStorage.getItem(id);
    return project;
  };

  useEffect(() => {
    getData();
  }, []);

  const removeValue = async (id: number) => {
    try {
      const str = id.toString();
      await AsyncStorage.removeItem(str);
    } catch (e) {
      return null;
    }
  };

  const deleteItem = (id: number) => {
    removeValue(id);
    getData();
  };

  return (
    <ScrollView style={styles.projects}>
      {favorites.map((project) => (
        <View key={project.id} style={styles.project}>
          <View style={styles.project__info}>
            <Image
              source={{ uri: `${project.owner['avatar_url']}` }}
              style={styles.project__avatar}
            />
            <Text style={styles.project__name}>
              Project:
              <Text
                onPress={() => Linking.openURL(project['html_url'])}
                style={styles.project__link}>
                {project.name}
              </Text>
            </Text>
          </View>
          <Text>{project.description}</Text>
          <View style={styles.extra}>
            <Text>
              &#9734;
              {project['stargazers_count']}
            </Text>
            <Text>
              &#9675;
              {project.language}
            </Text>
          </View>
          <Button
            title="Remove from favorite"
            onPress={() => deleteItem(project.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  project: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    padding: 15,
  },
  project__info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  project__avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  project__link: {
    color: 'blue',
  },
  projects: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  project__name: {
    marginLeft: 40,
    fontSize: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
});
