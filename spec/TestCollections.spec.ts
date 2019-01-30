/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {Hashable} from "../src/Hashable";
import {ImmutableList} from "../src/ImmutableList";
import {TestBoolean} from 'jasts';
import {TestNumber} from 'jasts';
import {TestString} from 'jasts';
import {ArrayList} from "../src/ArrayList";
import {SkipListSet} from "../src/SkipList";

describe("Test Collections static methods", function() {

  it('Test asArray for null and undefined', function () {
    expect (Collections.asArray(null)).toEqual (null);
    expect (Collections.asArray(undefined)).toEqual (undefined);
  });

  it ('Test asArray empty collections', function () {
    const al : ArrayList<string> = new ArrayList<string>();
    const ala : Array<string> = Collections.asArray(al);
    TestNumber.equals ("Empty Array from SkipListMap should have length zero", ala.length, 0);

    const sl : SkipListSet<string> = new SkipListSet<string>(Collections.getStringComparator());
    const sla : Array<string> = Collections.asArray(sl);
    TestNumber.equals ("Empty Array from SkipListMap should have length zero", sla.length, 0);
  });

  it ('Test asArray populated collections', function () {
    const al : ArrayList<string> = new ArrayList<string>();
    al.add ("first");
    al.add ("second");
    al.add ("third");
    al.add ("fourth");
    const ala : Array<string> = Collections.asArray(al);
    TestNumber.equals ("Populated Array from SkipListMap should have length four", ala.length, 4);
    TestString.equals ("first string is first", ala[0], "first");
    TestString.equals ("second string is second", ala[1], "second");
    TestString.equals ("third string is third", ala[2], "third");
    TestString.equals ("fourth string is fourth", ala[3], "fourth");
  });

  it("getStringComparator compare with self", function() {
    const comp:Comparator<string> = Collections.getStringComparator();

    TestNumber.equals ("Comparing something with itself returns 0", comp.compare ("something", "something"), 0);
    TestNumber.equals ("Comparing null with itself returns 0", comp.compare (null, null), 0);
    TestNumber.equals ("Comparing undefined with itself returns 0", comp.compare (undefined, undefined), 0);
  });

  it("getStringComparator compare with undefined", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing undefined vs undefined returns 0", comp.compare (undefined, undefined), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, "something"), -1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare ("something", undefined), 1);
  });

  it("getStringComparator compare with null", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing null vs null returns 0", comp.compare (null, null), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare ("something", null), 1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, "something"), -1);
  });

  it("getStringComparator compare with a real string", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, "something"), -1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, "something"), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare ("something", null), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare ("something", undefined), 1);

    TestNumber.equals ("Comparing a lower string vs a higher string returns -1", comp.compare ("AAA", "BBB"), -1);
    TestNumber.equals ("Comparing a higher string vs a lower string returns 1", comp.compare ("CCC", "BBB"), 1);
    TestNumber.equals ("Comparing a string vs itself returns 0", comp.compare ("DDD", "DDD"), 0);
  });

  it("getNumberComparator compare with self", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();

    TestNumber.equals ("Comparing something with itself returns 0", comp.compare (50, 50), 0);
    TestNumber.equals ("Comparing null with itself returns 0", comp.compare (null, null), 0);
    TestNumber.equals ("Comparing undefined with itself returns 0", comp.compare (undefined, undefined), 0);
  });

  it("getNumberComparator compare with undefined", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing undefined vs undefined returns 0", comp.compare (undefined, undefined), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, 50), -1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare (50, undefined), 1);
  });

  it("getNumberComparator compare with null", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing null vs null returns 0", comp.compare (null, null), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare (50, null), 1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, 50), -1);
  });

  it("getNumberComparator compare with a real string", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, 50), -1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, 50), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare (50, null), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare (50, undefined), 1);

    TestNumber.equals ("Comparing a lower number vs a higher number returns -1", comp.compare (10, 100), -1);
    TestNumber.equals ("Comparing a higher number vs a lower number returns 1", comp.compare (200, 20), 1);
    TestNumber.equals ("Comparing a number vs itself returns 0", comp.compare (1000, 1000), 0);
  });

  it("getHashCodeForString undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForString (undefined), 0);
  });

  it("getHashCodeForString null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForString (null), 0);
  });

  it("getHashCodeForString data", function() {
    TestNumber.greaterThan ("hash code for One is valid", Collections.getHashCodeForString ("One"), 0);
  });

  it("getHashCodeForStrings undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForStrings (undefined), 0);
  });

  it("getHashCodeForStrings null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForStrings (null), 0);
  });

  it("getHashCodeForStrings data", function() {
    const tmp:ImmutableList<string> = Collections.list("One", "Two", "Three");
    TestNumber.greaterThan ("hash code for OneTwothree is valid", Collections.getHashCodeForStrings (tmp), 0);
  });

  it("getHashCodeForNumber undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForNumber (undefined), 0);
  });

  it("getHashCodeForNumber null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForNumber (null), 0);
  });

  it("getHashCodeForNumber small", function() {
    TestNumber.equals ("hash code for low integers is itself", Collections.getHashCodeForNumber (50), 50);
  });

  it ("Dynamic Collectable skuCollectable", function () {
    const skuCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("sku");
    // SkuCollectable will differentiate psp1 psp2 psp3
    TestBoolean.false ("skuCollectable psp1 psp2", skuCollectable.equals(psp1, psp2));
    TestBoolean.false ("skuCollectable psp1 psp3", skuCollectable.equals(psp1, psp3));
    TestBoolean.false ("skuCollectable psp2 psp3", skuCollectable.equals(psp2, psp3));

    // SkuCollectable cannot differentiate psp1 psp1copy and psp3copy
    TestBoolean.true ("skuCollectable psp1 psp1copy", skuCollectable.equals(psp1, psp1copy));
    TestBoolean.true ("skuCollectable psp1 psp3copy", skuCollectable.equals(psp1, psp3copy));

    // The others will be differentiated
    TestBoolean.false ("skuCollectable psp1copy psp2", skuCollectable.equals(psp1copy, psp2));
    TestBoolean.false ("skuCollectable psp1copy psp3", skuCollectable.equals(psp1copy, psp3));
    TestBoolean.false ("skuCollectable psp3copy psp2", skuCollectable.equals(psp3copy, psp2));
    TestBoolean.false ("skuCollectable psp3copy psp3", skuCollectable.equals(psp3copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("skuCollectable psp1 null", skuCollectable.equals(psp1, null));
    TestBoolean.false ("skuCollectable psp1 undefined", skuCollectable.equals(psp1, undefined));
    TestBoolean.false ("skuCollectable null psp1", skuCollectable.equals(null, psp1));
    TestBoolean.false ("skuCollectable undefined psp1", skuCollectable.equals(undefined, psp1));
    TestBoolean.true ("skuCollectable null null", skuCollectable.equals(null, null));
    TestBoolean.true ("skuCollectable undefined undefined", skuCollectable.equals(undefined, undefined));
    TestBoolean.false ("skuCollectable null undefined", skuCollectable.equals(null, undefined));
    TestBoolean.false ("skuCollectable undefined null", skuCollectable.equals(undefined, null));
  });

  it ("Dynamic Collectable nameCollectable", function () {
    const nameCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("name");
    // NameCollectable will differentiate psp1 psp2 psp3
    TestBoolean.false ("nameCollectable psp1 psp2", nameCollectable.equals(psp1, psp2));
    TestBoolean.false ("nameCollectable psp1 psp3", nameCollectable.equals(psp1, psp3));
    TestBoolean.false ("nameCollectable psp2 psp3", nameCollectable.equals(psp2, psp3));

    // nameCollectable cannot differentiate psp2 and psp2copy
    TestBoolean.true ("nameCollectable psp2 psp2copy", nameCollectable.equals(psp2, psp2copy));

    // The others will be differentiated
    TestBoolean.false ("nameCollectable psp2copy psp1", nameCollectable.equals(psp2copy, psp1));
    TestBoolean.false ("nameCollectable psp2copy psp3", nameCollectable.equals(psp2copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("nameCollectable psp1 null", nameCollectable.equals(psp1, null));
    TestBoolean.false ("nameCollectable psp1 undefined", nameCollectable.equals(psp1, undefined));
    TestBoolean.false ("nameCollectable null psp1", nameCollectable.equals(null, psp1));
    TestBoolean.false ("nameCollectable undefined psp1", nameCollectable.equals(undefined, psp1));
    TestBoolean.true ("nameCollectable null null", nameCollectable.equals(null, null));
    TestBoolean.true ("nameCollectable undefined undefined", nameCollectable.equals(undefined, undefined));
    TestBoolean.false ("nameCollectable null undefined", nameCollectable.equals(null, undefined));
    TestBoolean.false ("nameCollectable undefined null", nameCollectable.equals(undefined, null));
  });

  it ("Dynamic Collectable skuNameCollectable", function () {
    const skuNameCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("sku", "name");

    // skuNameCollectable will differentiate psp1 psp2 psp3 psp1copy psp2copy
    TestBoolean.false ("skuNameCollectable psp1 psp2", skuNameCollectable.equals(psp1, psp2));
    TestBoolean.false ("skuNameCollectable psp1 psp3", skuNameCollectable.equals(psp1, psp3));
    TestBoolean.false ("skuNameCollectable psp1 psp1copy", skuNameCollectable.equals(psp1, psp1copy));
    TestBoolean.false ("skuNameCollectable psp1 psp2copy", skuNameCollectable.equals(psp1, psp2copy));
    TestBoolean.false ("skuNameCollectable psp2 psp3", skuNameCollectable.equals(psp2, psp3));
    TestBoolean.false ("skuNameCollectable psp2 psp1copy", skuNameCollectable.equals(psp2, psp1copy));
    TestBoolean.false ("skuNameCollectable psp2 psp2copy", skuNameCollectable.equals(psp2, psp2copy));
    TestBoolean.false ("skuNameCollectable psp2 psp3copy", skuNameCollectable.equals(psp2, psp3copy));
    TestBoolean.false ("skuNameCollectable psp3 psp1copy", skuNameCollectable.equals(psp3, psp1copy));
    TestBoolean.false ("skuNameCollectable psp3 psp2copy", skuNameCollectable.equals(psp3, psp2copy));
    TestBoolean.false ("skuNameCollectable psp3 psp3copy", skuNameCollectable.equals(psp3, psp3copy));
    TestBoolean.false ("skuNameCollectable psp1copy psp2copy", skuNameCollectable.equals(psp1copy, psp2copy));
    TestBoolean.false ("skuNameCollectable psp1copy psp3copy", skuNameCollectable.equals(psp1copy, psp3copy));

    // nameCollectable cannot differentiate psp1 and psp3copy
    TestBoolean.true ("nameCollectable psp1 psp3copy", skuNameCollectable.equals(psp1, psp3copy));

    // Compare vs null and undefined
    TestBoolean.false ("skuNameCollectable psp1 null", skuNameCollectable.equals(psp1, null));
    TestBoolean.false ("skuNameCollectable psp1 undefined", skuNameCollectable.equals(psp1, undefined));
    TestBoolean.false ("skuNameCollectable null psp1", skuNameCollectable.equals(null, psp1));
    TestBoolean.false ("skuNameCollectable undefined psp1", skuNameCollectable.equals(undefined, psp1));
    TestBoolean.true ("skuNameCollectable null null", skuNameCollectable.equals(null, null));
    TestBoolean.true ("skuNameCollectable undefined undefined", skuNameCollectable.equals(undefined, undefined));
    TestBoolean.false ("skuNameCollectable null undefined", skuNameCollectable.equals(null, undefined));
    TestBoolean.false ("skuNameCollectable undefined null", skuNameCollectable.equals(undefined, null));
  });

  it ("Dynamic Collectable null and undefined fields", function () {
    const skuNameCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("sku", "name");
    TestBoolean.false ("skuNameCollectable psp1 null", skuNameCollectable.equals(psp1, pspnull));
    TestBoolean.false ("skuNameCollectable psp2 null", skuNameCollectable.equals(psp2, pspnull));
    TestBoolean.false ("skuNameCollectable psp3 null", skuNameCollectable.equals(psp3, pspnull));

    TestBoolean.false ("skuNameCollectable psp1 undefined", skuNameCollectable.equals(psp1, pspundefined));
    TestBoolean.false ("skuNameCollectable psp2 undefined", skuNameCollectable.equals(psp2, pspundefined));
    TestBoolean.false ("skuNameCollectable psp3 undefined", skuNameCollectable.equals(psp3, pspundefined));

    TestBoolean.false ("skuNameCollectable undefined null", skuNameCollectable.equals(pspundefined, pspnull));
    TestBoolean.false ("skuNameCollectable null undefined", skuNameCollectable.equals(pspnull, pspundefined));

    TestBoolean.true ("skuNameCollectable null null", skuNameCollectable.equals(pspnull, pspnull));
    TestBoolean.true ("skuNameCollectable undefined undefined", skuNameCollectable.equals(pspundefined, pspundefined));
  });

  it ("Dynamic Hashable skuHashable", function () {
    const skuHashable:Hashable<PetStoreProduct> = Collections.dynamicHashable("sku");
    // SkuHashable will differentiate psp1 psp2 psp3
    TestBoolean.false ("skuHashable psp1 psp2", skuHashable.equals(psp1, psp2));
    TestBoolean.false ("skuHashable psp1 psp3", skuHashable.equals(psp1, psp3));
    TestBoolean.false ("skuHashable psp2 psp3", skuHashable.equals(psp2, psp3));

    // SkuHashable cannot differentiate psp1 psp1copy and psp3copy
    TestBoolean.true ("skuHashable psp1 psp1copy", skuHashable.equals(psp1, psp1copy));
    TestBoolean.true ("skuHashable psp1 psp3copy", skuHashable.equals(psp1, psp3copy));

    // The others will be differentiated
    TestBoolean.false ("skuHashable psp1copy psp2", skuHashable.equals(psp1copy, psp2));
    TestBoolean.false ("skuHashable psp1copy psp3", skuHashable.equals(psp1copy, psp3));
    TestBoolean.false ("skuHashable psp3copy psp2", skuHashable.equals(psp3copy, psp2));
    TestBoolean.false ("skuHashable psp3copy psp3", skuHashable.equals(psp3copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("skuHashable psp1 null", skuHashable.equals(psp1, null));
    TestBoolean.false ("skuHashable psp1 undefined", skuHashable.equals(psp1, undefined));
    TestBoolean.false ("skuHashable null psp1", skuHashable.equals(null, psp1));
    TestBoolean.false ("skuHashable undefined psp1", skuHashable.equals(undefined, psp1));
    TestBoolean.true ("skuHashable null null", skuHashable.equals(null, null));
    TestBoolean.true ("skuHashable undefined undefined", skuHashable.equals(undefined, undefined));
    TestBoolean.false ("skuHashable null undefined", skuHashable.equals(null, undefined));
    TestBoolean.false ("skuHashable undefined null", skuHashable.equals(undefined, null));
  });

  it ("Dynamic Hashable nameHashable", function () {
    const nameHashable:Hashable<PetStoreProduct> = Collections.dynamicHashable("name");
    // NameHashable will differentiate psp1 psp2 psp3
    TestBoolean.false ("nameHashable psp1 psp2", nameHashable.equals(psp1, psp2));
    TestBoolean.false ("nameHashable psp1 psp3", nameHashable.equals(psp1, psp3));
    TestBoolean.false ("nameHashable psp2 psp3", nameHashable.equals(psp2, psp3));

    // nameHashable cannot differentiate psp2 and psp2copy
    TestBoolean.true ("nameHashable psp2 psp2copy", nameHashable.equals(psp2, psp2copy));

    // The others will be differentiated
    TestBoolean.false ("nameHashable psp2copy psp1", nameHashable.equals(psp2copy, psp1));
    TestBoolean.false ("nameHashable psp2copy psp3", nameHashable.equals(psp2copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("nameHashable psp1 null", nameHashable.equals(psp1, null));
    TestBoolean.false ("nameHashable psp1 undefined", nameHashable.equals(psp1, undefined));
    TestBoolean.false ("nameHashable null psp1", nameHashable.equals(null, psp1));
    TestBoolean.false ("nameHashable undefined psp1", nameHashable.equals(undefined, psp1));
    TestBoolean.true ("nameHashable null null", nameHashable.equals(null, null));
    TestBoolean.true ("nameHashable undefined undefined", nameHashable.equals(undefined, undefined));
    TestBoolean.false ("nameHashable null undefined", nameHashable.equals(null, undefined));
    TestBoolean.false ("nameHashable undefined null", nameHashable.equals(undefined, null));
  });

  it ("Dynamic Hashable skuNameHashable", function () {
    const skuNameHashable:Hashable<PetStoreProduct> = Collections.dynamicHashable("sku", "name");

    // skuNameHashable will differentiate psp1 psp2 psp3 psp1copy psp2copy
    TestBoolean.false ("skuNameHashable psp1 psp2", skuNameHashable.equals(psp1, psp2));
    TestBoolean.false ("skuNameHashable psp1 psp3", skuNameHashable.equals(psp1, psp3));
    TestBoolean.false ("skuNameHashable psp1 psp1copy", skuNameHashable.equals(psp1, psp1copy));
    TestBoolean.false ("skuNameHashable psp1 psp2copy", skuNameHashable.equals(psp1, psp2copy));
    TestBoolean.false ("skuNameHashable psp2 psp3", skuNameHashable.equals(psp2, psp3));
    TestBoolean.false ("skuNameHashable psp2 psp1copy", skuNameHashable.equals(psp2, psp1copy));
    TestBoolean.false ("skuNameHashable psp2 psp2copy", skuNameHashable.equals(psp2, psp2copy));
    TestBoolean.false ("skuNameHashable psp2 psp3copy", skuNameHashable.equals(psp2, psp3copy));
    TestBoolean.false ("skuNameHashable psp3 psp1copy", skuNameHashable.equals(psp3, psp1copy));
    TestBoolean.false ("skuNameHashable psp3 psp2copy", skuNameHashable.equals(psp3, psp2copy));
    TestBoolean.false ("skuNameHashable psp3 psp3copy", skuNameHashable.equals(psp3, psp3copy));
    TestBoolean.false ("skuNameHashable psp1copy psp2copy", skuNameHashable.equals(psp1copy, psp2copy));
    TestBoolean.false ("skuNameHashable psp1copy psp3copy", skuNameHashable.equals(psp1copy, psp3copy));

    // nameHashable cannot differentiate psp1 and psp3copy
    TestBoolean.true ("nameHashable psp1 psp3copy", skuNameHashable.equals(psp1, psp3copy));

    // Compare vs null and undefined
    TestBoolean.false ("skuNameHashable psp1 null", skuNameHashable.equals(psp1, null));
    TestBoolean.false ("skuNameHashable psp1 undefined", skuNameHashable.equals(psp1, undefined));
    TestBoolean.false ("skuNameHashable null psp1", skuNameHashable.equals(null, psp1));
    TestBoolean.false ("skuNameHashable undefined psp1", skuNameHashable.equals(undefined, psp1));
    TestBoolean.true ("skuNameHashable null null", skuNameHashable.equals(null, null));
    TestBoolean.true ("skuNameHashable undefined undefined", skuNameHashable.equals(undefined, undefined));
    TestBoolean.false ("skuNameHashable null undefined", skuNameHashable.equals(null, undefined));
    TestBoolean.false ("skuNameHashable undefined null", skuNameHashable.equals(undefined, null));
  });

  it ("Dynamic Hashable null and undefined fields", function () {
    const skuNameHashable:Hashable<PetStoreProduct> = Collections.dynamicHashable("sku", "name");
    TestBoolean.false ("skuNameHashable psp1 null", skuNameHashable.equals(psp1, pspnull));
    TestBoolean.false ("skuNameHashable psp2 null", skuNameHashable.equals(psp2, pspnull));
    TestBoolean.false ("skuNameHashable psp3 null", skuNameHashable.equals(psp3, pspnull));

    TestBoolean.false ("skuNameHashable psp1 undefined", skuNameHashable.equals(psp1, pspundefined));
    TestBoolean.false ("skuNameHashable psp2 undefined", skuNameHashable.equals(psp2, pspundefined));
    TestBoolean.false ("skuNameHashable psp3 undefined", skuNameHashable.equals(psp3, pspundefined));

    TestBoolean.false ("skuNameHashable undefined null", skuNameHashable.equals(pspundefined, pspnull));
    TestBoolean.false ("skuNameHashable null undefined", skuNameHashable.equals(pspnull, pspundefined));

    TestBoolean.true ("skuNameHashable null null", skuNameHashable.equals(pspnull, pspnull));
    TestBoolean.true ("skuNameHashable undefined undefined", skuNameHashable.equals(pspundefined, pspundefined));
  });

  it ("Dynamic Hashable hascode", function () {
    const nameHashable:Hashable<PetStoreProduct> = Collections.dynamicHashable("name");
    TestNumber.equals ("undefined hashcode is zero", nameHashable.hashCode(undefined), 0);
    TestNumber.equals ("null hashcode is zero", nameHashable.hashCode(null), 0);
    TestNumber.notEquals ("psp1 hashcode is non-zero", nameHashable.hashCode(psp1), 0);
    TestNumber.notEquals ("psp2 hashcode is non-zero", nameHashable.hashCode(psp2), 0);
    TestNumber.notEquals ("psp3 hashcode is non-zero", nameHashable.hashCode(psp3), 0);
  });

  it ("Dynamic Comparator number field", function () {
    const nc:Comparator<PetStoreProduct> = Collections.dynamicComparator<PetStoreProduct>("sku");
    TestNumber.equals ("same null object equals itself", nc.compare(pspnull, pspnull), 0);
    TestNumber.equals ("different null object equals itself", nc.compare(pspnull, pspalsonull), 0);
    TestNumber.equals ("same undefined object equals itself", nc.compare(pspundefined, pspundefined), 0);
    TestNumber.equals ("different undefined object equals itself", nc.compare(pspundefined, pspalsoundefined), 0);
    TestNumber.equals ("undefined is less than null", nc.compare(pspundefined, pspnull), -1);
    TestNumber.equals ("null is more than undefined", nc.compare(pspnull, pspundefined), 1);
    TestNumber.equals ("undefined is less than a value", nc.compare(pspundefined, psp1), -1);
    TestNumber.equals ("a value is more than undefined", nc.compare(psp1, pspundefined), 1);
    TestNumber.equals ("null is less than a value", nc.compare(pspnull, psp1), -1);
    TestNumber.equals ("a value is more than null", nc.compare(psp1, pspnull), 1);
    TestNumber.equals ("same value equals itself", nc.compare(psp1, psp1), 0);
    TestNumber.equals ("different object with same value equals itself", nc.compare(psp1, psp1copy), 0); // sku = 1
    TestNumber.equals ("higher values are higher than lower values", nc.compare(psp2, psp1), 1);
    TestNumber.equals ("lower values are lower than higher values", nc.compare(psp1, psp2), -1);
  });

  it ("Dynamic Comparator string field", function () {
    const nc:Comparator<PetStoreProduct> = Collections.dynamicComparator<PetStoreProduct>("name");
    TestNumber.equals ("same null object equals itself", nc.compare(pspnull, pspnull), 0);
    TestNumber.equals ("different null object equals itself", nc.compare(pspnull, pspalsonull), 0);
    TestNumber.equals ("same undefined object equals itself", nc.compare(pspundefined, pspundefined), 0);
    TestNumber.equals ("different undefined object equals itself", nc.compare(pspundefined, pspalsoundefined), 0);
    TestNumber.equals ("undefined is less than null", nc.compare(pspundefined, pspnull), -1);
    TestNumber.equals ("null is more than undefined", nc.compare(pspnull, pspundefined), 1);
    TestNumber.equals ("undefined is less than a value", nc.compare(pspundefined, psp1), -1);
    TestNumber.equals ("a value is more than undefined", nc.compare(psp1, pspundefined), 1);
    TestNumber.equals ("null is less than a value", nc.compare(pspnull, psp1), -1);
    TestNumber.equals ("a value is more than null", nc.compare(psp1, pspnull), 1);
    TestNumber.equals ("same value equals itself", nc.compare(psp1, psp1), 0);
    TestNumber.equals ("different object with same value equals itself", nc.compare(psp1, psp3copy), 0); // name = A
    TestNumber.equals ("higher values are higher than lower values", nc.compare(psp2, psp1), 1);
    TestNumber.equals ("lower values are lower than higher values", nc.compare(psp1, psp2), -1);
  });

  it ("Dynamic Comparator compound number string", function () {
    const nc:Comparator<PetStoreProduct> = Collections.dynamicComparator<PetStoreProduct>("sku", "name");
    TestNumber.equals ("same null object equals itself", nc.compare(pspnull, pspnull), 0);
    TestNumber.equals ("different null object equals itself", nc.compare(pspnull, pspalsonull), 0);
    TestNumber.equals ("same undefined object equals itself", nc.compare(pspundefined, pspundefined), 0);
    TestNumber.equals ("different undefined object equals itself", nc.compare(pspundefined, pspalsoundefined), 0);
    TestNumber.equals ("undefined is less than null", nc.compare(pspundefined, pspnull), -1);
    TestNumber.equals ("null is more than undefined", nc.compare(pspnull, pspundefined), 1);
    TestNumber.equals ("undefined is less than a value", nc.compare(pspundefined, psp1), -1);
    TestNumber.equals ("a value is more than undefined", nc.compare(psp1, pspundefined), 1);
    TestNumber.equals ("null is less than a value", nc.compare(pspnull, psp1), -1);
    TestNumber.equals ("a value is more than null", nc.compare(psp1, pspnull), 1);
    TestNumber.equals ("same value equals itself", nc.compare(psp1, psp1), 0);
    TestNumber.equals ("different value with same keys equals itself", nc.compare(psp1, psp3copy), 0);  // Sku 1 Name A

    TestNumber.equals ("higher values on first field are higher than lower values", nc.compare(psp2, psp1), 1);
    TestNumber.equals ("lower values on first field are lower than higher values", nc.compare(psp1, psp2), -1);

    TestNumber.equals ("higher values on first field outweigh second field", nc.compare(psp2copy, psp1copy), 1);
    TestNumber.equals ("lower values on first field outweigh second field", nc.compare(psp1copy, psp2copy), -1);

    TestNumber.equals ("higher values on second field", nc.compare(psp1copy, psp3copy), 1);
    TestNumber.equals ("lower values on second field", nc.compare(psp3copy, psp1copy), -1);
  });
});

/*
 * This class is a simple class that the default Collectable
 * will properly handle.
 * The copy instances below are to test the dynamicCollectable method
 */
class PetStoreProduct {
  public sku:number;
  public name:string;
  public brand:string;

  constructor (isku:number, iname:string, ibrand:string) {
    this.sku = isku;
    this.name = iname;
    this.brand = ibrand;
  }
}

const psp1:PetStoreProduct = new PetStoreProduct (1, "A", "A");
const psp2:PetStoreProduct = new PetStoreProduct (2, "B", "B");
const psp3:PetStoreProduct = new PetStoreProduct (3, "C", "C");

const psp1copy:PetStoreProduct = new PetStoreProduct (1, "D", "D");  // duplicate sku
const psp2copy:PetStoreProduct = new PetStoreProduct (5, "B", "E");  // duplicate product name
const psp3copy:PetStoreProduct = new PetStoreProduct (1, "A", "F");  // duplicate sku and product name

const pspnull:PetStoreProduct = new PetStoreProduct (null, null, null);
const pspundefined:PetStoreProduct = new PetStoreProduct (undefined, undefined, undefined);
const pspalsonull:PetStoreProduct = new PetStoreProduct (null, null, null);
const pspalsoundefined:PetStoreProduct = new PetStoreProduct (undefined, undefined, undefined);
