/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {AllFieldCollectable} from "./AllFieldCollectable";
import {ArrayList} from "./ArrayList";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {BasicMapEntry} from "./BasicMapEntry";
import {Collectable} from "./Collectable";
import {Collections} from "./Collections";
import {Comparator} from "./Comparator";
import {Consumer} from "./Consumer";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {JSet} from "./JSet";
import {LinkedList} from "./LinkedList";
import {List} from "./List";
import {MapEntry} from "./MapEntry";
import {NavigableMap} from "./NavigableMap";
import {NavigableSet} from "./NavigableSet";

export class NavigableHashImpl<K,V> {
  private head:ArrayList<NavigableHashNode<K,V>> = null;
  private height:number = 3;
  private mapComparator:Comparator<K> = null;
  private mapCollectable:Collectable<K> = null;
  private numberElements: number = 0.0;
  private NavigableHashNodeComparator:Comparator<NavigableHashNode<K,V>> = null;
  private NavigableHashNodeCollectable:Collectable<NavigableHashNode<K,V>> = null;

  private hashData:ArrayList<List<NavigableHashNode<K,V>>> = null;

  constructor(iComparator:Comparator<K>, private initialElements:ImmutableMap<K, V> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.mapComparator = iComparator;
    this.NavigableHashNodeComparator = new NavigableHashNodeComparator<K,V>(this.mapComparator);
    this.mapCollectable = Collections.collectableFromComparator(iComparator);
    this.NavigableHashNodeCollectable = new NavigableHashNodeCollectable<K,V>(this.mapCollectable);

    this.head = new ArrayList<NavigableHashNode<K,V>>(this.NavigableHashNodeCollectable);
    for (let loop:number = 0; loop < this.height; loop++) {
      this.head.add (null);
    }



  }

