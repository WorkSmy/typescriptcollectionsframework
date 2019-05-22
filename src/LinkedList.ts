/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {AllFieldCollectable} from "./AllFieldCollectable";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collectable} from "./Collectable";
import {Collection} from "./Collection";
import {Collections} from "./Collections";
import {Consumer} from "./Consumer";
import {Deque} from "./Deque";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableList} from "./ImmutableList";
import {JIterator} from "./JIterator";
import {List} from "./List";
import {Queue} from "./Queue";

/**
 * Doubly-linked list implementation of the List, Queue, and Deque interfaces.
 *
 * All of the operations perform as could be expected for a doubly-linked list.
 * Operations that index into the list will traverse the list from the beginning or the end, whichever is closer to the specified index.
 *
 * This class corresponds to java.util.LinkedList
 */
export class LinkedList<T> implements List<T>, Queue<T>, Deque<T> {
  private firstNode:LinkedListNode<T>;
  private lastNode:LinkedListNode<T>;
  private numberElements:number;
  private equality:Collectable<T>;

  constructor(iEquals:Collectable<T> = AllFieldCollectable.instance, private initialElements?:ImmutableCollection<T>) {
    this.equality = iEquals;
    this.firstNode = null;
    this.lastNode = null;
    this.numberElements = 0;

    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:T = iter.next ();
        this.add (t);
      }
    }
  }

  /**
  * Returns the Collectible
  * @return {Collectable}
  */
  public getCollectable () : Collectable<T> {
    return this.equality;
  }

 /**
  * Appends the specified element to the end of this list
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  public add (t:T) : boolean {
    const lln:LinkedListNode<T> = new LinkedListNode<T>(t);

    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      this.firstNode = lln;
      this.lastNode = lln;
      this.numberElements = 1;
      return true;
    }

    this.lastNode.nextNode = lln;
    lln.previousNode = this.lastNode;
    this.lastNode = lln;
    this.numberElements = this.numberElements + 1;
    return true;
  }


    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addFirst (t:T) : boolean {
      const lln:LinkedListNode<T> = new LinkedListNode<T>(t);

      if ((this.firstNode === null) || (this.firstNode === undefined)) {
        this.firstNode = lln;
        this.lastNode = lln;
        this.numberElements = 1;
        return true;
      }

      this.firstNode.previousNode = lln;
      lln.nextNode = this.firstNode;
      this.firstNode = lln;
      this.numberElements = this.numberElements + 1;
      return true;
    }

    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addLast (t:T) : boolean {
      return this.add (t);
    }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  * Needed to implement Queue interface
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  public offer (t:T) : boolean {
    return this.add (t);
  }


  /**
  * Inserts the specified element at the front of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  public offerFirst (t:T) : boolean {
    return this.addFirst (t);
  }

  /**
  * Inserts the specified element at the end of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  public offerLast (t:T) : boolean {
    return this.addLast (t);
  }

 /**
  * Inserts the specified element at the specified position in this list. 
  * 
  * Shifts the element currently at that position (if any) 
  * and any subsequent elements to the right (adds one to their indices).
  * @param {number} index index at which the specified element is to be inserted
  * @param {T} t element to be inserted
  */
  public addIndex (index:number, t:T) : void {
    if (index === 0) {
      const newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
      newnode.nextNode = this.firstNode;
      if (this.firstNode !== null)
        this.firstNode.previousNode = newnode;
      this.firstNode = newnode;
      this.numberElements = this.numberElements + 1;
      return;
    }
    if (index >= this.numberElements) {
      const newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
      if (this.lastNode !== null) {
        this.lastNode.nextNode = newnode;
      }
      newnode.previousNode = this.lastNode;
      this.lastNode = newnode;
      this.numberElements = this.numberElements + 1;
      return;
    }
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    let previousnode:LinkedListNode<T> = null;
    while ((node !== null) && (node !== undefined)) {
      if (index === offset) {
        const newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
        newnode.nextNode = node;
        newnode.previousNode = previousnode;
        node.previousNode = newnode;
        if (previousnode !== null) {
          previousnode.nextNode = newnode;
        }
        this.numberElements = this.numberElements + 1;
        return;
      } else {
        previousnode = node;
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return;
  }


 /**
  * Returns true if this list contains no elements.
  * @return {boolean} true if this list contains no elements
  */
  public isEmpty () : boolean {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return true;
    }

    return false;
  }


 /**
  * Removes all of the elements from this list. The list will be empty after this call returns.
  */
  public clear () : void {
    this.firstNode = null;
    this.lastNode = null;
    this.numberElements = 0;
  }

/**
 * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. 
 * 
 * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). 
 * 
 * Exceptions thrown by the action are relayed to the caller.
 * @param {Consumer} consumer - the action to be performed for each element
 */
 public forEach(consumer:Consumer<T>) : void {
   for (const iter:JIterator<T> = this.iterator(); iter.hasNext(); ) {
     const t:T = iter.next();
     consumer.accept(t);
   }
  }

 /**
  * Returns the number of elements in this list.
  * @return {number} the number of elements in this list
  */
  public size () : number {
    return this.numberElements;
  }


 /**
  * Returns true if this list contains the specified element.
  * @param {T} t element whose presence in this list is to be tested
  * @return {boolean} true if this list contains the specified element
  */
  public contains (t:T) : boolean {
    const lln:LinkedListNode<T> = this.getNode(t);
    if (lln === null)
      return false;
    return true;
  }

  private getNode(t:T) : LinkedListNode<T> {
    let node = this.firstNode;
    while ((node !== null) && (node !== undefined)) {
      if (this.equality.equals (node.payload, t)) {
        return node;
      } else {
        node = node.nextNode;
      }
    }
    return null;
  }

 /**
  * Removes the first occurrence of the specified element from this list, if it is present. 
  * 
  * If the list does not contain the element, it is unchanged. 
  * More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {T} t element to be removed from this list, if present
  * @return {T} true if this list contained the specified element
  */
  public remove (t:T) : boolean {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return false;
    }

    let node:LinkedListNode<T> = this.firstNode;
    while ((node !== null) && (node !== undefined)) {
      if (this.equality.equals (node.payload, t)) {
        const previous:LinkedListNode<T> = node.previousNode;
        const following:LinkedListNode<T> = node.nextNode;
        if (previous !== null) {
          previous.nextNode = following;
        } else {
          this.firstNode = following;
        }
        if (following !== null) {
          following.previousNode = previous;
        } else {
          this.lastNode = previous;
        }
        node.nextNode = null;
        node.previousNode = null;
        this.numberElements = this.numberElements - 1;
        return true;
      } else {
        node = node.nextNode;
      }
    }

    return false;
  }


 /**
  * Removes from this list all of its elements that are contained in the specified collection.
  * @param {Collection} c collection containing elements to be removed from this list
  * @return {boolean} true if this list changed as a result of the call
  */
  public removeAll (c:ImmutableCollection<T>) : boolean {
    if (c === null) return false;
    if (c === undefined) return false;
    if (c.size() < 1) return false;

    let changed:boolean = false;

    for (const iter = c.iterator(); iter.hasNext(); ) {
      const t:T = iter.next ();
      const tmp = this.remove(t);
      if (tmp === true) changed = true;
    }

    return changed;
  }


 /**
  * Inserts all of the elements in the specified collection into this list, 
  * starting at the specified position. Shifts the element currently at that position (if any) 
  * and any subsequent elements to the right (increases their indices). 
  * 
  * The new elements will appear in the list in the order that they are returned by the specified 
  * collection's iterator.
  * @param {number} index index at which to insert the first element from the specified collection
  * @param {Collection} c collection containing elements to be added to this list
  * @return {boolean} true if this collection changed as a result of the call
  */
  public addAll (c:ImmutableCollection<T>, index?:number) : boolean {
    if (c === null) return false;
    if (c === undefined) return false;
    if (c.size() < 1) return false;
    let offset = index;

    for (const iter = c.iterator(); iter.hasNext(); ) {
      const t:T = iter.next ();
      this.addIndex (offset, t);
      offset = offset + 1;
    }

    return true;
  }


 /**
  * Returns the index of the first occurrence of the specified element in this list, 
  * or -1 if this list does not contain the element.
  * @param {T} t element to search for
  * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  public indexOf (t:T) : number {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return -1;
    }
    if (this.numberElements <= 0) {
      return -1;
    }

    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    while ((node !== null) && (node !== undefined)) {
      if (this.equality.equals (node.payload, t)) {
        return offset;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return -1;
  }


 /**
  * Removes the element at the specified position in this list. 
  * 
  * Shifts any subsequent elements to the left (subtracts one from their indices).
  * @param {number} index the index of the element to be removed
  * @return {T} the element that was removed from the list, undefined if the element does not exist
  */
  public removeIndex (index:number) : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return undefined;
    }
    if (this.numberElements <= 0) {
      return undefined;
    }

    if (index === 0) {
      const payload:T = this.firstNode.payload;
      this.firstNode = this.firstNode.nextNode;
      this.numberElements = this.numberElements - 1;
      if (this.firstNode !== null)
        this.firstNode.previousNode = null;
      if (this.numberElements < 1) {
        this.numberElements = 0;
        this.firstNode = null;
        this.lastNode = null;
      }
      return payload;
    }
    if (index === (this.numberElements - 1)) {
      const payload:T = this.lastNode.payload;
      this.lastNode = this.lastNode.previousNode;
      this.numberElements = this.numberElements - 1;
      this.lastNode.nextNode = null;
      return payload;
    }

    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    let previous:LinkedListNode<T> = null;
    while ((node !== null) && (node !== undefined)) {
      if (index === offset) {
        previous.nextNode = node.nextNode;
        if (node.nextNode !== null)
          node.nextNode.previousNode = previous;
        this.numberElements = this.numberElements - 1;
        return node.payload;
      } else {
        previous = node;
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return undefined;
  }


 /**
  * Returns the index of the last occurrence of the specified element in this list, 
  * or -1 if this list does not contain the element
  * @param {T} t element to search for
  * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  public lastIndexOf (t:T) : number {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return -1;
    }
    if (this.numberElements <= 0) {
      return -1;
    }

    let offset:number = this.numberElements - 1;
    let node:LinkedListNode<T> = this.lastNode;
    while ((node !== null) && (node !== undefined)) {
      if (this.equality.equals (node.payload, t)) {
        return offset;
      } else {
        node = node.previousNode;
        offset = offset - 1;
      }
    }
    return -1;
  }


 /**
  * etrieves, but does not remove, the first element in this list.
  * @return {T} the first element in this list, undefined if the list is empty
  */
  public getFirst () : T {
    const node = this.firstNode;
    if ((node === null) || (node === undefined)) return undefined;
    return node.payload;
  }

  public getFirstNode () : LinkedListNode<T> {
    const node = this.firstNode;
    if ((node === null) || (node === undefined)) return undefined;
    return node;
  }

  /**
  * Retrieves, but does not remove, the last element of this queue. 
  * 
  * This method differs from peek only in that it returns undefined if this queue is empty.
  * @return {K} the element at the tail of the queue or undefined if empty
  */
  public getLast () : T {
    const node = this.lastNode;
    if ((node === null) || (node === undefined)) return undefined;
    return node.payload;
  }

 /**
  * Returns the element at the specified position in this list.
  * @param {number} index index of the element to return
  * @return {T} the element at the specified position in this list
  */
  public get(index:number):T {
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    if (index === 0) {
      if ((node === null) || (node === undefined)) {
        return null;
      }
      return node.payload;
    }
    if (index === this.numberElements - 1) {
      node = this.lastNode;
      if ((node === null) || (node === undefined)) {
        return null;
      }
      return node.payload;
    }

    while ((node !== null) && (node !== undefined)) {
      if (index === offset) {
        return node.payload;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return null;
  }


 /**
  * Replaces the element at the specified position in this list with the specified element.
  * @param {number} index index of the element to replace
  * @param {T} element element to be stored at the specified position
  * @return {number} the element previously at the specified position
  */
  public set(index:number, element:T) : T {
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    while ((node !== null) && (node !== undefined)) {
      if (index === offset) {
        const tmp:T = node.payload;
        node.payload = element;
        return tmp;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return null;
  }

  /**
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  * 
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
  public poll () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return null;
    }
    if (this.numberElements <= 0) {
      return null;
    }

    const element:T = this.firstNode.payload;
    this.removeIndex (0);
    return element;
  }

  /**
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public pollFirst () : T {
    return this.poll();
  }

  /**
  * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public pollLast () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return null;
    }
    if (this.numberElements <= 0) {
      return null;
    }

    const element:T = this.get (this.size() - 1);
    this.removeIndex (this.size() - 1);
    return element;
  }

  /**
  * Retrieves and removes the head of this queue. 
  * 
  * This method differs from poll only in that it returns undefined if this queue is empty
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
  public removeQueue () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return undefined;
    }
    if (this.numberElements <= 0) {
      return undefined;
    }

    const element:T = this.firstNode.payload;
    this.removeIndex (0);
    return element;
  }

  /**
  * Retrieves and removes the head of this queue. 
  * 
  * This method differs from poll only in that it returns undefined if this queue is empty
  * @return {K} the element at the head of the queue or undefined if empty
  */
  public removeFirst () : T {
    return this.removeQueue();
  }

  /**
  * Retrieves and removes the element at the end of this queue. 
  * 
  * This method differs from poll only in that it returns undefined if this queue is empty
  * @return {K} the element at the end of the queue or undefined if empty
  */
  public removeLast () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return undefined;
    }
    if (this.numberElements <= 0) {
      return undefined;
    }

    const element:T = this.get (this.size () - 1);
    this.removeIndex (this.size () - 1);
    return element;
  }

  /**
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
  public peek () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return null;
    }
    if (this.numberElements <= 0) {
      return null;
    }

    return this.firstNode.payload;
  }

  /**
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public peekFirst () : T {
    return this.peek();
  }

  /**
  * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public peekLast () : T {
    if ((this.lastNode === null) || (this.lastNode === undefined)) {
      return null;
    }
    if (this.numberElements <= 0) {
      return null;
    }

    return this.lastNode.payload;
  }

  /**
  * Retrieves, but does not remove, the head of this queue. 
  * 
  * This method differs from peek only in that it returns undefined if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
  public element () : T {
    if ((this.firstNode === null) || (this.firstNode === undefined)) {
      return undefined;
    }
    if (this.numberElements <= 0) {
      return undefined;
    }

    const element:T = this.firstNode.payload;
    return element;
  }

  /**
   * Returns a Java style iterator
   * @return {JIterator<T>} the Java style iterator
   */
  public iterator():JIterator<T> {
    return new LinkedListJIterator(this);
  }

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
  public [Symbol.iterator] ():Iterator<T> {
    return new LinkedListIterator (this);
  }

  /**
  * Returns an ImmutableList backed by this List
  */
  public immutableList () : ImmutableList<T> {
    return this;
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<T> {
    return this;
  }

  /**
  * Override JSON.stringify handling
  */
  public toJSON () : Array<T> {
    return Collections.asArray(this);
  }

}

export class LinkedListNode<T> {
  public previousNode:LinkedListNode<T>;
  public nextNode:LinkedListNode<T>;
  public payload:T;

  constructor (t:T) {
    this.payload = t;
    this.previousNode = null;
    this.nextNode = null;
  }
}


/* Java style iterator */
export class LinkedListJIterator<T> implements JIterator<T> {
  private node:LinkedListNode<T>;

  constructor (iList:LinkedList<T>) {
    this.node = iList.getFirstNode();
  }

  public hasNext():boolean {
    if ((this.node === null) || (this.node === undefined)) {
      return false;
    }
    return true;
  }

  public next():T {
    const tmp:T = this.node.payload;
    this.node = this.node.nextNode;
    return tmp;
  }
}


/* TypeScript iterator */
export class LinkedListIterator<T> implements Iterator<T> {
  private node:LinkedListNode<T>;

  constructor (iList:LinkedList<T>) {
    this.node = iList.getFirstNode();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if ((this.node === null) || (this.node === undefined)) {
      return new BasicIteratorResult(true, null);
    } else {
      const tmp:T = this.node.payload;
      this.node = this.node.nextNode;
      return new BasicIteratorResult(false, tmp);
    }
  }
}
