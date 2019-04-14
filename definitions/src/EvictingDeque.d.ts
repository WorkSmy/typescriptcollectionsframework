/**
* @license
* Copyright Larry Diamond 2019 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import { Collectable } from "./Collectable";
import { Consumer } from "./Consumer";
import { Deque } from "./Deque";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
import { JIterator } from "./JIterator";
import { List } from "./List";
import { Queue } from "./Queue";
/**
 * A deque which automatically evicts elements from the head of the queue
 * when attempting to add new elements onto the queue and it is full.
 *
 * An evicting queue must be configured with a maximum size.
 * Each time an element is added to a full queue, the queue automatically removes its head element.
 * This is different from conventional bounded queues, which either block or reject new elements when full.
 */
export declare class EvictingDeque<T> implements List<T>, Queue<T>, Deque<T> {
    private initialElements?;
    private deque;
    private maxSize;
    constructor(maxSize: number, iEquals?: Collectable<T>, initialElements?: ImmutableCollection<T>);
    /**
    * Returns the Collectible
    * @return {Collectable}
    */
    getCollectable(): Collectable<T>;
    /**
     * Appends the specified element to the end of this list.
     *
     * If the deque is currently full, the element at the head of the queue is evicted to make room.
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    add(t: T): boolean;
    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    addFirst(t: T): boolean;
    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    addLast(t: T): boolean;
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * Needed to implement Queue interface
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    offer(t: T): boolean;
    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    offerFirst(t: T): boolean;
    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    offerLast(t: T): boolean;
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    isEmpty(): boolean;
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    clear(): void;
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    size(): number;
    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    contains(t: T): boolean;
    /**
     * Removes the first occurrence of the specified element from this list, if it is present.
     * If the list does not contain the element, it is unchanged.
     * More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists).
     * Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    remove(t: T): boolean;
    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    removeAll(c: ImmutableCollection<T>): boolean;
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    indexOf(t: T): number;
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    removeIndex(index: number): T;
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    lastIndexOf(t: T): number;
    /**
     * Retrieves, but does not remove, the first element in this list.
     * @return {T} the first element in this list, undefined if the list is empty
     */
    getFirst(): T;
    /**
    * Retrieves, but does not remove, the last element of this queue.
    * This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the tail of the queue or undefined if empty
    */
    getLast(): T;
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    get(index: number): T;
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    set(index: number, element: T): T;
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    poll(): T;
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    pollFirst(): T;
    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    pollLast(): T;
    /**
  * Retrieves and removes the head of this queue.
  * This method differs from poll only in that it returns undefined if this queue is empty
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
    removeQueue(): T;
    /**
    * Retrieves and removes the head of this queue.
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    removeFirst(): T;
    /**
    * Retrieves and removes the element at the end of this queue.
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    removeLast(): T;
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    peek(): T;
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    peekFirst(): T;
    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    peekLast(): T;
    /**
  * Retrieves, but does not remove, the head of this queue.
  * This method differs from peek only in that it returns undefined if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
    element(): T;
    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    iterator(): JIterator<T>;
    /**
* Returns an ImmutableList backed by this List
*/
    immutableList(): ImmutableList<T>;
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    immutableCollection(): ImmutableCollection<T>;
    /**
    * Override JSON.stringify handling
    */
    toJSON(): Array<T>;
    /**
       * Returns a TypeScript style iterator
       * @return {Iterator<T>} the TypeScript style iterator
       */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
     *
     * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
     *
     * Exceptions thrown by the action are relayed to the caller.
     * @param {Consumer} consumer - the action to be performed for each element
     */
    forEach(consumer: Consumer<T>): void;
    /**
     * Inserts the specified element at the specified position in this list.
     *
     * Shifts the element currently at that position (if any)
     * and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    addIndex(index: number, t: T): void;
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
    addAll(c: ImmutableCollection<T>, index?: number): boolean;
}
