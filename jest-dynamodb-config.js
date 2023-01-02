/**
 * @type {import('@shelf/jest-dynamodb/lib').Config}')}
 */

module.exports = {
  tables: [
    {
      TableName: `testPkrResults`,
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "locationId", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "locationId", AttributeType: "N" },
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
  ],
  port: 8000,
};
