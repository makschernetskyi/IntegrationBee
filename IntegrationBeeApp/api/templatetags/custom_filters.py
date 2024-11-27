from django import template

register = template.Library()

@register.filter
def print_difficulty(difficulty_level):
    filled_circles = "$\\bullet$ " * difficulty_level
    empty_circles = "$\\circ$ " * (10 - difficulty_level)
    return filled_circles + empty_circles
