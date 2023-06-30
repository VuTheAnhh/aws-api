import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('registration-table')

def lambda_handler(event, context):
    # Get request body
    print(event)

    # Create new item in DynamoDB table
    response = table.put_item(
        Item={
            'email': event['email'],
            'name': event['name'],
            'phone': event['phone'],
            'password': event['password']
        }
    )

    # Return response
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'message': 'Registration successful'})
    }


#get function


import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('registration-table')

def lambda_handler(event, context):
    # Get all items from DynamoDB table
    response = table.scan()

    # Extract the items from the response
    items = response['Items']

    # Continue scanning if we have more items
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    # Return the items as the response
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(items)
    }
