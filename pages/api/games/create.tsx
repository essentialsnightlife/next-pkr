import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import * as uuid from "uuid";

const docClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const params = {
  TableName: "pkrResults",
  Item: {
    id: uuid.v1(), // A unique uuid
    locationId: 100,
    buyIn: 12,
    createdAt: Date.now(), // Current Unix timestamp
  },
};

async function createItem() {
  try {
    await docClient
      .put(params)
      .promise()
      .then((data) => console.log(data));
  } catch (err) {
    console.error(err);
    return err;
  }
}

export default async function handler(
  event: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await createItem();
    return res
      .status(201)
      .json({ ...params.Item, body: "Successfully added new game!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add new game" });
    return { error: err };
  }
}
