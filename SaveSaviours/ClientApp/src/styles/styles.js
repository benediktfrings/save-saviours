import { makeStyles } from '@material-ui/core/styles'
import theme from './theme'

export default () => {
  const useStyles = makeStyles({
    // ADJUSTMENT TOP BAR
    offset: theme.mixins.toolbar,
    // APP
    appContainer: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    // CONFIRMATION
    confirmationFacebook: {
      backgroundColor: '#4267b2',
      width: 120,
      paddingLeft: 10,
      borderRadius: 8,
      height: 25,
    },
    confirmationTwitter: {
      backgroundColor: '#55acee',
      width: 120,
      paddingLeft: 10,
      borderRadius: 8,
      height: 25,
    },
    confirmationWhatsapp: {
      backgroundColor: '#25D366',
      width: 120,
      paddingLeft: 10,
      borderRadius: 8,
      height: 30,
    },
    confirmationInstagram: {
      backgroundColor: '#e4405f',
      width: 120,
      paddingLeft: 10,
      borderRadius: 8,
      height: 30,
    },
    confirmationLink: {
      textDecoration: 'none !important',
      color: theme.palette.common.white,
    },
    confirmationReferralLabel: {
      paddingLeft: 10,
      verticalAlign: 'middle',
    },
    // HELPERLIST
    helperListPaper: {
      marginBottom: 30,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 30,
      paddingRight: 30,
      marginLeft: 0,
      marginRigh: 0,
      width: '100%',
      '@media (max-width: 600px)': {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 10,
        marginBottom: 20,
        marginLeft: 0,
        marginRigh: 0,
      },
    },
    helperListContainer: {
      marginBottom: 30,
      width: 'initial',
    },
    helperListCardContainer: {
      padding: 0,
      margin: 0,
      width: 'initial',
    },
    helperListBlur: {
      '-webkit-filter': 'blur(3.7px)',
      padding: 10,
    },
    helperListCardItem: {
      padding: 10,
    },
    helperListSelect: {
      padding: 10,
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: 20,
      borderRadius: 8,
      borderColor: theme.palette.primary.main,
    },
    helperListCard: {
      backgroundColor: '#fff',
      width: '100%',
      marginTop: 15,
    },
    helperListCardGrid: {
      width: '40%',
      paddingBottom: 0,
      paddingTop: 0,
    },
    helperListCardGridItem: {
      padding: 0,
    },
    helperListCardHeader: {
      fontWeight: 800,
    },
    helperListCardDistance: {
      marginTop: 20,
    },
    helperListExplainerText: {
      marginBottom: 20,
    },
    // HELPERPROFILE
    helperProfileTextBox: {
      marginBottom: 10,
    },
    helperProfileFormBox: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    helperDeleteSubtitle: {
      marginTop: 80,
      paddingBottom: 20,
      fontSize: '1.8rem',
      '@media (max-width: 600px)': {
        fontSize: '1.3rem',
      },
    },
    helperDeleteButton: {
      backgroundColor: theme.palette.error.main,
      marginTop: 20,
      color: theme.palette.common.white,
      width: '100%',
      maxWidth: 600,
      '&:hover': {
        backgroundColor: theme.palette.error.main,
        opacity: 0.5,
      },
    },
    // LANDING
    landingPaper: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 30,
      paddingRight: 30,
      marginBottom: 30,
      '@media (max-width: 600px)': {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 10,
        paddingBottom: 10,
        marginBottom: 20,
        marginLeft: 0,
        marginRigh: 0,
      },
    },
    landingHeader: {
      paddingTop: 10,
      paddingBottom: 20,
      margin: 0,
      '@media (max-width: 600px)': {
        paddingTop: 5,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 10,
      },
    },
    landingContainer: {
      marginLeft: 0,
      width: '100%',
    },
    landingText: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    landingButtonGrid: {
      textAlign: 'center',
      padding: 20,
    },
    landingButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.5,
      },
    },
    landingSupporterImage: {
      maxWidth: 500,
      '@media (max-width: 600px)': {
        maxWidth: 300,
      },
    },
    landingSupporterHeader: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 15,
      margin: 0,
      '@media (max-width: 600px)': {
        fontSize: '1.1rem',
        paddingLeft: 5,
      },
    },
    // REGISTRATION
    registrationGrid: {
      textAlign: 'center',
    },
    registrationExperience: {
      textAlign: 'left',
    },
    registrationPaper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: 20,
    },
    registrationHeader: {
      paddingTop: 10,
      paddingBottom: 20,
      fontWeight: 500,
    },
    registrationTextfield: {
      color: theme.palette.text.primary,
      marginTop: 5,
      marginBottom: 5,
      width: '100%',
      textAlign: 'left',
    },
    registrationAccountCircle: {
      cursor: 'pointer',
      marginRight: 10,
    },
    registrationTaskText: {
      marginTop: 20,
      paddingBottom: 20,
      fontSize: '1.8rem',
      '@media (max-width: 600px)': {
        fontSize: '1.3rem',
      },
    },
    registrationButton: {
      backgroundColor: theme.palette.secondary.main,
      marginTop: 20,
      color: theme.palette.common.white,
      width: '100%',
      maxWidth: 600,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.5,
      },
    },
    registrationDivider: {
      backgroundColor: theme.palette.secondary.main,
    },
    registrationExperienceAddText: {
      color: theme.palette.secondary.main,
      fontWeight: 900,
      marginRight: 10,
    },
    registrationExperienceListBox: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    // SIGNIN
    signinErrorTypography: {
      color: theme.palette.error.main,
    },
  })
  return useStyles()
}
