/* eslint no-unused-expressions: "off" */

// const path = require('path');
const {expect} = require('../../../../test/helpers');
const Collection = require('../src/collections/collection');

const EntityCollection = require('../src/collections/entity-collection');
const Entity = require('../src/entities/entity');

const FileCollection = require('../src/collections/file-collection');
const File = require('../src/entities/file');

const ComponentCollection = require('../src/collections/component-collection');
const Component = require('../src/entities/component');

const VariantCollection = require('../src/collections/variant-collection');
const Variant = require('../src/entities/variant');

const makeCollection = input => new Collection(input);
const makeComponentCollection = input => new ComponentCollection(input);
const makeVariantCollection = input => new VariantCollection(input);
const makeFileCollection = input => new FileCollection(input);
const makeEntityCollection = input => new EntityCollection(input);

const validFileDefs = [{
  path: '/component/a'
}, {
  path: '/component/b'
}, {
  path: '/component/c'
}];
const validEntityDefs = validFileDefs;
const validVariantDefs = [{
  name: 'variant-1',
  component: 'parent-component'
}, {
  name: 'variant-2',
  component: 'parent-component'
}, {
  name: 'variant-3',
  component: 'parent-component'
}];

const validComponentDefs = validFileDefs.map(entity => ({
  src: new File(entity)
}));

const componentMap = i => new Component(i);
const fileMap = i => new File(i);
const entityMap = i => new Entity(i);
const variantMap = i => new Variant(i);
const objectMap = i => Object.assign({}, i);

const entityFromVariantMap = i => new Entity({
  src: i.name
});
const fileFromVariantMap = i => new File({path: i.name});
const compFromVariantMap = i => new Component({src: new File({path: i.name})});

const entityFromCompMap = i => new Entity({
  src: i.getSrc()
});
const fileFromCompMap = i => i.getSrc();
const variantFromCompMap = i => new Variant({
  name: i.getSrc().stem,
  component: 'parent-component'
});

const entityFromFileMap = i => new Entity({
  src: i.stem
});
const compFromFileMap = i => new Component({
  src: i
});
const variantFromFileMap = i => new Variant({
  name: i.stem,
  component: 'parent-component'
});

const compFromEntityMap = i => new Component({
  src: new File(i)
});
const variantFromEntityMap = i => new Variant({
  name: i.path,
  component: 'parent-component'
});

