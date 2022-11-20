import * as chai from "chai";
import db from "../../src/models";

const expect = chai.expect;

describe("Item Repository", () => {
  it("should return all items", async () => {
    const items = await db.item.getItems();
    expect(items).to.be.an("array");
  });

  it("should create and delete a new item", async () => {
    const newItem = {
      name: "test",
      price: 1,
      itemPhotos: ["test"],
      username: "test",
    };
    const createdItem = await db.item.createItem(newItem);
    await db.item.deleteItem(createdItem.itemId);

    // expect createdItem to be the same as newItem
    expect(createdItem).to.be.an("object");
    expect(createdItem.name).to.equal(newItem.name);
    expect(createdItem.price).to.equal(newItem.price);
    expect(createdItem.itemPhotos).to.be.an("array");
    expect(createdItem.username).to.equal(newItem.username);

    // expect createdItem to be deleted
    const deletedItem = await db.item.getItem(createdItem.itemId);
    expect(deletedItem).to.be.null;
  });

  it("should delete an item that doesn't exist", async () => {
    // expect error to be thrown if item does not exist
    try {
      await db.item.deleteItem(0);
    } catch (err) {
      expect(err).to.be.an("error");
    }
  });

  it("should update an item", async () => {
    const newItem = {
      name: "test",
      price: 1,
      itemPhotos: ["test"],
      username: "test",
    };
    const createdItem = await db.item.createItem(newItem);
    const newItem2 = {
      itemId: createdItem.itemId,
      name: "test2",
      price: 2,
      itemPhotos: ["test2"],
      username: "test2",
    };
    const count = await db.item.updateItem(newItem2);
    const updatedItem = await db.item.getItem(createdItem.itemId);

    await db.item.deleteItem(createdItem.itemId);

    // expect updatedItem to be the same as newItem
    expect(count).to.be.an("array");
    expect(count[0]).to.equal(1);
    expect(updatedItem).to.be.an("object");
    if (updatedItem) {
      expect(updatedItem.name).to.equal(newItem2.name);
      expect(updatedItem.price).to.equal(newItem2.price);
      expect(updatedItem.itemPhotos).to.be.an("array");
      expect(updatedItem.username).to.equal(newItem2.username);
    }

    // expect updatedItem to be deleted
    const deletedItem = await db.item.getItem(createdItem.itemId);
    expect(deletedItem).to.be.null;
  });
});
