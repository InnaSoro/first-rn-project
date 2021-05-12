import React, { FC, useState, useEffect } from 'react';
import { Repository } from '../types';
import { StyleSheet} from "react-native";
import {Picker} from '@react-native-picker/picker';

interface Props {
  repos: Repository[];
  filter: (itemValue: string) => void;
  language: string;
}

export const Selector: FC<Props> = ({repos, filter, language}) => {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const all = repos.map(project => project.language);
    const set = new Set(all);
    setLanguages(Array.from(set));
  },[])

  return (
    <Picker
      selectedValue={language}
      style={styles.picker}
      onValueChange={filter}
    >
      <Picker.Item value='' label='All'/>
      {languages.map(item => (
        <Picker.Item key={item} value={item} label={item}/>
      ))}
    </Picker>
  )
}

const styles = StyleSheet.create({
  picker: {
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 25,
    fontSize: 15,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    marginBottom: 10
  },
});