  public getNavigableHashNodeComparator() : Comparator<NavigableHashNode<K,V>> { return this.NavigableHashNodeComparator; }
  public getNavigableHashNodeCollectable() : Collectable<NavigableHashNode<K,V>> { return this.NavigableHashNodeCollectable; }

/*

  public validateDisplay () : boolean {
    console.log ("NavigableHashImpl::ValidateDisplay - Size of NavigableHashMap = " + this.numberElements);
    let count : number = 0;
    let tmp : NavigableHashNode<K,V> = this.firstEntry();
    while ((tmp !== null) && (tmp !== undefined)) {
      console.log ("NodeList " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()));
      tmp = tmp.getNextNodeArray().get (0);
      count++;
    }

    for (let loop:number = 0.0; loop < this.head.size(); loop++) {
      const hn : NavigableHashNode<K,V> = this.head.get(loop);
      if ((hn !== null) && (hn !== undefined)) {
        console.log ("Head" + loop + " " + JSON.stringify(hn.getKey()) + " - " + JSON.stringify(hn.getValue()));
      }
    }

    tmp = this.firstEntry();
    while ((tmp !== null) && (tmp !== undefined)) {
      console.log ("Node " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()) + " " + tmp.getLastNodeArray().size() + " " + tmp.getNextNodeArray().size());
      for (let loop:number = 0.0; loop < this.head.size(); loop++) {
        const ln : NavigableHashNode<K,V> = tmp.getLastNodeArray().get(loop);
        if ((ln !== null) && (ln !== undefined)) {
          console.log ("Last" + loop + " " + JSON.stringify(ln.getKey()) + " - " + JSON.stringify(ln.getValue()));
        }
      }
      for (let loop:number = 0.0; loop < this.head.size(); loop++) {
        const nn : NavigableHashNode<K,V> = tmp.getNextNodeArray().get(loop);
        if ((nn !== null) && (nn !== undefined)) {
          console.log ("Next" + loop + " " + JSON.stringify(nn.getKey()) + " - " + JSON.stringify(nn.getValue()));
        }
      }
      tmp = tmp.getNextNodeArray().get (0);
    }


    // each of the head elements needs to be at least as big as the prior element or null
    for (let loop:number = 1.0; loop < this.head.size() - 1.0; loop++) {
      const lower : NavigableHashNode<K,V> = this.head.get (Math.round (loop - 1.0));
      const higher : NavigableHashNode<K,V> = this.head.get (loop);
      if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
        const cmp:number = this.mapComparator.compare(lower.getKey(), higher.getKey());
        if (cmp === 1) {
          console.log ("Head elements out of order");
          return false;
        }
      }
    }
    while ((tmp !== null) && (tmp !== undefined)) {
      const next : NavigableHashNode<K,V> = this.nextHigherNode(tmp);
      if ((next !== null) && (next !== undefined)) {
        if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
          console.log ("next node array null");
          return false;
        }
        if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
          console.log ("last node array null");
          return false;
        }
        console.log (JSON.stringify(next.getKey()) + " - " + JSON.stringify(next.getValue()));
        count++;
        const prev : NavigableHashNode<K,V> = next.getLastNodeArray().get (0);
        if (prev !== null) {
          const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
          if (cmp !== 0) {
            console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
            return false;
          }
        }
      }
      tmp = next;
    }
    console.log ("End::Size of NavigableHashMap = " + this.numberElements + " found " + count);
    if (this.numberElements === count) {
      return true;
    } else {
      console.log ("Inconsistent size of display NavigableHashMap = " + this.numberElements + " found " + count);
      return false;
    }
  }

*/

/*
  public validate () : boolean {
    let count : number = 0.0;

    let tmp : NavigableHashNode<K,V> = this.firstEntry();
    if ((tmp !== null) && (tmp !== undefined)) {
      count = 1.0;
    }
    // each of the head elements needs to be at least as big as the prior element or null
    for (let loop:number = 1.0; loop < this.head.size() - 1.0; loop++) {
      const lower : NavigableHashNode<K,V> = this.head.get (Math.round (loop - 1.0));
      const higher : NavigableHashNode<K,V> = this.head.get (loop);
      if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
        const cmp:number = this.mapComparator.compare(lower.getKey(), higher.getKey());
        if (cmp === 1) {
          console.log ("Head elements out of order");
          return false;
        }
      }
    }

    while ((tmp !== null) && (tmp !== undefined)) {
      const next : NavigableHashNode<K,V> = this.nextHigherNode(tmp);
      if ((next !== null) && (next !== undefined)) {
        if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
          console.log ("next node array null");
          return false;
        }
        if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
          console.log ("last node array null");
          return false;
        }
        const prev : NavigableHashNode<K,V> = next.getLastNodeArray().get (0);
        if (prev !== null) {
          const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
          if (cmp !== 0) {
            console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
            return false;
          }
        }
        count = count + 1.0;
      }
      tmp = next;
    }
    if (this.numberElements === count) {
      return true;
    } else {
      console.log ("Inconsistent size of NavigableHashMap = " + this.numberElements + " found " + count);
      return false;
    }
  }
*/

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    const tmp : NavigableHashNode<K,V> = this.getEntry (key);
    if ((tmp === null) || (tmp === undefined)) {
      return null;
    }
    this.removeElement (tmp);
    return tmp.getValue();
  }

  /**
  * Removes this node from the Map
  * @param {MapEntry<K,V>} node node to remove
  */
  public removeElement (node:NavigableHashNode<K,V>) : void {
    const size : number = node.getNextNodeArray().size();
    const lna:ArrayList<NavigableHashNode<K,V>> = node.getLastNodeArray();
    const nna:ArrayList<NavigableHashNode<K,V>> = node.getNextNodeArray();
    for (let loop:number = 0; loop < size; loop++) {
      const ln:NavigableHashNode<K,V> = lna.get (loop);
      const nn:NavigableHashNode<K,V> = nna.get (loop);

      if ((ln !== null) && (ln !== undefined)) {
        ln.getNextNodeArray().set(loop, nn);
      }
      if ((nn !== null) && (nn !== undefined)) {
        nn.getLastNodeArray().set(loop, ln);
      }
      if (this.head.get (loop) === node) {
        this.head.set(loop, nn);
      }
    }
    this.numberElements--;
    return;
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.numberElements = 0;
    this.head = new ArrayList<NavigableHashNode<K,V>>(this.NavigableHashNodeCollectable);
    for (let loop:number = 0; loop < this.height; loop++) {
      this.head.add (null);
    }
  }

  /**
  * Returns the comparator used to order the keys in this map
  * @return {Comparator} the comparator used to order the keys in this map
  */
  public comparator () : Comparator<K> {
    return this.mapComparator;
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    return this.numberElements;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    if (this.size() > 0) {
      return false;
    } else {
      return true;
    }
  }

  private newNodeSize () : number {
    for (let loop:number = 0.0; loop < this.height; loop++) {
      if ((this.head.get (loop) === null) || (this.head.get (loop) === undefined)) {
        return loop + 1;
      }
    }

    return Math.round (Math.floor(Math.random() * (this.height - 1) + 1));  // Random number between 1 and this.height (both inclusive)
  }

  /**
   * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
   * @param {K} key key with which the specified value is to be associated
   * @param {V} value value to be associated with the specified key
   * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
   */
  public put (key:K, value:V) : V {
    if (Math.round(this.numberElements) < 1.0) {
      this.numberElements = 1.0;
      const newnode:NavigableHashNode<K,V> = new NavigableHashNode<K,V>(key, value, 1.0, this.NavigableHashNodeCollectable);
      this.head.set (0, newnode);
      return undefined;
    } else {
      const lastNode:NavigableHashNode<K,V> = this.floorEntry(key);
      if ((lastNode === null) || (lastNode === undefined)) { // there's no node less than or equal to this node, make a new node and it's going to be the first node
        const newnode:NavigableHashNode<K,V> = new NavigableHashNode<K,V>(key, value, this.newNodeSize (), this.NavigableHashNodeCollectable);
        for (let loop:number = 0; loop < newnode.getNextNodeArray().size(); loop++) {
          const existingNode : NavigableHashNode<K,V> = this.head.get (loop);
          newnode.getNextNodeArray().set(loop, existingNode);
          if ((existingNode !== null) && (existingNode !== undefined)) {
            existingNode.getLastNodeArray().set(loop, newnode);
          }
          this.head.set (loop, newnode);
        }
        this.numberElements++;
        return undefined;
      } else {
        if (this.mapComparator.compare (key, lastNode.getKey()) === 0) {
          const lastValue : V = lastNode.getValue();
          lastNode.setValue (value);
          return lastValue;
        } else {  // This node will immediately preceed the new node
          this.numberElements++;
          const newnode:NavigableHashNode<K,V> = new NavigableHashNode<K,V>(key, value, this.newNodeSize (), this.NavigableHashNodeCollectable);
          this.hookUpNodePointers (newnode, lastNode);
          return undefined;
        }
      }
    }
  }

  private hookUpNodePointers (newNode:NavigableHashNode<K,V>, immediatePreceedingNode:NavigableHashNode<K,V>) : void {
//    console.log ("Immediate Preceeding = " + JSON.stringify (immediatePreceedingNode.getKey()));
//    console.log ("newNode = " + JSON.stringify (newNode.getKey()));
    let lastNode:NavigableHashNode<K,V> = immediatePreceedingNode;
    const nodeHeight:number = newNode.getNextNodeArray().size();
    for (let height:number = 0.0; height < newNode.getNextNodeArray().size(); height++) {
      let done:boolean = false;
      while (done === false) {
        if ((lastNode === null) || (lastNode === undefined)) {
          done = true;
        } else {
          if (lastNode.getNextNodeArray().size() > height) {
            const nextNode:NavigableHashNode<K,V> = lastNode.getNextNodeArray().get(height);
            lastNode.getNextNodeArray().set (height, newNode);
            newNode.getLastNodeArray().set (height, lastNode);
            if ((nextNode !== null) && (nextNode !== undefined)) { // not end of the map
              newNode.getNextNodeArray().set (height, nextNode);
              nextNode.getLastNodeArray().set (height, newNode);
            }
            done = true;
          } else {
            // find the new last node if it exists
            lastNode = lastNode.getLastNodeArray().get (lastNode.getLastNodeArray().size() - 1);
          }
        }
      }

      if ((this.head.get (height) === null) || (this.head.get (height) === undefined)) {
  //        console.log ("Setting null head " + height + " to " + JSON.stringify (newNode.getKey()));
        this.head.set (height, newNode);
      } else {
        if (this.mapComparator.compare(this.head.get (height).getKey(), newNode.getKey()) > 0 ){
  //          console.log ("replacing head " + height + " from " + JSON.stringify (this.head.get (height).getKey()) + " to " + JSON.stringify (newNode.getKey()));
          const tmp:NavigableHashNode<K,V> = this.head.get(height);
          this.head.set (height, newNode);
          newNode.getNextNodeArray().set (height, tmp);
        }
      }
    }
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {NavigableHashNode} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }
    return this.head.get (0);
  }

  /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    let node:NavigableHashNode<K,V> = this.floorEntry(key);
    if ((node === null) || (node === undefined)) { // no node less than or equal to this key
      node = this.firstEntry();
      return node;
    } else {
      if (this.comparator().compare(node.getKey(), key) === 0) { // the highest key less than or equal to this node is this node
        return node;
      } else {
        return this.nextHigherNode(node); // the highest key less than or equal to this node is less than this node
      }
    }
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public higherEntry (key:K) : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    let node:NavigableHashNode<K,V> = this.floorEntry(key);
    if ((node === null) || (node === undefined)) { // no node less than or equal to this key
      node = this.firstEntry();
      return node;
    } else {
      return this.nextHigherNode(node);
    }
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public nextHigherNode (node : NavigableHashNode<K,V>) : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }
    if ((node === null) || (node === undefined)) {
//      console.log ("NextHigherNode returning null since this node is bogus");
      return null;
    }
    const ta:ArrayList<NavigableHashNode<K,V>> = node.getNextNodeArray();
    if ((ta === null) || (ta === undefined)) {
//      console.log ("NextHigherNode returning null since nextnodearray is bogus");
      return null;
    }
    const tmpn = ta.get(0);
    if ((tmpn === null) || (tmpn === undefined)) {
//      console.log ("NextHigherNode returning null since element 0 is bogus");
      return null;
    }
    return tmpn;
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  public lowerEntry (key:K) : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node, highest entry below the target entry
    let node:NavigableHashNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:NavigableHashNode<K,V> = this.head.get ((this.height - 1) - loop);
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than or equal this one
      return null;
    }

    // keep moving forward until we every node in the next array is equal to or past the key
    while (true) {
      // Check next node 0.
      // If that key is equal to or greater than (or null or undefined) the target value then this is the highest node below the target
      // If it's under, then loop from the top on down until you find a node below target and restart the while loop
      const tmp:NavigableHashNode<K,V> = node.getNextNodeArray().get (0);
      if ((tmp === null) || (tmp === undefined)) {
        return node;
      }
      const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
      if ((cmp === 1) || (cmp === 0)) {
        return node;
      }

      let done:boolean = false;
      for (let height:number = 0.0; ((done === false) && (height < node.getNextNodeArray().size())); height++) {
        const nn:NavigableHashNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - height - 1);
        if ((nn === null) || (nn === undefined)) { // then this node is past the target
          ;
        } else {
          const cmpnn:number = this.mapComparator.compare (nn.getKey(), key);
          if (cmpnn === -1) {
            node = nn;
            done = true;
          }
        }
      }
    }
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  public floorEntry (key:K) : NavigableHashNode<K,V> {
//    console.log ("SkipList::FloorEntry looking for " + key);
    if (this.numberElements < 1) {
//      console.log ("SkipList::FloorEntry no nodes");
      return null;
    }

    // Get a first node, highest -1 entry
    let node:NavigableHashNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:NavigableHashNode<K,V> = this.head.get (Math.round ((this.height - 1) - loop));
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
//        console.log ("SkipList::FloorEntry compared " + key + " and " + tmp.getKey() + " returned " + cmp);
        if (cmp === 0) {
          return tmp;
        }
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than this one
//      console.log ("SkipList::FloorEntry all elements are higher");
      return null;
    }

    // keep moving forward until we every node in the next array is past the key
    const keepGoing : boolean = true;
    while (keepGoing === true) {
      let nextNode = null;

      // Are all next nodes after key or null/undefined?
      let foundEarlierKey : boolean = false;
      for (let loop : number = 0; ((loop < node.getNextNodeArray().size()) && (foundEarlierKey === false)); loop++) {
        foundEarlierKey = false;
        const test : NavigableHashNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
        if ((test === null) || (test === undefined)) {
          ; // nothing to do
        } else {
          const cmp : number = this.mapComparator.compare (key, test.getKey());
          if (cmp === 0) {
            return test;
          }
          if (cmp === 1) {
            foundEarlierKey = true;
//            console.log ("SkipList::FloorEntry foundEarlierKey " + key + " " + test.getKey());
            nextNode = test;
          }
        }
      }

      if (foundEarlierKey === false) {
        return node;
      } else {
        node = nextNode;
      }
    }
