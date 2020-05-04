class Node {
    value: any;
    next: any;
    constructor(value: any) {
        this.value = value;
        this.next = null;
    }
};

class Queue {
  head: any;
  tail: any;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value: any) {
    let newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  dequeue() {
    if (!this.head) return this;
    if (this.length === 1) {
      this.tail = null;
    }
    this.head = this.head.next;
    this.length--;
    return this;
  }

  serialize() { 
    let serializedArray: any[] = [];
    if(this.length === 0) return serializedArray;
    let currentNode = this.head;
    while(currentNode){
        serializedArray.push(currentNode.value);
        currentNode = currentNode.next;
    }
    return serializedArray;
  }

  deserialize(data: any[]) {
    let newQueue = new Queue();
    data.forEach((datum) => newQueue.enqueue(datum));
    return newQueue;
  }

  peek() {
    return this.head;
  }
};

export default Queue;