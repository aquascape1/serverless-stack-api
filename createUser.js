import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.userTableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'email': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      email: data.email,
      createdAt: Date.now()
    }
  };
  await dynamoDb.put(params);
  return params.Item;
});