//    console.log ("SkipList::FloorEntry returning " + node.getKey());
    return node;
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node
    let node:NavigableHashNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      node = this.head.get ((this.height - 1) - loop);
    }

    if ((node === null) && (node === undefined)) {
      return null;
    }

    // get to the last node
    while (node.getNextNodeArray().get (0) !== null) {
      let foundNext : boolean = false;
      for (let loop : number = 0; ((foundNext === false) && (loop < node.getNextNodeArray().size())); loop++) {
        if (node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1) !== null) {
          foundNext = true;
          node = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
        }
      }
    }

    return node;
  }

  /**
  * Returns a key-value mapping associated with the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the key, or null if there is no such key
  */
  public getEntry (key:K) : NavigableHashNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node, highest entry below the target entry
    let node:NavigableHashNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:NavigableHashNode<K,V> = this.head.get ((this.height - 1) - loop);
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
        if (cmp === 0) {
//          console.log ("Match on head " + tmp.getKey() + " " + key);
          return tmp;
        }
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than or equal this one
      return null;
    }

    // keep moving forward until we every node in the next array is equal to or past the key
    while (true) {
      // Check next node 0.
      // If that key is equal to or greater than (or null or undefined) the target value then this is the highest node below the target
      // If it's under, then loop from the top on down until you find a node below target and restart the while loop
      const tmp:NavigableHashNode<K,V> = node.getNextNodeArray().get (0);
      if ((tmp === null) || (tmp === undefined)) {
        return null;
      }
      const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
      if (cmp === 0) {
        return tmp;
      }
      if (cmp === 1) {
        return null;
      }

      let done:boolean = false;
      for (let height:number = 0.0; ((done === false) && (height < node.getNextNodeArray().size())); height++) {
        const nn:NavigableHashNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - height - 1);
        if ((nn === null) || (nn === undefined)) { // then this node is past the target
          ;
        } else {
          const cmpnn:number = this.mapComparator.compare (nn.getKey(), key);
          if (cmpnn === 0) {
            return nn;
          }
          if (cmpnn === -1) {
            node = nn;
            done = true;
          }
        }
      }
    }
  }

}

