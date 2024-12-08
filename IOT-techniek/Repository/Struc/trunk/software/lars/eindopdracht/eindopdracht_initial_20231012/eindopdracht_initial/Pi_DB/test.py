import requests

base_url = 'http://localhost:5000'

sensor1Waarde = 10
sensor2Waarde = 5

response_post = requests.post(f'{base_url}/data', json={'sensor1_waarde': sensor1Waarde, 'sensor2_waarde': sensor2Waarde})
print("POST response:", response_post.json())

sensor1Waarde = 7
sensor2Waarde = 8

response_post = requests.post(f'{base_url}/data', json={'sensor1_waarde': sensor1Waarde, 'sensor2_waarde': sensor2Waarde})
print("POST response:", response_post.json())

response_get = requests.get(f'{base_url}/statistics')
print("GET response:", response_get.json())

# response_delete = requests.delete(f'{base_url}/statistics')
# print("DELETE response:", response_delete.json())
