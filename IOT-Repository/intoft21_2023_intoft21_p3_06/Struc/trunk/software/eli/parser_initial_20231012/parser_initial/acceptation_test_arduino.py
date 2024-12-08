import requests
import requests_raw
import os

# run: arduino=192.168.1.21 ./virtEnv/bin/pytest acceptation_test_arduino.py

key = 'arduino'


def address():
    if key in os.environ:
        return "http://" + os.environ[key]

    raise ValueError(
        "set {} IP addres in {} environment variable".format(key, key))


def test_request():
    response = requests.get(address())
    assert response.status_code == 400


def test_raw_request_id():
    req = b"GET /id HTTP/1.0\r\n\r\n"
    response = requests_raw.raw(url=address(), data=req)
    print(response.text)
    print(response.headers)
    print(response.status_code)
    print(response.request)
    print(response.request.headers)
    print(response.request.body)
    print(response.request.method)
    print(response.request.url)

    assert response.status_code == 200
    assert response.headers["Content-Length"] == "3"
    assert response.text == "joe"


# not yet implemented
def test_raw_request_not_found():
    req = b"GET / HTTP/1.0\r\n\r\n"
    response = requests_raw.raw(url=address(), data=req)
    assert response.status_code == 404