export class NavigableHashNode<K,V> extends BasicMapEntry<K,V> {
  constructor (key:K, value:V, height:number, iNodeCollectable:Collectable<NavigableHashNode<K,V>>) {
    super(key, value);
    this.lastNodeArray = new ArrayList<NavigableHashNode<K,V>>(iNodeCollectable);
    this.nextNodeArray = new ArrayList<NavigableHashNode<K,V>>(iNodeCollectable);
    for (let loop:number = 0.0; loop < height; loop++) {
      this.nextNodeArray.add (null);
      this.lastNodeArray.add (null);
    }
//    console.log ("Adding node of size " + height);
  }
  public setValue (iValue:V) : void {
    this.value = iValue;
  }
  private lastNodeArray:ArrayList<NavigableHashNode<K,V>> = null;
  public getLastNodeArray () : ArrayList<NavigableHashNode<K,V>> {
    return this.lastNodeArray;
  }
  private nextNodeArray:ArrayList<NavigableHashNode<K,V>> = null;
  public getNextNodeArray () : ArrayList<NavigableHashNode<K,V>> {
    return this.nextNodeArray;
  }
}

class NavigableHashNodeCollectable<K,V> implements Collectable<NavigableHashNode<K,V>> {
  private coll:Collectable<K> = null;

