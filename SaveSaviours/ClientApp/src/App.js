import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import pages from 'pages/routes.json'
import SigninPage from 'pages/SigninPage/SigninPage'
import CockpitPage from 'pages/CockpitPage/CockpitPage'
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage'
import LandingPage from 'pages/LandingPage/LandingPage'
import ConfirmationPage from 'pages/ConfirmationPage/ConfirmationPage'
import FAQPage from 'pages/FAQPage/FAQPage'
import AboutPage from 'pages/AboutPage/AboutPage'
import ImpressumPage from 'pages/ImpressumPage/ImpressumPage'
import DatasecurityPage from 'pages/DatasecurityPage/DatasecurityPage'
import InstitutionRegistrationPage from 'pages/RegistrationPage/InstitutionRegistrationPage'
import InstitutionProfilePage from 'pages/InstitutionProfilePage/InstitutionProfilePage'

import TopAppBar from 'components/TopAppBar/TopAppBar'
import BottomAppBar from 'components/BottomAppBar/BottomAppBar'
import styles from 'styles/styles'
import theme from 'styles/theme'
import HelperProfilePage from 'pages/HelperProfilePage/HelperProfilePage'
import HelpersListPage from 'pages/HelpersListPage/HelpersListPage'
import VettingPage from 'pages/VettingPage/VettingPage'
import InstitutionConfirmationPage from 'pages/ConfirmationPage/InstitutionConfirmationPage'

const App = () => {
  const classes = styles()
  const routes = [
    { path: pages.root, component: LandingPage },
    { path: pages.signin, component: SigninPage },
    { path: pages.cockpit, component: CockpitPage },
    { path: pages.registration, component: RegistrationPage },
    { path: pages.confirmation, component: ConfirmationPage },
    { path: pages.datasecurity, component: DatasecurityPage },
    { path: pages.faq, component: FAQPage },
    { path: pages.impressum, component: ImpressumPage },
    { path: pages.about, component: AboutPage },
    { path: pages.institutions, component: InstitutionRegistrationPage },
    { path: pages.helperprofile, component: HelperProfilePage },
    { path: pages.helperslist, component: HelpersListPage },
    { path: pages.vetting, component: VettingPage },
    { path: pages.institutionconfirmation, component: InstitutionConfirmationPage },
    { path: pages.institutionprofile, component: InstitutionProfilePage },
  ]
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopAppBar />
        <div className={classes.offset} />
        <Container maxWidth="lg" className={classes.appContainer}>
          <Switch>
            {routes.map(({ path, component }) => (
              <Route exact path={path} key={path} component={component} />
            ))}
          </Switch>
        </Container>
        <BottomAppBar />
      </ThemeProvider>
    </Router>
  )
}

export default App
