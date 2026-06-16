# Configuration file for the Sphinx documentation builder.

# -- Project information -----------------------------------------------------

project = 'Amino Acid Curriculum'
copyright = '2026'
author = 'Jules'

# -- General configuration ---------------------------------------------------

root_doc = 'index'

extensions = [
    'myst_parser',
]

templates_path = []
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'node_modules', 'src', 'test']

# -- Options for HTML output -------------------------------------------------

html_theme = 'alabaster'
html_static_path = []
