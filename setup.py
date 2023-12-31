#!/usr/bin/env python3

#  Copyright (C) 2019-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

import copy
import pathlib

import setuptools
from setuptools.command.build_py import build_py

BASE_DIR = pathlib.Path(__file__).absolute().parent


class CustomBuild(build_py):
    def run(self):
        # build package
        build_py.run(self)

        from reforis_distutils import ForisBuild
        cmd = ForisBuild(copy.copy(self.distribution))
        cmd.root_path = BASE_DIR
        cmd.build_lib = self.build_lib
        cmd.ensure_finalized()
        cmd.run()


setuptools.setup(
    name='reforis',
    version='1.5.4',
    packages=setuptools.find_packages(exclude=['tests']),
    include_package_data=True,

    description='reForis is the latest, simple, and most user-friendly interface for Turris routers.',
    url='https://gitlab.nic.cz/turris/reforis/reforis',
    author='CZ.NIC, z.s.p.o. (https://www.nic.cz/)',
    author_email='software@turris.com',
    install_requires=[
        'flask',
        'Babel',
        'Flask-Babel',
        'Flask-SeaSurf',
        'flup',
        'cachelib',
        'paho-mqtt',
        'foris-client @ git+https://gitlab.nic.cz/turris/foris-controller/foris-client#egg=foris-client',
    ],
    setup_requires=[
        'Babel',
        'reforis_distutils',
    ],
    dependency_links=[
        'git+https://gitlab.nic.cz/turris/reforis/reforis-distutils.git#egg=reforis-distutils',
    ],

    # Do not use test_require or build_require, because then it's not installed and is
    # able to be used only by setup.py util. We want to use it manually.
    # Actually it could be all in dev-requirements.txt but it's good to have it here
    # next to run dependencies and have it separated by purposes.
    extras_require={
        'devel': [
            'l18n',
            'pycountry',
            'pytest',
            'pycodestyle',
            'pylint',
            'pylint-quotes',
            'werkzeug == 2.0.3',  # TODO remove when werkzeug is fixed see https://gitlab.nic.cz/turris/reforis/reforis/-/merge_requests/316#note_249166
        ],
        'build': [
            'Sphinx',
            'sphinxcontrib-httpdomain',
            'myst-parser',
        ],
    },

    classifiers=[
        'Framework :: Flask',
        'Intended Audience :: End Users/Desktop',
        'Development Status :: 5 - Production/Stable',
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Natural Language :: English',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python :: 3',
        'Topic :: System :: Networking',
    ],
    zip_safe=False,
    cmdclass={
        'build_py': CustomBuild,
    },
    entry_points={'console_scripts': [
        'reforis = reforis.__main__:main',
        'reforis-cli = reforis.cli:cli',
    ]},
)
