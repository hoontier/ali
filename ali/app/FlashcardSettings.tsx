//FlashcardSettings.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './features/store';
import { updateSettings, setShowSettings } from './features/flashcardSlice';

type CardKey = 'simplified' | 'traditional' | 'pinyin' | 'english' | 'structure' ;

const FlashcardSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { settings, showSettings } = useSelector((state: RootState) => state.flashcard);

  const [front, setFront] = useState<CardKey[]>(settings.front);
  const [back, setBack] = useState<CardKey[]>(settings.back);
  const [dropdownVisible, setDropdownVisible] = useState<null | 'front' | 'back'>(null);

  const options: CardKey[] = ['simplified', 'traditional', 'pinyin', 'english', 'structure' ];

  const handleSaveSettings = () => {
    dispatch(updateSettings({ front, back }));
    dispatch(setShowSettings(false));
  };

  const handleClose = () => {
    dispatch(setShowSettings(false));
  };

  const handleSelect = (value: CardKey, type: 'front' | 'back') => {
    if (type === 'front') {
      const newSelections = front.includes(value) ? front.filter(key => key !== value) : [...front, value];
      setFront(newSelections);
    } else {
      const newSelections = back.includes(value) ? back.filter(key => key !== value) : [...back, value];
      setBack(newSelections);
    }
  };

  const renderDropdownItem = (item: CardKey, type: 'front' | 'back') => {
    const isSelected = type === 'front' ? front.includes(item) : back.includes(item);
    return (
      <TouchableOpacity
        style={[styles.dropdownItem, isSelected && { backgroundColor: '#ADD8E6' }]}
        onPress={() => handleSelect(item, type)}
      >
        <Text style={styles.dropdownItemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={showSettings} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Flashcard Settings</Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.label}>Front:</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible('front')}>
              <Text style={styles.dropdownText}>{front.join(', ')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.label}>Back:</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible('back')}>
              <Text style={styles.dropdownText}>{back.join(', ')}</Text>
            </TouchableOpacity>
          </View>
          {dropdownVisible && (
            <Modal transparent={true}>
              <TouchableOpacity style={styles.dropdownOverlay} onPress={() => setDropdownVisible(null)}>
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => renderDropdownItem(item, dropdownVisible)}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSaveSettings} />
            <Button title="Cancel" onPress={handleClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACBAE0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACBAE0',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default FlashcardSettings;
