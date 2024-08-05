import React, { useState } from 'react';
import TrieNode from './TrieNode';
import Trie from './Trie';

const TrieEditor = () => {
  const [trie, setTrie] = useState(new Trie());
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [output, setOutput] = useState('');

  const handleInsertWord = () => {
    trie.insertWord(word, meaning);
    setWord('');
    setMeaning('');
    setOutput(`Word "${word}" with meaning "${meaning}" inserted successfully.`);
  };

  const handleSaveToFile = () => {
    trie.saveToFile('trie_data.json');
    setOutput('Trie saved to file.');
  };

  const handleLoadFromFile = () => {
    const loadedTrie = new Trie();
    loadedTrie.loadFromFile('trie_data.json');
    setTrie(loadedTrie);
    setOutput('Trie loaded from file.');
  };

  return (
    <div>
      <div>
        <label>
          Word:
          <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
        </label>
        <label>
          Meaning:
          <input type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
        </label>
        <button onClick={handleInsertWord}>Insert Word</button>
      </div>
      <div>
        <button onClick={handleSaveToFile}>Save Trie to File</button>
        <button onClick={handleLoadFromFile}>Load Trie from File</button>
      </div>
      <div>
        <h3>Trie State:</h3>
        <pre>{JSON.stringify(trie.root, null, 2)}</pre>
      </div>
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default TrieEditor;
