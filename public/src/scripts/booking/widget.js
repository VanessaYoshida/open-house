var widget = new SimplybookWidget({
  'widget_type': 'button',
  'url': 'https:\/\/partiujogar.simplybook.me',
  'theme': 'default',
  'theme_settings': {
    'timeline_show_end_time': '1',
    'timeline_modern_display': 'as_slots',
    'sb_base_color': '#faeb19',
    'booking_nav_bg_color': '#faeb19',
    'body_bg_color': '#f7f7f7',
    'dark_font_color': '#494949',
    'light_font_color': '#ffffff',
    'btn_color_1': '#faeb19',
    'sb_company_label_color': '#ffffff',
    'hide_img_mode': '1',
    'show_sidebar': '1',
    'sb_busy': '#dad2ce',
    'sb_available': '#b5ffce'
  },
  'timeline': 'modern_week',
  'datepicker': 'top_calendar',
  'is_rtl': false,
  'app_config': {
    'predefined': {
      'provider': '1',
      'service': '1'
    }
  },
  'button_title': 'Agendar',
  'button_background_color': '#faeb19',
  'button_text_color': '#000000',
  'button_position': 'right',
  'button_position_offset': '60%'
});
let btnBack = document.querySelector('#back');
btnBack.addEventListener('click', () => {
  window.location = 'places.html';
});