from django import template

register = template.Library()


@register.filter
def print_difficulty(difficulty_level):
    filled_circles = "\\ding{108} " * difficulty_level
    empty_circles = "\\ding{109} " * (10 - difficulty_level)
    return filled_circles + empty_circles
