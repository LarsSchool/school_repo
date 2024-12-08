def double (fn):
	def local_fn(name):
		fn(name + " - 1")
		fn(name + " - 2")
	return  local_fn


@double
def hello(name):
	print("Hello {}".format(name))
