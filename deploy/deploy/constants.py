# -*- coding: utf-8 -*-

"""\
© Copyright 2016, Partnr. All rights reserved.
"""
from __future__ import unicode_literals

import getpass
import os

class Constants(object):
    BUCKETS = {
        'development': 'dev-weasl-in',
        'production': 'agora-ui-prod',
    }
    AUTHOR = getpass.getuser()
    REPO_SSH = 'git@github.com:rdbaker/agora-ui.git'
    TMP_DIR = os.path.join(os.getcwd(), 'tmp')
    REPO_DIR = os.path.join(TMP_DIR, 'agora-ui')
    DIST_DIR = os.path.join(REPO_DIR, 'dist')
    COMMANDS = {
        'install': 'yarn install'.split(),
        'build': 'yarn build'.split(),
        'checkout': 'git checkout'.split(),
        'clean': 'rm -rf tmp'.split(),
        'clone': ('git clone ' + REPO_SSH).split()
    }
    EXTENSION_CONTENT_TYPE_MAP = {
        '.html':  'text/html',
        '.js':    'application/x-javascript',
        '.png':   'image/png',
        '.woff':  'application/x-font-woff',
        '.woff2': 'application/x-font-woff',
        '.ttf':   'application/x-font-woff',
        '.css':   'text/css',
        '.gif':   'image/gif',
        '.svg':   'image/svg+xml',
    }

    @classmethod
    def get_content_type(cls, extension):
        return cls.EXTENSION_CONTENT_TYPE_MAP.get(extension, 'application/octet-stream')
