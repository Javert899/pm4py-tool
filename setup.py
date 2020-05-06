from os.path import dirname, join

from setuptools import setup

import pm4pytool

def read_file(filename):
    with open(join(dirname(__file__), filename)) as f:
        return f.read()

setup(
    name=pm4pytool.__name__,
    version=pm4pytool.__version__,
    description=pm4pytool.__doc__.strip(),
    long_description=read_file('README.md'),
    author=pm4pytool.__author__,
    author_email=pm4pytool.__author_email__,
    py_modules=[pm4pytool.__name__],
    include_package_data=True,
    packages=['pm4pytool', 'pm4pytool.objects'],
    url='http://www.pm4py.org',
    license='Apache License 2.0',
    install_requires=[
        "pm4py",
        "Flask",
        "flask-cors",
        "setuptools",
        "Flask-BasicAuth"
    ],
    project_urls={
        'Documentation': 'http://pm4py.pads.rwth-aachen.de/documentation/',
        'Source': 'https://github.com/pm4py/pm4py-source',
        'Tracker': 'https://github.com/pm4py/pm4py-source/issues',
    }
)

