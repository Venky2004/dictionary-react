class TrieNode {
    constructor() {
        this.children = new Array(26);
        this.isEOW = false;
    }
}

class Trie {
    constructor() {
        this.ALPHA_SIZE = 26;
        this.root = this.loadFromLocalStorage() || new TrieNode();
    }

    insertWord(word) {
        console.log("Inserting " + word);
        let temp = this.root;

        for (let i = 0; i < word.length; i++) {
            const ch = word.charAt(i);
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);

            if (!temp.children[idx]) {
                const newNode = new TrieNode();
                temp.children[idx] = newNode;
            }

            temp = temp.children[idx];
        }

        temp.isEOW = true;
        this.saveToLocalStorage(); // Save Trie data to local storage after each insertion
        return true;
    }

    checkword(word) {
        let temp = this.root;

        for (let i = 0; i < word.length; i++) {
            const ch = word.charAt(i);
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);

            if (!temp.children[idx]) {
                return false;
            }

            temp = temp.children[idx];
        }

        return temp.isEOW;
    }

    getAllWords() {
        const ans = [];
        const path = '';

        this.helper(this.root, path, ans);
        return ans;
    }

    helper(root, path, ans) {
        if (root.isEOW) {
            ans.push(path);
        }

        for (let i = 0; i < this.ALPHA_SIZE; i++) {
            if (root.children[i]) {
                const ch = String.fromCharCode(i + 'a'.charCodeAt(0));
                const newPath = path + ch;
                this.helper(root.children[i], newPath, ans);
            }
        }
    }

    insertWordsThroughFile(fileContent) {
        const words = fileContent.split('\n');

        for (const word of words) {
            console.log(this.insertWord(word.trim()));
        }

        return true;
    }

    autoSuggest(prefix) {
        const ans = [];
        let temp = this.root;

        for (const ch of prefix) {
            const idx = ch.charCodeAt(0) - 'a'.charCodeAt(0);

            if (!temp.children[idx]) {
                return ans;
            }

            temp = temp.children[idx];
        }

        const path = prefix;
        this.helper(temp, path, ans);
        return ans;
    }

    saveToLocalStorage() {
        const trieState = { root: this.root };
        localStorage.setItem('trieState', JSON.stringify(trieState));
    }

    loadFromLocalStorage() {
        const savedTrieState = localStorage.getItem('trieState');
        return savedTrieState ? JSON.parse(savedTrieState).root : null;
    }
}

export { Trie, TrieNode };
