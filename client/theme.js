import { createMuiTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#29cc55',
      main: '#25ba4d',
      dark: '#22ab47',
      contrastText: '#000',
    },
      openTitle: '#3f4771',
      protectedTitle: green['600'],
      type: 'light'
    }
  })

  export default theme