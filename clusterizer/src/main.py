import requests

parameters = {
    # "container_name": 40.71,
    # "container_id": -74
}

response = requests.get("http://app:4000/logs")
# response = requests.get("http://app:4000/logs", params=parameters)

print(len(response.json()))