  constructor(iColl:Collectable<K>) {
    this.coll = iColl;
  }
  public equals (o1: NavigableHashNode<K,V>, o2: NavigableHashNode<K,V>) {
    if (o1 === undefined) {
      if (o2 === undefined) {
        return true;
      } else {
        return false;
      }
    }
    if (o1 === null) {
      if (o2 === null) {
        return true;
      } else {
        return false;
      }
    }
    if ((o2 === null) || (o2 === undefined)) {
      return false;
    }
    if (this.coll.equals(o1.getKey(), o2.getKey())) {
      return true;
    }
    return false;
  }
}

class NavigableHashNodeComparator<K,V> implements Comparator<NavigableHashNode<K,V>> {
  private comp:Comparator<K> = null;

  constructor(iComp:Comparator<K>) {
    this.comp = iComp;
  }

  public compare (o1:NavigableHashNode<K,V>, o2:NavigableHashNode<K,V>) : number {
    if (o1 === o2) {
      return 0;
    }
    if ((o1 === undefined) || (o1 === null)) {
      return -1;
    }
    if ((o2 === undefined) || (o2 === null)) {
      return 1;
    }
    return this.comp.compare (o1.getKey(), o2.getKey());
  }
}


/**
 * A scalable NavigableMap implementation that implements SkipListMap for performance that also implements HashMap so that the get method returns in O(1) time.
 *
 * The map is sorted according to a Comparator provided at map creation time.
 * 
 * This class implements a SkipList providing expected average log(n) time cost for the containsKey, put and remove operations and their variants.
 * This class implements a Hash providing expected average O(1) time cost for the get method.
 *
 * This class does not directly correspond to any class but most closely corresponds to java.util.concurrent.ConcurrentSkipListMap and java.util.HashMap.
 */
export class NavigableHashMap<K,V> implements NavigableMap<K,V> {
  private impl:NavigableHashImpl<K,V> = null;

  constructor (comp:Comparator<K>, iInitial:ImmutableMap<K,V> = null) {
    this.impl = new NavigableHashImpl(comp);

    if ((iInitial !== null) && (iInitial !== undefined)) {
    //      console.log ("skiplist::constructor initial has " + initialElements.size());
      for (const iter = iInitial.entrySet().iterator(); iter.hasNext(); ) {
        const t:MapEntry<K,V> = iter.next ();
    //        console.log ("skiplist::constructor adding " + t.getKey());
        this.impl.put (t.getKey(), t.getValue());
      }
    }
  }

  /**
   * Returns true if this map maps one or more keys to the specified value.
   * @param value value whose presence in this map is to be tested
   */
  public containsValue (value: V) : boolean {
    return Collections.containsValue (this, value);
  }

//  public validateMap () : boolean { return this.impl.validate(); }
//  public validateMapDisplay () : boolean { return this.impl.validateDisplay(); }

