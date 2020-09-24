import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.userTableName,
    };

    let scanResults = [];
    let items;
    do{
        items =  await dynamoDb.scan(params);
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");
    console.log(scanResults);
    return scanResults;

});
