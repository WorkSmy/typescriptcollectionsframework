/**
* @license
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import {AllFieldHashable} from "./AllFieldHashable";
import {Hashable} from "./Hashable";
import {ImmutableSet} from "./ImmutableSet";
import {HashSet} from "./HashSet";
import {JIterator} from "./JIterator";

/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order.  
 * This implementation differs from HashSet in that it maintains a doubly-linked list running through all of its entries. 
 * This linked list defines the iteration ordering, which is the order in which elements were inserted into the set (insertion-order). 
 * Note that insertion order is not affected if an element is re-inserted into the set. 
 * (An element e is reinserted into a set s if s.add(e) is invoked when s.contains(e) would return true immediately prior to the invocation.)
 * 
 * This implementation spares its clients from the unspecified, generally chaotic ordering provided by HashSet
 * without incurring the increased cost associated with TreeSet. 
 * It can be used to produce a copy of a set that has the same order as the original, regardless of the original set's implementation
 *
 * This class corresponds to java.util.LinkedHashSet
 */
export class LinkedHashSet<K> extends HashSet<K> {

    // The head of the doubly linked list.
    private header: LinkedEntry<K>;

    /*
    * Constructs an empty insertion-ordered Linked instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    constructor (iHash:Hashable<K> = AllFieldHashable.instance, private initialElementsLinked:ImmutableSet<K> = null, private iInitialCapacityLinked:number=20, private iLoadFactorLinked:number=0.75) {
        super(iHash, null, iInitialCapacityLinked, iLoadFactorLinked);
        this.initChain();
        this.initializeElements(initialElementsLinked);
    }

    /**
     * Initializes the chain before any entries are inserted.
     */
    private initChain () : void {
        this.header = new LinkedEntry<K>(null);
        // make circular
        this.header.before = this.header.after = this.header;
    }

    /**
     * Use collection and add to LinkedEntry and super HashSet
     * @param elements collection to populate
     */
    public initializeElements(elements:ImmutableSet<K>) : void {
        // makes new list unorder.. it uses set..
        if ((elements !== null) && (elements !== undefined)) {
            for (const iter = elements.iterator(); iter.hasNext(); ) {
                const val:K = iter.next ();
                this.add (val);
            }
        }
    }

    /**
     * This override alters behavior of superclass add method. It causes newly allocated entry
     * to get inserted at the end of the linked list.
     * @param {V} value value
     */
    public add (value:K) : boolean {
        const result:boolean = super.add(value);
        if (result === false)
          return false;  // avoid inserting duplicate

        return this.createEntry(value);
    }

    /**
     * This override alters behavior of superclass remove method.
     * @param {V} value value
     */
    public remove (value:K) : boolean {
        const result:boolean = super.remove(value);
        if (result === false)
          return false;  // not there dont proceed further

        const linkedIter:LinkedIterator<K> = this.Iterator();
        while (linkedIter.hasNext()) {
           const val:LinkedEntry<K> = linkedIter.next();
           if (val.equals(value) === true) {
               val.remove();
               return true;
           }
        }
        return false;
    }

    private createEntry (value:K) : boolean {
        const e:LinkedEntry<K> = new LinkedEntry<K>(value);
        e.addBefore(this.header);
        return true;
    }

    public clear () : void {
        super.clear();
        this.header.before = this.header.after = this.header;
    }

    /**
     * Java style iterator retrieves hash set values by insertion order.
     */
    public Iterator () : LinkedIterator<K> {
        const iter:LinkedIterator<K> = new LinkedIterator<K>(this);
        return iter;
    }

    public getHeader() : LinkedEntry<K>{
        return this.header;
    }
}

/**
 * LinkedEntry entry class
 */
export class LinkedEntry<K> {

    // These fields comprise the doubly linked list used for iteration.
    public before: LinkedEntry<K>;
    public after: LinkedEntry<K>;
    private value: K;

    constructor (value: K) {
        this.value = value;
    }

    /**
     * Removes this entry from the linked list.
     */
    public remove () : void {
        this.before.after = this.after;
        this.after.before = this.before;
    }

    public getValue(): K {
        return this.value;
    }

    /**
     * Inserts this entry before the specified existing entry in the list.
     * @param existingEntry existing entry
     */
    public addBefore (existingEntry: LinkedEntry<K>) : void {
        this.after = existingEntry;
        this.before = existingEntry.before;
        this.before.after = this;
        this.after.before = this;
    }

    public equals (o: K) {
      if ((o === undefined) || (o === null)) {
         return false;
      }
      if (JSON.stringify(o) === JSON.stringify(this.value))
        return true;
      return false;
    }
}

/* Java style iterator */
export class LinkedIterator<K> implements JIterator<LinkedEntry<K>> {
    private header:LinkedEntry<K>;
    private next_Entry:LinkedEntry<K>;
    private lastReturned:LinkedEntry<K>;

    constructor (linkedSet:LinkedHashSet<K>) {
        this.header = linkedSet.getHeader();
        this.next_Entry = linkedSet.getHeader().after;
        this.lastReturned = null;
    }

    public next () : LinkedEntry<K> {
       return this.nextEntry();
    }

    public _next () : K {
        return this.next().getValue();
    }

    public hasNext () : boolean {
        return this.next_Entry !== this.header;
    }

    private nextEntry () : LinkedEntry<K> {
        if(this.check() === false)
          return null;
        const e:LinkedEntry<K> = this.lastReturned = this.next_Entry;
        this.next_Entry = e.after;
        return e;
    }

    private check () : boolean {
        if(this.next_Entry === this.header)
          return false;
        return true;
    }
}
