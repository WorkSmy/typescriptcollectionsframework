/**
* @license
* Copyright Larry Diamond 2019 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {AllFieldHashable} from "../src/AllFieldHashable";
import {ArrayList} from "../src/ArrayList";
import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashSet} from "../src/HashSet";
import {LinkedList} from "../src/LinkedList";
import {TreeSet} from "../src/TreeSet";

describe("Test TreeSet functionality", function() {

  // PetStoreProduct will be used in testing
  class PetStoreProduct {
    private productName:string;
    private price:number;

    public constructor (iName:string, iPrice:number) {
      this.productName = iName;
      this.price = iPrice;
    }

    public getProductName ():string {
      return this.productName;
    }

    public getPrice():number {
      return this.price;
    }
  }

  const product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  const product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  const product4:PetStoreProduct = new PetStoreProduct("Dog Leash", 6.99);

  const alphabeticalSortPetStoreProduct:Comparator<PetStoreProduct> = {
    compare(o1:PetStoreProduct, o2:PetStoreProduct) : number {
      if (o1 === o2)
      return 0;
      if (o1 === undefined)
      return -1;
      if (o1 === null)
      return -1;
      if (o2 === undefined)
      return 1;
      if (o2 === null)
      return 1;
      if (o1.getProductName() === o2.getProductName())
      return 0;
      if (o1.getProductName() === undefined)
      return -1;
      if (o1.getProductName() === null)
      return -1;
      if (o2.getProductName() === undefined)
      return 1;
      if (o2.getProductName() === null)
      return 1;

      if (o1.getProductName() < o2.getProductName())
      return -1;

      return 1;
    }
  };

  const priceSortPetStoreProduct:Comparator<PetStoreProduct> = {
    compare(o1:PetStoreProduct, o2:PetStoreProduct) : number {
      if (o1 === o2)
      return 0;
      if (o1 === undefined)
      return -1;
      if (o1 === null)
      return -1;
      if (o2 === undefined)
      return 1;
      if (o2 === null)
      return 1;
      if (o1.getPrice() === o2.getPrice())
      return 0;
      if (o1.getPrice() === undefined)
      return -1;
      if (o1.getPrice() === null)
      return -1;
      if (o2.getPrice() === undefined)
      return 1;
      if (o2.getPrice() === null)
      return 1;

      if (o1.getPrice() < o2.getPrice())
      return -1;

      return 1;
    }
  };

  it("Test Creation state", function() {
    const TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (TreeSet1.size ()).toEqual(0);
    expect (TreeSet1.isEmpty ()).toEqual(true);

    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
  });

  it("Test Adding one item", function() {
    const TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (TreeSet1.size ()).toEqual(0);
    expect (TreeSet1.isEmpty ()).toEqual(true);
    expect (TreeSet1.add (product1)).toEqual(true);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
  });

  it("Test Adding one item basic datatypes", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test Adding repeatedly one item", function() {
    const TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (TreeSet1.size ()).toEqual(0);
    expect (TreeSet1.isEmpty ()).toEqual(true);
    expect (TreeSet1.add (product1)).toEqual(true);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
  });

  it("Test Adding repeatedly one item basic datatypes", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test Adding two items basic datatypes", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Second")).toEqual(true);
    expect (2).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test Adding two items basic datatypessame value", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test contains basic datatypessame value", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (false).toEqual(TreeSet2.contains ("Hello"));
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (true).toEqual(TreeSet2.contains ("Hello"));
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (true).toEqual(TreeSet2.contains ("Hello"));
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test first basic datatypes", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (null).toEqual(TreeSet2.first());
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect ("Hello").toEqual(TreeSet2.first());
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Second")).toEqual(true);
    expect ("Hello").toEqual(TreeSet2.first());
    expect (2).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Alpha")).toEqual(true);
    expect ("Alpha").toEqual(TreeSet2.first());
    expect (3).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test pollfirst", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollFirst()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollFirst()).toEqual("Hello");
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollFirst()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Second")).toEqual(true);
    expect (TreeSet2.add ("First")).toEqual(true);
    expect (TreeSet2.pollFirst()).toEqual("First");
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollFirst()).toEqual("Second");
    expect (TreeSet2.size ()).toEqual(0);
  });

  it("Test polllast", function() {
    const TreeSet2:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollLast()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollLast()).toEqual("Hello");
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollLast()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Second")).toEqual(true);
    expect (TreeSet2.add ("First")).toEqual(true);
    expect (TreeSet2.pollLast()).toEqual("Second");
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollLast()).toEqual("First");
    expect (TreeSet2.size ()).toEqual(0);
  });

  it("Test java iteration", function() {
    const TreeSet2:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);

    expect (TreeSet2.add (product1)).toEqual (true);
    expect (TreeSet2.add (product2)).toEqual (true);

    let offset:number = 0;
    for (const iter = TreeSet2.iterator(); iter.hasNext(); ) {
      const psp:PetStoreProduct = iter.next ();

      if (offset === 0)
        expect (psp.getProductName()).toEqual (product2.getProductName());  // Catnip before ChewToy
      if (offset === 1)
        expect (psp.getProductName()).toEqual (product1.getProductName());  // Catnip before ChewToy
      if (offset > 1)
        fail();

       offset++;
    }
  });

  it("Test typescript iteration", function() {
    const TreeSet2:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);

    expect (TreeSet2.add (product1)).toEqual (true);
    expect (TreeSet2.add (product2)).toEqual (true);

    const offset:number = 0;

    const tsi:Iterator<PetStoreProduct> = TreeSet2[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));  // Catnip before ChewToy
    tmp = tsi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));  // Catnip before ChewToy
    tmp = tsi.next();
    expect (tmp.done).toEqual(true);

  });

  it("Test ceiling", function() {
    const TreeSet2:TreeSet<number> = new TreeSet<number>(Collections.getNumberComparator());
    expect (TreeSet2.add (44)).toEqual(true);
    expect (TreeSet2.add (5)).toEqual(true);
    expect (TreeSet2.add (20)).toEqual(true);
    expect (TreeSet2.add (88)).toEqual(true);
    expect (TreeSet2.add (50)).toEqual(true);
    expect (TreeSet2.add (30)).toEqual(true);
    expect (TreeSet2.add (1)).toEqual(true);
    expect (TreeSet2.add (48)).toEqual(true);
    expect (TreeSet2.add (62)).toEqual(true);
    expect (TreeSet2.add (78)).toEqual(true);
    expect (TreeSet2.add (17)).toEqual(true);
    expect (TreeSet2.add (70)).toEqual(true);
    expect (TreeSet2.add (80)).toEqual(true);
    expect (TreeSet2.add (32)).toEqual(true);
    expect (TreeSet2.ceiling (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.ceiling (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.ceiling (17)).toEqual(17); // 17 is there
  });

  it("Test higher", function() {
    const TreeSet2:TreeSet<number> = new TreeSet<number>(Collections.getNumberComparator());
    expect (TreeSet2.add (44)).toEqual(true);
    expect (TreeSet2.add (5)).toEqual(true);
    expect (TreeSet2.add (20)).toEqual(true);
    expect (TreeSet2.add (88)).toEqual(true);
    expect (TreeSet2.add (50)).toEqual(true);
    expect (TreeSet2.add (30)).toEqual(true);
    expect (TreeSet2.add (1)).toEqual(true);
    expect (TreeSet2.add (48)).toEqual(true);
    expect (TreeSet2.add (62)).toEqual(true);
    expect (TreeSet2.add (78)).toEqual(true);
    expect (TreeSet2.add (17)).toEqual(true);
    expect (TreeSet2.add (70)).toEqual(true);
    expect (TreeSet2.add (80)).toEqual(true);
    expect (TreeSet2.add (32)).toEqual(true);
    expect (TreeSet2.higher (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.higher (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.higher (17)).toEqual(20); // 17 is there, 20 is next
  });

  it("Test lower", function() {
    const TreeSet2:TreeSet<number> = new TreeSet<number>(Collections.getNumberComparator());
    expect (TreeSet2.add (44)).toEqual(true);
    expect (TreeSet2.add (5)).toEqual(true);
    expect (TreeSet2.add (20)).toEqual(true);
    expect (TreeSet2.add (88)).toEqual(true);
    expect (TreeSet2.add (50)).toEqual(true);
    expect (TreeSet2.add (30)).toEqual(true);
    expect (TreeSet2.add (1)).toEqual(true);
    expect (TreeSet2.add (48)).toEqual(true);
    expect (TreeSet2.add (62)).toEqual(true);
    expect (TreeSet2.add (78)).toEqual(true);
    expect (TreeSet2.add (17)).toEqual(true);
    expect (TreeSet2.add (70)).toEqual(true);
    expect (TreeSet2.add (80)).toEqual(true);
    expect (TreeSet2.add (32)).toEqual(true);
    expect (TreeSet2.lower (38)).toEqual(32); // 38 isnt there, 32 is next
    expect (TreeSet2.lower (31)).toEqual(30); // 31 isnt there, 30 is next
    expect (TreeSet2.lower (17)).toEqual(5); // 17 is there, 16 is next
  });

  it ("Test lots", function () {
    const tset = new TreeSet<string>(Collections.getStringComparator());
    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        const txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2);
        tset.add (txt);
      }
    }
    expect (tset.size ()).toEqual(26 * 26);

    let count:number = 0;
    for (const iter = tset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      const psp:string = iter.next ();
    }
    expect (count).toEqual (26 * 26);
    tset.clear();
  });

  it ("Test lots2", function () {
    const tset = new TreeSet<string>(Collections.getStringComparator());
    for (let loop2 = 1; loop2 <= 26; loop2++) {
      for (let loop1 = 1; loop1 <= 26; loop1++) {
        const txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2);
        tset.add (txt);
      }
    }

    expect (tset.validateSet()).toEqual (true);
    expect (tset.size ()).toEqual(26 * 26);

    let count:number = 0;
    for (const iter = tset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      const psp:string = iter.next ();
    }
    expect (count).toEqual (26 * 26);

    tset.clear();
  });

  it("Test constructing with elements from an ArrayList", function() {
    const sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    const tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, sourceList);
    expect (tset.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from a LinkedList", function() {
    const sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    const tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, sourceList);
    expect (tset.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from an HashSet", function() {
    const source:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (source.add (product1)).toEqual (true);
    expect (source.add (product2)).toEqual (true);

    const tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, source);
    expect (tset.size ()).toEqual(source.size());
  });

  it("Test constructing with elements from a TreeSet", function() {
    const source:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (source.add (product1)).toEqual (true);
    expect (source.add (product2)).toEqual (true);

    const tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, source);
    expect (tset.size ()).toEqual(source.size());
  });

  it("Focused test on reproducable error 0.8.0 16 Sep 2017", function() {
    const tsData:TreeSet<string> = new TreeSet<string>(Collections.getStringComparator());
    tsData.add ("Cat");
    tsData.add ("Squirrel");
    tsData.add ("Dog");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("Dog")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("hvhli");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("Cat")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("dybtc");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("dybtc")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("xuaqo");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("xuaqo")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("ktwky");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
//    tsData.printSet ();
    expect (tsData.remove ("hvhli")).toEqual (true);
//    tsData.printSet ();
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("cnnlv");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
//    tsData.printSet ();
    expect (tsData.remove ("Squirrel")).toEqual (true);
//    tsData.printSet ();
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
  });

});
