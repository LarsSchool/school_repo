import urllib.request

def run():
	url = 'http://192.168.1.51/'
	with urllib.request.urlopen(url) as response:
		print(response.getcode())
		print(response.geturl())
		print(response.info())
		print(response.read().decode('UTF-8'))

if __name__ == "__main__":
	run()
