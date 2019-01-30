"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var jasts_1 = require("jasts");
var Collections_1 = require("../src/Collections");
var NavigableHash_1 = require("../src/NavigableHash");
var SkipList_1 = require("../src/SkipList");
var TreeSet_1 = require("../src/TreeSet");
// PetStoreProduct will be used in testing
var PetStoreProduct = /** @class */ (function () {
    function PetStoreProduct(iName, iPrice) {
        this.productName = iName;
        this.price = iPrice;
    }
    PetStoreProduct.prototype.getProductName = function () {
        return this.productName;
    };
    PetStoreProduct.prototype.getPrice = function () {
        return this.price;
    };
    return PetStoreProduct;
}());
var alphabeticalSortPetStoreProduct = {
    compare: function (o1, o2) {
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
var productnameComparator = Collections_1.Collections.dynamicComparator("productName");
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product1 = new PetStoreProduct("Catnip", 4.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
describe("Test NavigableSet functionality", function () {
    it("Test firstKey", function () {
        testFirstKeyNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testFirstKeyNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testFirstKeyNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testFirstKeyString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testFirstKeyString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testFirstKeyString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test lastKey", function () {
        testLastKeyNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testLastKeyNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testLastKeyNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testLastKeyString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testLastKeyString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testLastKeyString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test pollFirstKey", function () {
        testPollFirstKeyNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testPollFirstKeyNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testPollFirstKeyNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testPollFirstKeyString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testPollFirstKeyString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testPollFirstKeyString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test pollLastKey", function () {
        testPollLastKeyNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testPollLastKeyNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testPollLastKeyNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testPollLastKeyString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testPollLastKeyString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testPollLastKeyString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test ceiling", function () {
        testCeilingNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testCeilingNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testCeilingNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testCeilingString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testCeilingString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testCeilingString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test floor", function () {
        testFloorNumber(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testFloorNumber(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testFloorNumber(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testFloorString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testFloorString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testFloorString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test tostring", function () {
        testToString(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testToString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testToString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Set Test java iteration", function () {
        testJavaIteration(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
        testJavaIteration(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testJavaIteration(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testJavaIteration(new NavigableHash_1.NavigableHashSet(productnameComparator));
        testJavaIteration(new TreeSet_1.TreeSet(productnameComparator));
        testJavaIteration(new SkipList_1.SkipListSet(productnameComparator));
    });
    it("Set Test typescript iteration", function () {
        testTSIteration(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
        testTSIteration(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testTSIteration(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testTSIteration(new NavigableHash_1.NavigableHashSet(productnameComparator));
        testTSIteration(new TreeSet_1.TreeSet(productnameComparator));
        testTSIteration(new SkipList_1.SkipListSet(productnameComparator));
    });
});
function testFirstKeyNumber(set) {
    expect(set.first()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.first()).toEqual(100);
}
function testFirstKeyString(set) {
    expect(set.first()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.first()).toEqual("eighth");
}
function testLastKeyNumber(set) {
    expect(set.last()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.last()).toEqual(1000);
}
function testLastKeyString(set) {
    expect(set.last()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.last()).toEqual("third");
}
function testPollFirstKeyNumber(set) {
    expect(set.pollFirst()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.pollFirst()).toEqual(100);
    expect(set.pollFirst()).toEqual(200);
    expect(set.size()).toEqual(8);
    expect(set.isEmpty()).toEqual(false);
}
function testPollFirstKeyString(set) {
    expect(set.pollFirst()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.pollFirst()).toEqual("eighth");
    expect(set.pollFirst()).toEqual("fifth");
    expect(set.size()).toEqual(8);
    expect(set.isEmpty()).toEqual(false);
}
function testPollLastKeyNumber(set) {
    expect(set.pollLast()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.pollLast()).toEqual(1000);
    expect(set.pollLast()).toEqual(900);
    expect(set.size()).toEqual(8);
    expect(set.isEmpty()).toEqual(false);
}
function testPollLastKeyString(set) {
    expect(set.pollLast()).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.pollLast()).toEqual("third");
    expect(set.pollLast()).toEqual("tenth");
    expect(set.size()).toEqual(8);
    expect(set.isEmpty()).toEqual(false);
}
function testCeilingNumber(set) {
    expect(set.ceiling(456)).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.ceiling(456)).toEqual(500);
    expect(set.ceiling(600)).toEqual(600);
    expect(set.ceiling(1)).toEqual(100);
    expect(set.ceiling(99999)).toEqual(null);
}
function testCeilingString(set) {
    expect(set.ceiling("notfound")).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.ceiling("notfound")).toEqual("second");
    expect(set.ceiling("first")).toEqual("first");
    expect(set.ceiling("aaaaa")).toEqual("eighth");
    expect(set.ceiling("zzzzz")).toEqual(null);
}
function testFloorNumber(set) {
    expect(set.floor(456)).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.floor(456)).toEqual(400);
    expect(set.floor(600)).toEqual(600);
    expect(set.floor(1)).toEqual(null);
    expect(set.floor(99999)).toEqual(1000);
}
function testFloorString(set) {
    expect(set.floor("notfound")).toEqual(null);
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.floor("notfound")).toEqual("ninth");
    expect(set.floor("first")).toEqual("first");
    expect(set.floor("aaaaa")).toEqual(null);
    expect(set.floor("zzzzz")).toEqual("third");
}
function testToString(set) {
    jasts_1.TestString.equals("Empty set should stringify to []", JSON.stringify(set), '[]');
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    set.clear();
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    jasts_1.TestString.equals("Empty set should stringify to []", JSON.stringify(set), '[]');
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    jasts_1.TestString.equals("Full set should stringify consistently", JSON.stringify(set), '[\"eighth\",\"fifth\",\"first\",\"fourth\",\"ninth\",\"second\",\"seventh\",\"sixth\",\"tenth\",\"third\"]');
    set.clear();
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    jasts_1.TestString.equals("Empty set should stringify to []", JSON.stringify(set), '[]');
}
function testJavaIteration(set) {
    expect(set.add(product1)).toEqual(true);
    expect(set.add(product2)).toEqual(true);
    var offset = 0;
    for (var iter = set.iterator(); iter.hasNext();) {
        var psp = iter.next();
        if (offset === 0)
            expect(psp.getProductName()).toEqual(product1.getProductName()); // Catnip before ChewToy
        if (offset === 1)
            expect(psp.getProductName()).toEqual(product2.getProductName()); // Catnip before ChewToy
        if (offset > 1)
            fail();
        offset++;
    }
}
function testTSIteration(set) {
    expect(set.add(product1)).toEqual(true);
    expect(set.add(product2)).toEqual(true);
    var tsi = set[Symbol.iterator]();
    var tmp = tsi.next();
    expect(tmp.done).toEqual(false);
    expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1)); // Catnip before ChewToy
    tmp = tsi.next();
    expect(tmp.done).toEqual(false);
    expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2)); // Catnip before ChewToy
    tmp = tsi.next();
    expect(tmp.done).toEqual(true);
}
function addTestNumbers(set) {
    expect(set.add(300)).toEqual(true);
    expect(set.add(600)).toEqual(true);
    expect(set.add(900)).toEqual(true);
    expect(set.add(1000)).toEqual(true);
    expect(set.add(700)).toEqual(true);
    expect(set.add(400)).toEqual(true);
    expect(set.add(100)).toEqual(true);
    expect(set.add(200)).toEqual(true);
    expect(set.add(500)).toEqual(true);
    expect(set.add(800)).toEqual(true);
}
function addTestStrings(set) {
    expect(set.add("first")).toEqual(true);
    expect(set.add("second")).toEqual(true);
    expect(set.add("third")).toEqual(true);
    expect(set.add("fourth")).toEqual(true);
    expect(set.add("fifth")).toEqual(true);
    expect(set.add("sixth")).toEqual(true);
    expect(set.add("seventh")).toEqual(true);
    expect(set.add("eighth")).toEqual(true);
    expect(set.add("ninth")).toEqual(true);
    expect(set.add("tenth")).toEqual(true);
}
