
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as colors from 'vuetify/lib/util/colors';
import { VNumberInput } from 'vuetify/labs/VNumberInput'

// Composables
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  components: {
    VNumberInput,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: "#DDDDDD",
          secondary: colors.blue.darken4,
          background: '#F4F4F4',
          backgroundsec: '#EEEEEE',
          tableheadbg: '#368CEA',
          tablebg: '#CFD8DC'
        },
      },
      dark: {
        colors: {
          primary: '#122553',
          secondary: colors.blue.darken4,
          background: colors.grey.darken4,
          backgroundsec: colors.grey.darken3,
        },
      },
    },
  },
});

export default vuetify;
