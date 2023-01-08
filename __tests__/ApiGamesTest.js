/**
 * @jest-environment jsdom
 */

import { DocumentClient } from "aws-sdk/clients/dynamodb";

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env",
  }),
};
const ddb = new DocumentClient(config);
console.log("hiiiiii");
console.log(
  ddb
    .get({ TableName: "testPkrResults", Key: { id: "1-2", locationId: 200 } })
    .promise()
);

describe("record new poker result", () => {
  it("should insert new poker result into the table", async () => {
    await ddb
      .put({
        TableName: "testPkrResults",
        Item: { id: "1-2", locationId: 200, buyIn: 12, createdAt: Date.now() },
      })
      .promise();

    const { Item } = await ddb
      .get({ TableName: "testPkrResults", Key: { id: "1-2", locationId: 200 } })
      .promise();

    expect(Item).toEqual(
      expect.objectContaining({
        id: "1-2",
        locationId: 200,
        buyIn: 12,
      })
    );
  });
});
