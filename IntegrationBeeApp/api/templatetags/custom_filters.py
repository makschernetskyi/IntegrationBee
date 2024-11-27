from django import template

register = template.Library()

@register.filter
def print_difficulty(difficulty_level):
    filled_circles = "\\textbullet{108} " * difficulty_level
    empty_circles = "\\textbullet{109} " * (10 - difficulty_level)
    return filled_circles + empty_circles
