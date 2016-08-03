
const headerColor = '#323B5C';
const secondaryColor = '#2E3191';
const primaryColor = '#2B9299';


const textColor = 'black';

/**
 *  Default theme for Cafienne. Only customizations from Material
 *  default should be specified here
 */
export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primaryColor,
    accent1Color: secondaryColor,
    accent2Color: headerColor,
    textColor,
    borderColor: 'lightgray'
  },
  drawer: {
    width: 240
  },
  rightDrawer: {
    width: 300
  },
  appBar: {
    height: 47
  }
};
