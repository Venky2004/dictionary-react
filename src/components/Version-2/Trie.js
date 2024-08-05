// Trie.js
import TrieNode from './TrieNode';
import fs from 'fs';

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insertWord(word, meaning) {
    let temp = this.root;

    for (let i = 0; i < word.length; i++) {
      const ch = word.charAt(i);

      if (!temp.children[ch]) {
        temp.children[ch] = new TrieNode();
      }

      temp = temp.children[ch];
    }

    temp.isEOW = true;
    temp.meaning = meaning;
  }

  serialize() {
    return JSON.stringify(this.root);
  }

  deserialize(serializedData) {
    this.root = JSON.parse(serializedData);
  }

  saveToFile(filePath) {
    const serializedData = this.serialize();
    fs.writeFileSync(filePath, serializedData, 'utf-8');
  }

  loadFromFile(filePath) {
    const serializedData = fs.readFileSync(filePath, 'utf-8');
    this.deserialize(serializedData);
  }
}

export default Trie;
