import React, { FC,  useState, useEffect } from 'react';
import { Repository } from '../types';
import { StyleSheet, Text, View, Image, ScrollView, Linking, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  repos: Repository[];
}

export const ProjectsList: FC<Props> = React.memo(
  ({repos}) => {
    const storeData = async (project: Repository) => {
      try {
        await AsyncStorage.setItem(project.id.toString(), JSON.stringify(project));
      } catch (e) {
        return project;
      }
    }

    return (
    <ScrollView style={styles.projects}>
      {repos.map((project) => (
        <View key={project.id} style={styles.project}>
          <View style={styles.project__info}>
            <Image source={{uri: `${project.owner["avatar_url"]}`}} style={styles.project__avatar}/>
            <Text style={styles.project__name}>
              Project:
              <Text onPress={() => Linking.openURL(project['html_url'])} style={styles.project__link}>{project.name}</Text>
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
            title="Add to favorite"
            onPress={() => storeData(project)}
          />
        </View>
      ))}
    </ScrollView>
  )
});

const styles = StyleSheet.create({
  project: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    padding: 15
  },
  project__info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:5,
    marginBottom: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  project__avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  project__link: {
    color: 'blue',
  },
  projects: {
    marginBottom: 130,
  },
  project__name: {
    marginLeft: 40,
    fontSize: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  extra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5
  }
});