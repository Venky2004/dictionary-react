// TrieEditor.jsx

import React, { useState } from 'react';
import { Trie } from "./Trie"; // Adjust the path accordingly

const TrieEditor = () => {
  const [trie, setTrie] = useState(new Trie());
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInsertWord = () => {
    trie.insertWord(inputText);
    setInputText('');
    setOutputText(`Word ${inputText} Inserted`);
  };

  const handleCheckWord = () => {
    const exists = trie.checkword(inputText);
    setOutputText(`Word "${inputText}" ${exists ? 'exists' : 'does not exist'} in the Trie.`);
    setInputText('');
  };

  const handleInsertFromFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        if (trie.insertWordsThroughFile(fileContent)) {
          setOutputText("All Words in the File Are inserted.");
        } else {
          setOutputText("Error inserting words from the file.");
        }
        setInputText('');
      };

      reader.readAsText(file);
    } else {
      setOutputText("No file selected.");
    }
  };

  const handleAutoSuggest = () => {
    const suggestions = trie.autoSuggest(inputText);
    setOutputText(`Auto-suggestions: ${suggestions.join(', ')}`);
    setInputText('');
  };

  const handleGetAllWords = () => {
    const words = trie.getAllWords();
    setOutputText(`All words: ${words.join(', ')}`);
    setInputText('');
  };

  return (
    <div>
      <h2>Trie Text Editor</h2>
      <textarea
        placeholder="Enter text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button onClick={handleInsertWord}>Insert Word</button>
      <button onClick={handleCheckWord}>Check Word</button>
      <input type="file" onChange={handleInsertFromFile} />
      <button onClick={handleAutoSuggest}>Auto Suggest</button>
      <button onClick={handleGetAllWords}>Show all Words</button>
      <br />
      <div>
        <h3>Output:</h3>
        <pre>{outputText}</pre>
      </div>
    </div>
  );
};

export default TrieEditor;
