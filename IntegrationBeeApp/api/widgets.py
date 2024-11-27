# widgets.py
from django import forms
from django.utils.safestring import mark_safe


class Base64AudioWidget(forms.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        html = super().render(name, value, attrs, renderer)
        if value:
            try:
                audio_data_uri = f'{value}'
                audio_player = f'''
                    <audio controls>
                        <source src="{audio_data_uri}" type="audio/mp3">
                        Your browser does not support the audio element.
                    </audio>
                '''
                return mark_safe(audio_player + html)
            except Exception as e:
                # Handle exception if needed
                pass
        return html
