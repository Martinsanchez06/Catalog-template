import boto3

s3 = boto3.client('s3')
s3.upload_file('/Users/martinsanchez/Downloads/testimage.jpg', 'catalogtemplatebucket', 'testimage.jpg')