// --- Global Navigation Logic (Handles current page's active state) ---
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    // Get the current file name (e.g., 'index.html', 'algorithms.html')
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        // Remove active class from all
        link.classList.remove('active');
        // Add active class if the link href matches the current file
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Initialize interactive DS if on the data_structures page
    if (currentPath === 'data_structures.html') {
        initializeStack();
        initializeTree();
    }
});


// --- Logic for Algorithms & Pseudocode Pages (Click-to-Reveal) ---

/**
 * Toggles the visibility of the hidden example/explanation content.
 * @param {HTMLElement} card - The clickable algorithm card element.
 * @param {string} contentId - The ID of the hidden div to show/hide.
 */
function toggleExample(card, contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        card.classList.toggle('active');
        // Simple display toggle for demonstration
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    }
}


// --- Logic for Data Structures Page (Interactive Stack & Tree) ---

// 1. STACK SIMULATION
let stackArray = [];
const MAX_SIZE = 5; 

function initializeStack() {
    stackArray = [];
    document.getElementById('stack-output').textContent = 'Stack is empty.';
    document.getElementById('stack-message').textContent = '';
}

function updateStackDisplay(message = '') {
    const outputElement = document.getElementById('stack-output');
    const messageElement = document.getElementById('stack-message');
    
    if (stackArray.length === 0) {
        outputElement.textContent = 'Stack is empty.';
    } else {
        // Display the stack array from top to bottom
        const display = stackArray.slice().reverse().join(' <- TOP\n');
        outputElement.textContent = display;
    }
    
    // Update message box
    messageElement.textContent = message;
    if (message.includes('Error')) {
        messageElement.className = 'message error';
    } else if (message) {
        messageElement.className = 'message success';
    } else {
        messageElement.className = 'message';
    }
}

function stackPush() {
    const input = document.getElementById('stack-input');
    const value = input.value.trim();
    input.value = ''; // Clear input

    if (!value) {
        updateStackDisplay('Error: Please enter a value to push.');
        return;
    }
    if (stackArray.length >= MAX_SIZE) {
        updateStackDisplay('Error: Stack Overflow! Max size reached (10).');
        return;
    }

    stackArray.push(value);
    updateStackDisplay(`Successfully Pushed: ${value}`);
}

function stackPop() {
    if (stackArray.length === 0) {
        updateStackDisplay('Error: Stack Underflow! Stack is already empty.');
        return;
    }
    const poppedValue = stackArray.pop();
    updateStackDisplay(`Successfully Popped: ${poppedValue}`);
}

function stackPeek() {
    if (stackArray.length === 0) {
        updateStackDisplay('Error: Stack is empty. Cannot Peek.');
        return;
    }
    const topValue = stackArray[stackArray.length - 1];
    updateStackDisplay(`Peeked (Top Element): ${topValue}`);
}


// 2. TREE SIMULATION
/** Node class for the tree structure */
class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

let treeRoot = null;

function initializeTree() {
    // Pre-built tree: Root: 50, Left: 30, Right: 70
    treeRoot = new Node(50);
    treeRoot.left = new Node(30);
    treeRoot.right = new Node(70);
    document.getElementById('tree-output').textContent = 'Click a button to traverse the tree.';
}

// Traversal Logic
function performInorder(node, result) {
    if (node) {
        performInorder(node.left, result);
        result.push(node.val);
        performInorder(node.right, result);
    }
}

function performPreorder(node, result) {
    if (node) {
        result.push(node.val);
        performPreorder(node.left, result);
        performPreorder(node.right, result);
    }
}

function performPostorder(node, result) {
    if (node) {
        performPostorder(node.left, result);
        performPostorder(node.right, result);
        result.push(node.val);
    }
}

function treeTraverse(type) {
    if (!treeRoot) {
        document.getElementById('tree-output').textContent = 'Tree is empty.';
        return;
    }

    let result = [];
    let traversalFunc;
    
    switch (type) {
        case 'inorder':
            traversalFunc = performInorder;
            break;
        case 'preorder':
            traversalFunc = performPreorder;
            break;
        case 'postorder':
            traversalFunc = performPostorder;
            break;
        default:
            return;
    }

    traversalFunc(treeRoot, result);
    document.getElementById('tree-output').textContent = `${type.toUpperCase()} Traversal: ${result.join(' -> ')}`;
}

function treeClear() {
    document.getElementById('tree-output').textContent = 'Output cleared.';
}
