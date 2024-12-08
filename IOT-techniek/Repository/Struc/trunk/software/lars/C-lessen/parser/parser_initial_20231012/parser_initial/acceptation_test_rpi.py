import requests
import requests_raw
import os

# run: rpi=192.168.1.11 ./virtEnv/bin/pytest acceptation_test_rpi.py

key = 'rpi'


def address():
    if key in os.environ:
        return "http://" + os.environ[key]

    raise ValueError(
        "set {} IP addres in {} environment variable".format(key, key))


def test_request():
    # no real tests at this moment yet, the following is just a place holder
    assert address() == "http://192.168.1.11"
