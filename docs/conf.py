# Configuration file for the Sphinx documentation builder.

# -- Project information -----------------------------------------------------

project = 'Amino Acid Curriculum'
copyright = '2026'
author = 'Jules'

# -- General configuration ---------------------------------------------------

extensions = [
    'myst_parser',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------

html_theme = 'alabaster'
html_static_path = ['_static']