describe('Collection Mapping', function () {
  describe(`ComponentCollection`, function () {
    it(`syncronously converts to a ComponentCollection when map returns a Component`, function () {
      testAtoACollection(makeComponentCollection(validComponentDefs), componentMap, ComponentCollection, ComponentCollection);
    });
    it(`syncronously converts to a FileCollection when map returns a File`, function () {
      testCtoCCollection(makeComponentCollection(validComponentDefs), fileFromCompMap, ComponentCollection, FileCollection);
    });
    it(`syncronously converts to a EntityCollection when map returns an Entity`, function () {
      testCtoACollection(makeComponentCollection(validComponentDefs), entityFromCompMap, ComponentCollection, EntityCollection);
    });
    it(`syncronously converts to a VariantCollection when map returns a Variant`, function () {
      testCtoCCollection(makeComponentCollection(validComponentDefs), variantFromCompMap, ComponentCollection, VariantCollection);
    });
    it(`syncronously converts to a Collection when map returns an Object`, function () {
      testCtoACollection(makeComponentCollection(validComponentDefs), objectMap, ComponentCollection, Collection);
    });

    it(`asyncronously converts to a ComponentCollection when mapAsync returns a Component`, async function () {
      await asyncTestAtoACollection(makeComponentCollection(validComponentDefs), componentMap, ComponentCollection, ComponentCollection);
    });
    it(`asyncronously converts to a FileCollection when mapAsync returns a File`, async function () {
      await asyncTestCtoCCollection(makeComponentCollection(validComponentDefs), fileFromCompMap, ComponentCollection, FileCollection);
    });
    it(`asyncronously converts to a EntityCollection when mapAsync returns an Entity`, async function () {
      await asyncTestCtoACollection(makeComponentCollection(validComponentDefs), entityFromCompMap, ComponentCollection, EntityCollection);
    });
    it(`asyncronously converts to a VariantCollection when mapAsync returns a Variant`, async function () {
      await asyncTestCtoCCollection(makeComponentCollection(validComponentDefs), variantFromCompMap, ComponentCollection, VariantCollection);
    });
    it(`asyncronously converts to a Collection when mapAsync returns an Object`, async function () {
      await asyncTestCtoACollection(makeComponentCollection(validComponentDefs), objectMap, ComponentCollection, Collection);
    });
  });

  describe(`FileCollection`, function () {
    it(`syncronously converts to a ComponentCollection when map returns a Component`, function () {
      testCtoCCollection(makeFileCollection(validFileDefs), compFromFileMap, FileCollection, ComponentCollection);
    });
    it(`syncronously converts to a FileCollection when map returns a File`, function () {
      testAtoACollection(makeFileCollection(validFileDefs), fileMap, FileCollection, FileCollection);
    });
    it(`syncronously converts to a EntityCollection when map returns an Entity`, function () {
      testCtoACollection(makeFileCollection(validFileDefs), entityFromFileMap, FileCollection, EntityCollection);
    });
    it(`syncronously converts to a VariantCollection when map returns a Variant`, function () {
      testCtoCCollection(makeFileCollection(validFileDefs), variantFromFileMap, FileCollection, VariantCollection);
    });
    it(`syncronously converts to a Collection when map returns an Object`, function () {
      testCtoACollection(makeFileCollection(validFileDefs), objectMap, FileCollection, Collection);
    });

    it(`asyncronously converts to a ComponentCollection when map returns a Component`, async function () {
      await asyncTestCtoCCollection(makeFileCollection(validFileDefs), compFromFileMap, FileCollection, ComponentCollection);
    });
    it(`asyncronously converts to a FileCollection when map returns a File`, async function () {
      await asyncTestAtoACollection(makeFileCollection(validFileDefs), fileMap, FileCollection, FileCollection);
    });
    it(`asyncronously converts to a EntityCollection when map returns an Entity`, async function () {
      await asyncTestCtoACollection(makeFileCollection(validFileDefs), entityFromFileMap, FileCollection, EntityCollection);
    });
    it(`asyncronously converts to a VariantCollection when map returns a Variant`, async function () {
      await asyncTestCtoCCollection(makeFileCollection(validFileDefs), variantFromFileMap, FileCollection, VariantCollection);
    });
    it(`asyncronously converts to a Collection when map returns an Object`, async function () {
      await asyncTestCtoACollection(makeFileCollection(validFileDefs), objectMap, FileCollection, Collection);
    });
  });

  describe(`EntityCollection`, function () {
    it(`syncronously converts to a ComponentCollection when map returns a Component`, function () {
      testAtoCCollection(makeEntityCollection(validEntityDefs), compFromEntityMap, EntityCollection, ComponentCollection);
    });
    it(`syncronously converts to a FileCollection when map returns a File`, function () {
      testAtoCCollection(makeEntityCollection(validEntityDefs), fileMap, EntityCollection, FileCollection);
    });
    it(`syncronously converts to a EntityCollection when map returns an Entity`, function () {
      testAtoACollection(makeEntityCollection(validEntityDefs), entityMap, EntityCollection, EntityCollection);
    });
    it(`syncronously converts to a VariantCollection when map returns a Variant`, function () {
      testAtoCCollection(makeEntityCollection(validEntityDefs), variantFromEntityMap, EntityCollection, VariantCollection);
    });
    it(`syncronously converts to a Collection when map returns an Object`, function () {
      testCtoACollection(makeEntityCollection(validEntityDefs), objectMap, EntityCollection, Collection);
    });

    it(`asyncronously converts to a ComponentCollection when map returns a Component`, async function () {
      await asyncTestAtoCCollection(makeEntityCollection(validEntityDefs), compFromEntityMap, EntityCollection, ComponentCollection);
    });
    it(`asyncronously converts to a FileCollection when map returns a File`, async function () {
      await asyncTestAtoCCollection(makeEntityCollection(validEntityDefs), fileMap, EntityCollection, FileCollection);
    });
    it(`asyncronously converts to a EntityCollection when map returns an Entity`, async function () {
      await asyncTestAtoACollection(makeEntityCollection(validEntityDefs), entityMap, EntityCollection, EntityCollection);
    });
    it(`asyncronously converts to a VariantCollection when map returns a Variant`, async function () {
      await asyncTestAtoCCollection(makeEntityCollection(validEntityDefs), variantFromEntityMap, EntityCollection, VariantCollection);
    });
    it(`asyncronously converts to a Collection when map returns an Object`, async function () {
      await asyncTestCtoACollection(makeEntityCollection(validEntityDefs), objectMap, EntityCollection, Collection);
    });
  });

  describe(`VariantCollection`, function () {
    it(`syncronously converts to a ComponentCollection when map returns a Component`, function () {
      testCtoCCollection(makeVariantCollection(validVariantDefs), compFromVariantMap, VariantCollection, ComponentCollection);
    });
    it(`syncronously converts to a FileCollection when map returns a File`, function () {
      testCtoCCollection(makeVariantCollection(validVariantDefs), fileFromVariantMap, VariantCollection, FileCollection);
    });
    it(`syncronously converts to a EntityCollection when map returns an Entity`, function () {
      testCtoACollection(makeVariantCollection(validVariantDefs), entityFromVariantMap, VariantCollection, EntityCollection);
    });
    it(`syncronously converts to a VariantCollection when map returns a Variant`, function () {
      testAtoACollection(makeVariantCollection(validVariantDefs), variantMap, VariantCollection, VariantCollection);
    });
    it(`syncronously converts to a Collection when map returns an Object`, function () {
      testCtoACollection(makeVariantCollection(validVariantDefs), objectMap, VariantCollection, Collection);
    });

    it(`asyncronously converts to a ComponentCollection when map returns a Component`, async function () {
      await asyncTestCtoCCollection(makeVariantCollection(validVariantDefs), compFromVariantMap, VariantCollection, ComponentCollection);
    });
    it(`asyncronously converts to a FileCollection when map returns a File`, async function () {
      await asyncTestCtoCCollection(makeVariantCollection(validVariantDefs), fileFromVariantMap, VariantCollection, FileCollection);
    });
    it(`asyncronously converts to a EntityCollection when map returns an Entity`, async function () {
      await asyncTestCtoACollection(makeVariantCollection(validVariantDefs), entityFromVariantMap, VariantCollection, EntityCollection);
    });
    it(`asyncronously converts to a VariantCollection when map returns a Variant`, async function () {
      await asyncTestAtoACollection(makeVariantCollection(validVariantDefs), variantMap, VariantCollection, VariantCollection);
    });
    it(`asyncronously converts to a Collection when map returns an Object`, async function () {
      await asyncTestCtoACollection(makeVariantCollection(validVariantDefs), objectMap, VariantCollection, Collection);
    });
  });

  describe(`Collection`, function () {
    it(`syncronously converts to a ComponentCollection when map returns a Component`, function () {
      testAtoCCollection(makeCollection(validComponentDefs), componentMap, Collection, ComponentCollection);
    });
    it(`syncronously converts to a FileCollection when map returns a File`, function () {
      testAtoCCollection(makeCollection(validFileDefs), fileMap, Collection, FileCollection);
    });
    it(`syncronously converts to a EntityCollection when map returns an Entity`, function () {
      testAtoCCollection(makeCollection(validEntityDefs), entityMap, Collection, EntityCollection);
    });
    it(`syncronously converts to a VariantCollection when map returns a Variant`, function () {
      testAtoCCollection(makeCollection(validVariantDefs), variantMap, Collection, VariantCollection);
    });
    it(`syncronously converts to a Collection when map returns an Object`, function () {
      testAtoACollection(makeCollection(validComponentDefs), objectMap, Collection, Collection);
    });

    it(`asyncronously converts to a ComponentCollection when map returns a Component`, async function () {
      await asyncTestAtoCCollection(makeCollection(validComponentDefs), componentMap, Collection, ComponentCollection);
    });
    it(`asyncronously converts to a FileCollection when map returns a File`, async function () {
      await asyncTestAtoCCollection(makeCollection(validFileDefs), fileMap, Collection, FileCollection);
    });
    it(`asyncronously converts to a EntityCollection when map returns an Entity`, async function () {
      await asyncTestAtoCCollection(makeCollection(validEntityDefs), entityMap, Collection, EntityCollection);
    });
    it(`asyncronously converts to a VariantCollection when map returns a Variant`, async function () {
      await asyncTestAtoCCollection(makeCollection(validVariantDefs), variantMap, Collection, VariantCollection);
    });
    it(`asyncronously converts to a Collection when map returns an Object`, async function () {
      await asyncTestAtoACollection(makeCollection(validComponentDefs), objectMap, Collection, Collection);
    });
  });
});

function testAtoACollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(true);
  let newCollection = collection.map(map);
  expect(newCollection instanceof Original).to.equal(true);
  expect(newCollection instanceof Final).to.equal(true);
}

function testAtoCCollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(false);
  let newCollection = collection.map(map);
  expect(newCollection instanceof Original).to.equal(true);
  expect(newCollection instanceof Final).to.equal(true);
}

function testCtoACollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(true);
  let newCollection = collection.map(map);
  expect(newCollection instanceof Original).to.equal(false);
  expect(newCollection instanceof Final).to.equal(true);
}

function testCtoCCollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(false);
  let newCollection = collection.map(map);
  expect(newCollection instanceof Original).to.equal(false);
  expect(newCollection instanceof Final).to.equal(true);
}

async function asyncTestAtoACollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(true);
  let newCollection = await collection.mapAsync(map);
  expect(newCollection instanceof Original).to.equal(true);
  expect(newCollection instanceof Final).to.equal(true);
}

async function asyncTestAtoCCollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(false);
  let newCollection = await collection.mapAsync(map);
  expect(newCollection instanceof Original).to.equal(true);
  expect(newCollection instanceof Final).to.equal(true);
}

async function asyncTestCtoACollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(true);
  let newCollection = await collection.mapAsync(map);
  expect(newCollection instanceof Original).to.equal(false);
  expect(newCollection instanceof Final).to.equal(true);
}

async function asyncTestCtoCCollection(collection, map, Original, Final) {
  expect(collection instanceof Original).to.equal(true);
  expect(collection instanceof Final).to.equal(false);
  let newCollection = await collection.mapAsync(map);
  expect(newCollection instanceof Original).to.equal(false);
  expect(newCollection instanceof Final).to.equal(true);
}
