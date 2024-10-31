from pydoc import pager

from django.utils.safestring import mark_safe
from wagtail import hooks


@hooks.register('construct_main_menu')
def remove_help_menu_item(request, menu_items):
    menu_items[:] = [item for item in menu_items if item.name != 'help']
