from django import template

register = template.Library()

@register.filter
def print_difficulty(difficulty_level):
    return "● " * difficulty_level + "◌ " * (10 - difficulty_level)
