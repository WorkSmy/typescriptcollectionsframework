/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collectable} from "./Collectable";
 import {JIterator} from "./JIterator";
 import {List} from "./List";

export class ArrayList<T extends Collectable> implements List<T>, Iterable<T> {
  elements:T[] = null;
  sizeValue:number = 0;

  /**
   * Appends the specified element to the end of this list
   * @param {T} t element to Append
   * @return {boolean} true if this collection changed as a result of the call
   */
    public add (t:T) : boolean {
      if (this.elements === null) {
        this.elements = new Array<T>();
      }
      this.elements.push (t);
      this.sizeValue = this.sizeValue + 1;
      return true;
    }

   /**
    * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
    * @param {number} index index at which the specified element is to be inserted
    * @param {T} t element to be inserted
    */
    public addElement (index:number, t:T) : void {
      if (this.elements === null) {
        this.elements = new Array<T>();
      }
      this.elements.splice (index, 0, t);
      this.sizeValue = this.sizeValue + 1;
    }

   /**
    * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
    * @param {number} index the index of the element to be removed
    * @return {T} the element that was removed from the list, undefined if the element does not exist
    */
    public remove (index:number) : T {
      if (this.elements === null) {
        return undefined;
      }
      let element:T = this.elements [index];
      this.elements.splice (index, 1);
      this.sizeValue = this.sizeValue - 1;
      return element;
    }


/**
 * Removes all of the elements from this list. The list will be empty after this call returns.
 */
  public clear () : void {
    this.elements = new Array<T>();
    this.sizeValue = 0;
  }

/**
 * Returns the element at the specified position in this list.
 * @param {number} index index of the element to return
 * @return {T} the element at the specified position in this list
 */
  get(index:number):T {
    return this.elements [index];
  }

/**
 * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
 * @param {T} t element to search for
 * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
 */
  public indexOf (t:T) : number {
    if (this.elements === null)
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = 0; loop < this.sizeValue; loop++) {
      let e = this.get (loop);
      if (e.equals (t))
        return loop;
    }

    return -1;
  }

/**
 * Returns true if this list contains the specified element.
 * @param {T} t element whose presence in this list is to be tested
 * @return {boolean} true if this list contains the specified element
 */
  public contains (t:T) : boolean {
    if (this.indexOf (t) === -1)
      return false;
    return true;
  }

 /**
  * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {T} t element to be removed from this list, if present
  * @return {T} true if this list contained the specified element
  */
  public removeElement (t:T) : boolean {
    if (this.elements === null) {
      return false;
    }

    let offset:number = this.indexOf (t);
    if (offset === -1)
    return false;

    this.remove (offset);
    return true;
  }

/**
 * Returns true if this list contains no elements.
 * @return {boolean} true if this list contains no elements
 */
  public isEmpty () : boolean {
    if (this.sizeValue === 0)
      return true;

    return false;
  }

/**
 * Replaces the element at the specified position in this list with the specified element.
 * @param {number} index index of the element to replace
 * @param {T} element element to be stored at the specified position
 * @return {number} the element previously at the specified position
 */
  public set(index:number, element:T):T {
    let tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }


/**
 * Returns the number of elements in this list.
 * @return {number} the number of elements in this list
 */
  public size () : number {
    return this.sizeValue;
  }

  /**
   * Returns a Java style iterator
   * @return {JIterator<T>} the Java style iterator
   */
  public iterator():JIterator<T> {
    return new ArrayListJIterator(this);
  }

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
  public [Symbol.iterator] ():Iterator<T> {
    return new ArrayListIterator (this);
  }

}

/* Java style iterator */
export class ArrayListJIterator<T extends Collectable> implements JIterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  public hasNext():boolean {
    if (this.offset < this.arraylist.size())
      return true;
    return false;
  }

  public next():T {
    return this.arraylist.get (this.offset++);
  }
}

/* TypeScript iterator */
export class ArrayListIterator<T extends Collectable> implements Iterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  public next(value?: any): IteratorResult<T> {
    if (this.offset < this.arraylist.size()) {
      return new BasicIteratorResult(false, this.arraylist.get (this.offset++));
    } else {
      return new BasicIteratorResult(true, null);
    }
  }
}
