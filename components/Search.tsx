import React, { useState, useEffect, useMemo } from 'react';
// import { useDebounce } from 'use-debounce';
import { findProject } from '../api';
import { ProjectsList} from './ProjectsList';
import { Selector } from './Selector';
import { Repository } from '../types';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [language, setLanguage] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        findProject(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setRepos(results);
        });
      } else {
        setRepos([]);
      }
    },
    [debouncedSearchTerm]
  );

  const filter = (itemValue) => {
    setLanguage(itemValue);
  }

  const getVisibleRepos = () => {
    if (language) {
      return repos.filter(repo => repo.language === language)
    }

    return repos;
  };

  const visibleRepos = useMemo (
    getVisibleRepos,
    [language, repos]
  )

  return (
    <View
      style={styles.search}
    >
      <TextInput
        style={styles.input}
        placeholder="Find a project"
        onChangeText={text => setSearchTerm(text)}
      />
      {repos.length !== 0 && <Selector repos={repos} filter={filter} language={language}/>}
      {isSearching && <Text style={{textAlign: 'center'}}>Searching ...</Text>}
      <ProjectsList repos={visibleRepos} />
    </View>
  );
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

const styles = StyleSheet.create({
  search: {
    margin: 20
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    marginBottom: 10,
    marginTop: 30
  }
});