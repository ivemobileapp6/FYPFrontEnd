import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const WordBlanker = () => {
  const [inputText, setInputText] = useState('');
  const [processedTexts, setProcessedTexts] = useState([]);
  const [suggestions, setSuggestions] = useState({});

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddText = () => {
    let words = inputText.split(' ').map(word => ({ text: word, isBlank: false }));
    setProcessedTexts([...processedTexts, words]);
    setInputText('');
    setSuggestions({ ...suggestions, [processedTexts.length]: [] });
  };

  const handleWordClick = (textIndex, wordIndex) => {
    let newProcessedTexts = [...processedTexts];
    newProcessedTexts[textIndex][wordIndex].isBlank = !newProcessedTexts[textIndex][wordIndex].isBlank;
    setProcessedTexts(newProcessedTexts);
  };

  const handleSuggestionChange = (textIndex, blankIndex, event) => {
    let newSuggestions = {...suggestions};
    newSuggestions[textIndex][blankIndex] = event.target.value;
    setSuggestions(newSuggestions);
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    text: {
      fontSize: 13,
      lineHeight: 1.5
    }
  });

  const MyDocument = (
    <Document>
      {processedTexts.map((text, textIndex) => (
        <Page key={textIndex} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>
              {text.map((word, wordIndex) => word.isBlank ? `_____${text.filter(word => word.isBlank).indexOf(word)+1}____` : word.text).join(' ')}
            </Text>
            {suggestions[textIndex] && suggestions[textIndex].map((suggestion, blankIndex) => 
              <Text key={blankIndex} style={styles.text}>{`Blank ${blankIndex+1}: ${suggestion}`}</Text>
            )}
          </View>
        </Page>
      ))}
    </Document>
  );

  return (
    <div>
      <input 
        type="text" 
        value={inputText} 
        onChange={handleInputChange} 
        style={{ width: '100%', boxSizing: 'border-box' }} 
      />
      <button onClick={handleAddText}>Add Text</button>

      {processedTexts.map((text, textIndex) => (
        <div key={textIndex}>
          <p style={{
            overflowWrap: 'break-word', 
            wordWrap: 'break-word' 
          }}>
            {text.map((word, wordIndex) => (
              <span
                key={wordIndex}
                onClick={() => handleWordClick(textIndex, wordIndex)}
                style={{ marginRight: '5px', cursor: 'pointer' }}
              >
                {word.isBlank ? `_____${text.filter(word => word.isBlank).indexOf(word)+1}____` : word.text}
              </span>
            ))}
          </p>
          {text.filter(word => word.isBlank).map((_, blankIndex) => (
            <div key={blankIndex}>
              <label>
                {"Suggestion for blank " + (blankIndex+1) + ": "}
                <input
                  type="text"
                  onChange={(e) => handleSuggestionChange(textIndex, blankIndex, e)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </label>
            </div>
          ))}
        </div>
      ))}

      <PDFDownloadLink document={MyDocument} fileName="fill_in_the_blank.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default WordBlanker;