  public getNextHigherKey (key : K) {
    const node : NavigableHashNode<K,V> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    const nn : NavigableHashNode<K,V> = this.impl.nextHigherNode(node);
    if ((nn === undefined) || (nn === null)) {
      return null;
    }
    return nn.getKey();
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    const node : NavigableHashNode<K,V> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return undefined;
    }
    return node.getValue();
  }

  /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  public containsKey (key:K) : boolean {
    const node : NavigableHashNode<K,V> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    return this.impl.isEmpty();
  }

  /**
  * Returns an ImmutableSet view of the keys contained in this map.
  * The set's iterator returns the keys in ascending order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public keySet () : ImmutableSet<K> {
    return new ImmutableKeySetForNavigableHashMap (this.impl);
  }


  /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set's iterator returns the mappings in ascending key order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public entrySet () : ImmutableSet<MapEntry<K,V>> {
    return new ImmutableEntrySetForNavigableHashImpl(this.impl);
  }

  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public put (key:K, value:V) : V {
    return this.impl.put(key, value);
  }

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    return this.impl.remove(key);
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.impl.clear();
  }

  /**
  * Returns an ImmutableMap backed by this Map
  */
  public immutableMap () : ImmutableMap<K,V> {
    return this;
  }

  /**
   * Returns an iterator over the entire entry set
   * @return {Iterator<K>} an iterator for the entry set
   */
  public [Symbol.iterator] ():Iterator<K> {
    return this.entrySet[Symbol.iterator]();
  }

  /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  public firstKey () : K {
    const firstNode : NavigableHashNode<K,V> = this.impl.firstEntry();
    if ((firstNode === undefined) || (firstNode === null)) {
      return null;
    }
    return firstNode.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : BasicMapEntry<K,V> {
    const firstNode : NavigableHashNode<K,V> = this.impl.firstEntry();
    if ((firstNode === undefined) || (firstNode === null)) {
      return null;
    }
    return firstNode;
  }

  /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : MapEntry<K,V> {
    const node : NavigableHashNode<K,V> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingKey (key:K) : K {
    const node : NavigableHashNode<K,V> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public higherKey (key:K) : K {
    const node : NavigableHashNode<K,V> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public higherEntry (key:K) : MapEntry<K,V> {
    const node : NavigableHashNode<K,V> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the highest key lower than key, or null if there is no such key
  */
  public lowerKey (key:K) : K {
    const node : NavigableHashNode<K,V> = this.impl.lowerEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  public lowerEntry (key:K) : MapEntry<K,V> {
    const node : NavigableHashNode<K,V> = this.impl.lowerEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the greatest key less than or equal to key, or null if there is no such key
  */
  public floorKey (key:K) : K {
    const node : NavigableHashNode<K,V> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  public floorEntry (key:K) : MapEntry<K,V> {
    const node : NavigableHashNode<K,V> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  public lastKey () : K {
    const node : NavigableHashNode<K,V> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : MapEntry<K,V> {
    const node : NavigableHashNode<K,V> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Override JSON.stringify handling
  */
  public toJSON () : Array<MapEntry<K,V>> {
    const tmp = Collections.asArrayMap(this);
    return tmp;
  }
}


export class ImmutableKeySetForNavigableHashMap<K,V> implements ImmutableSet<K> {
  private impl:NavigableHashImpl<K,V>;
  constructor(iNavigableHashImpl:NavigableHashImpl<K,V>) {
    this.impl = iNavigableHashImpl;
  }

  public size():number { return this.size(); }

  public isEmpty():boolean { return this.isEmpty(); }

  public contains(item:K) : boolean { return this.contains (item); }

  public iterator():JIterator<K> { return new NavigableHashMapKeySetJIterator(this.impl); }

  public [Symbol.iterator] ():Iterator<K> { return new NavigableHashMapKeySetIterator (this.impl); }

  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
   }
  }
}

/* Java style iterator */
export class NavigableHashMapKeySetJIterator<K,V> implements JIterator<K> {
  private location:NavigableHashNode<K,V>;
  private impl:NavigableHashImpl<K,V>;

  constructor(implI:NavigableHashImpl<K,V>) {
    this.impl = implI;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const firstEntry:NavigableHashNode<K,V> = this.impl.firstEntry();
      if ((firstEntry === null) || (firstEntry === undefined)) return false;
      return true;
    } else { // we've already called this iterator before
      const tmpEntry:NavigableHashNode<K,V> = this.impl.nextHigherNode(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return false;
      return true;
    }
  }

  public next():K {
    if (this.location === undefined) { // first time caller
      const firstEntry:NavigableHashNode<K,V> = this.impl.firstEntry();
      if ((firstEntry === null) || (firstEntry === undefined)) return null;
      this.location = firstEntry;
      return firstEntry.getKey();
    } else { // we've already called this iterator before
      const tmpEntry:NavigableHashNode<K,V> = this.impl.nextHigherNode(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return null;
      this.location = tmpEntry;
      return tmpEntry.getKey();
    }
  }
}

/* TypeScript iterator */
export class NavigableHashMapKeySetIterator<K,V> implements Iterator<K> {
  private location:NavigableHashNode<K,V>;
  private impl:NavigableHashImpl<K,V>;

  constructor(implI:NavigableHashImpl<K,V>) {
    this.impl = implI;
    this.location = this.impl.firstEntry();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<K> {
    if ((this.location === null) || (this.location === undefined)) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<K> = new BasicIteratorResult (false, this.location.getKey());
    this.location = this.impl.nextHigherNode(this.location);
    return tmp;
  }
}


export class ImmutableEntrySetForNavigableHashImpl<K,V> implements ImmutableSet<MapEntry<K,V>> {
  private map:NavigableHashImpl<K,V>;
  constructor(iMap:NavigableHashImpl<K,V>) {
    this.map = iMap;
  }

  public size():number { return this.map.size(); }

  public isEmpty():boolean { return this.map.isEmpty(); }

  public contains(item:MapEntry<K,V>) : boolean {
    if ((item === null) || (item === undefined)) return false;
    const node : NavigableHashNode<K,V> = this.map.getEntry(item.getKey());
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  public iterator():JIterator<MapEntry<K,V>> { return new NavigableHashMapEntrySetJIterator(this.map); }

  public [Symbol.iterator] ():Iterator<MapEntry<K,V>> { return new NavigableHashMapEntrySetIterator (this.map); }

  public forEach(consumer:Consumer<MapEntry<K,V>>) : void {
   for (const iter:JIterator<MapEntry<K,V>> = this.iterator(); iter.hasNext(); ) {
     const t:MapEntry<K,V> = iter.next();
     consumer.accept(t);
   }
  }

}

/* Java style iterator */
export class NavigableHashMapEntrySetJIterator<K,V> implements JIterator<MapEntry<K,V>> {
  private location:NavigableHashNode<K,V>;
  private map:NavigableHashImpl<K,V>;

  constructor(iMap:NavigableHashImpl<K,V>) {
    this.map = iMap;
  }

  public hasNext():boolean {
//    console.log ("NavigableHashMapEntrySetJIterator::hasNext");
    if (this.location === undefined) { // first time caller
      const firstEntry:NavigableHashNode<K,V> = this.map.firstEntry();
      if ((firstEntry === null) || (firstEntry === undefined)) return false;
      return true;
    } else { // we've already called this iterator before
      const tmpEntry:NavigableHashNode<K,V> = this.map.nextHigherNode(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return false;
      return true;
    }
  }

  public next():MapEntry<K,V> {
//    console.log ("NavigableHashMapEntrySetJIterator::next");
    if (this.location === undefined) { // first time caller
      const firstEntry:NavigableHashNode<K,V> = this.map.firstEntry();
      if ((firstEntry === null) || (firstEntry === undefined)) return null;
      this.location = firstEntry;
      return firstEntry;
    } else { // we've already called this iterator before
      const tmpEntry:NavigableHashNode<K,V> = this.map.nextHigherNode(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return null;
      this.location = tmpEntry;
      return tmpEntry;
    }
  }
}

/* TypeScript iterator */
export class NavigableHashMapEntrySetIterator<K,V> implements Iterator<MapEntry<K,V>> {
  private location:NavigableHashNode<K,V>;
  private map:NavigableHashImpl<K,V>;

  constructor(iMap:NavigableHashImpl<K,V>) {
    this.map = iMap;
    this.location = this.map.firstEntry();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<MapEntry<K,V>> {
    if ((this.location === null) || (this.location === undefined)) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<MapEntry<K,V>> = new BasicIteratorResult (false, this.location);
    this.location = this.map.nextHigherNode(this.location);
    return tmp;
  }
}

 /**
 * A scalable NavigableSet implementation that implements SkipListSet for performance that also implements HashSet so that the get method returns in O(1) time.
 *
 * The set is sorted according to a Comparator provided at set creation time.
 * 
 * This class implements a SkipList providing expected average log(n) time cost for the containsKey, put and remove operations and their variants.
 * This class implements a Hash providing expected average O(1) time cost for the get method.
 *
 * This class does not directly correspond to any class but most closely corresponds to java.util.concurrent.ConcurrentSkipListSet and java.util.HashSet.
 */
export class NavigableHashSet<K> implements NavigableSet<K> {
  private impl:NavigableHashImpl<K,number> = null;

  constructor(iComparator:Comparator<K>, private initialElements?:ImmutableCollection<K>) {
    this.impl = new NavigableHashImpl<K,number>(iComparator);
    if ((initialElements !== null) && (initialElements !== undefined)) {
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const key:K = iter.next ();
        this.impl.put (key, 1);
      }
    }
  }

//  public validateSet () : boolean { return this.impl.validate(); }
//  public validateSetDisplay () : boolean { return this.impl.validateDisplay(); }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    const tmp:number = this.impl.put (element, 1);
    if (tmp === 1) {
      return false;
    }
    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    return this.impl.isEmpty();
  }

  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
  */
  public contains (key:K) : boolean {
    const node : NavigableHashNode<K,number> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  /**
  * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
  * @param {K} item to find floor node for
  * @return {K} the greatest element less than or equal to e, or null if there is no such element
  */
  public floor (key:K) : K {
    const node : NavigableHashNode<K,number> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
  * @param {K} item to find ceiling node for
  * @return {K} the least element greater than or equal to item, or null if there is no such element
  */
  public ceiling (key:K) : K {
    const node : NavigableHashNode<K,number> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the least element in this set greater than the given element, or null if there is no such element.
  * @param {K} item to find higher node for
  * @return {K} the least element greater than the given element, or null if there is no such element
  */
  public higher (key:K) : K {
    const node : NavigableHashNode<K,number> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
   }
  }

  /**
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  public first () : K {
    const node : NavigableHashNode<K,number> = this.impl.firstEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the greatest element in this set less than the given element, or null if there is no such element.
  * @param {K} item to find lower node for
  * @return {K} the greatest element less than the given element, or null if there is no such element
  */
  public lower (key:K) : K {
    const node : NavigableHashNode<K,number> = this.impl.lowerEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the last (highest) element currently in this set.
  * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
  */
  public last () : K {
    const node : NavigableHashNode<K,number> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Removes the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    const tmp:number = this.impl.remove(element);
    if ((tmp === undefined) || (tmp === null)) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    this.impl.clear();
  }

  /**
  * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
  * @return {K} the first (lowest) element, or null if this set is empty
  */
  public pollFirst () : K {
    const node : NavigableHashNode<K, number> = this.impl.firstEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    } else {
      const tmp:K = node.getKey();
      this.impl.removeElement(node);
      return tmp;
    }
  }

  /**
  * Retrieves and removes the last (highest) element, or returns null if this set is empty.
  * @return {K} the last (highest) element, or null if this set is empty
  */
  public pollLast () : K {
    const node : NavigableHashNode<K, number> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    } else {
      const tmp:K = node.getKey();
      this.impl.removeElement(node);
      return tmp;
    }
  }

  /**
  * Needed For Iterator
  * @param {K} key the given key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public getNextHigherKey (key:K) : K {
    const node : NavigableHashNode<K,number> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new NavigableHashSetJIterator(this.impl);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new NavigableHashSetIterator(this.impl);
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

  /**
  * Returns an ImmutableSet backed by this Set
  */
  public immutableSet () : ImmutableSet<K> {
    return this;
  }

  /**
  * Override JSON.stringify handling
  */
  public toJSON () : Array<K> {
    return Collections.asArray(this);
  }

}

/* Java style iterator */
export class NavigableHashSetJIterator<T> implements JIterator<T> {
  private location:NavigableHashNode<T,number>;
  private impl:NavigableHashImpl<T,number>;

  constructor (implI:NavigableHashImpl<T,number>) {
    this.impl = implI;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:NavigableHashNode<T,number> = this.impl.firstEntry();
      if ((first === undefined) || (first === null)) {
        return false;
      }
      return true;
    } else { // we've already called this iterator before
      const tmp:NavigableHashNode<T,number> = this.impl.nextHigherNode(this.location);
      if ((tmp === undefined) || (tmp === null)) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      const first:NavigableHashNode<T,number> = this.impl.firstEntry();
      if ((first === undefined) || (first === null)) {
        return null;
      }
      this.location = first;
      return first.getKey();
    } else { // we've already called this iterator before
      const tmp:NavigableHashNode<T,number> = this.impl.nextHigherNode(this.location);
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp.getKey();
      }
    }
  }
}

/* TypeScript iterator */
export class NavigableHashSetIterator<T> implements Iterator<T> {
  private location:NavigableHashNode<T,number>;
  private impl:NavigableHashImpl<T,number>;

  constructor (implI:NavigableHashImpl<T,number>) {
    this.impl = implI;
    this.location = this.impl.firstEntry();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if ((this.location === null) || (this.location === undefined)) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location.getKey());
    this.location = this.impl.nextHigherNode(this.location);
    return tmp;
  }
}
