from django.core.management.base import BaseCommand
from django.conf import settings
import os
import shutil
import re


DEFAULT_BUILD_PATH = r"..\Frontend\AdminPanelFrontend\dist"


url_pattern = r'https?://[^\s/$.?#].[^\s]*'

attribute_pattern = r'(src|href)\s*=\s*["\']([^"\']*(?![\w:]))["\']'

css_template_format = "{% static 'css/[filename]' %}"
js_template_format = "{% static 'js/[filename]' %}"
assets_template_format = "{% static 'assets/[filename]' %}"


class Command(BaseCommand):

	help="""this command takes files that make a homepage from
	 it's built destination and places them inside home application."""

	def add_arguments(self, parser):
		#path describes where the built frontend files are located relative to ...
		parser.add_argument(
			'--path',
			help="""is used to specify where frontend built destination is located,
			 otherwise default path will be used"""
		)

	def handle(self, *args, **options):

		if not (options["path"] or DEFAULT_BUILD_PATH):
			raise Exception("frontend files path not specified")

		base_dir = settings.BASE_DIR
		build_path = os.path.normpath(os.path.join(base_dir, options["path"] or DEFAULT_BUILD_PATH))
		print( build_path )

		for root, _, files in os.walk(build_path):
			for file in files:
				if file.endswith(".js"):
					source_path = os.path.join(root, file)
					destination_path = os.path.join(base_dir, "./admin_panel/static/js/", file)
					shutil.copy2(source_path, destination_path)
				elif file.endswith(".css"):
					source_path = os.path.join(root, file)
					destination_path = os.path.join(base_dir, "./admin_panel/static/css/", file)
					shutil.copy2(source_path, destination_path)
				elif file.endswith('.html'):
					source_path = os.path.join(root, file)
					destination_path = os.path.join(base_dir, "./admin_panel/templates/home", 'home.html')

					# Copy the HTML file
					shutil.copy2(source_path, destination_path)

					# Open the destination HTML file for parsing and manipulation
					with open(destination_path, 'r', encoding='utf-8') as html_file:
						html_content = html_file.read()

					def replace_attribute(match):
						attribute = match.group(1)
						url = match.group(2)
						if not url.startswith(('http://', 'https://', 'ftp://', 'data:')):
							filename = os.path.basename(url)
							if url.endswith('.css'):
								return f'{attribute} = "{css_template_format.replace("[filename]", filename)}"'
							if url.endswith('.js'):
								return f'{attribute} = "{js_template_format.replace("[filename]", filename)}"'
							return f'{attribute} = "{assets_template_format.replace("[filename]", filename)}"'
						return match.group(0)  # Don't modify web URLs

					modified_content = re.sub(attribute_pattern, replace_attribute, html_content)

					modified_content = "{% load static %} \n" + modified_content

					# Save the modified HTML content back to the file
					with open(destination_path, 'w', encoding='utf-8') as modified_html_file:
						modified_html_file.write(modified_content)
				else:
					source_path = os.path.join(root, file)
					destination_path = os.path.normpath(os.path.join(base_dir,"./admin_panel/static/assets/", file))
					shutil.copy2(source_path, destination_path)