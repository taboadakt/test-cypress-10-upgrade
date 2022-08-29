import type { Theme } from 'theme-ui';

// From https://theme-ui.com/guides/typescript/
const makeTheme = <T extends Theme>(t: T) => t;

export const theme = makeTheme({
  fonts: {
    body: 'GreycliffCF',
    heading: 'GreycliffCF',
    monospace: 'GreycliffCF',
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  fontWeights: {
    regular: 400,
    semibold: 500,
    bold: 700,
  },
  lineHeights: ['16px', '20px', '24px', '32px', '40px'],
  space: [
    0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 144,
  ],
  radii: [0, 4, 8, 16, 32, 40, 48, 56, 64],
  sizes: [0, 4, 8, 16, 32, 40, 48, 56, 64],
  colors: {
    neutralDark: '#050400',
    neutralLight: '#FFFFFF',
    backgroundWeak: '#F4F3EF',
    primaryHover: '#E0A100',
    primaryDefault: '#F3BB0B',
    primaryPressed: '#FBE8A8',
    primaryHighlight: '#FFF5D6',
    secondaryHover: '#2F2A23',
    secondaryDefault: '#3C3931',
    secondaryLabel: '#615E54',
    secondaryPressed: '#C0BAAE',
    secondaryDisabled: '#E6E2DA',
    secondaryHighlight: '#EEEBE6',
    warningHover: '#AE4B00',
    warningDefault: '#FF760F',
    warningPressed: '#FFCFAB',
    warningHighlight: '#FFECDE',
    successHover: '#617103',
    successDefault: '#ACC806',
    successPressed: '#E2ECA8',
    successHighlight: '#F4F7DF',
    informationHover: '#1868C7',
    informationDefault: '#589FF1',
    informationPressed: '#B2DBFF',
    informationHighlight: '#E5F4FF',
    errorHover: '#8B1407',
    errorDefault: '#F4230B',
    errorPressed: '#FFD6D1',
    errorHighlight: '#FFF3F2',
    primaryDisabled: '#F4F3EF',
  },
  text: {
    headingXs: {
      fontSize: 2,
      fontWeight: 'bold',
      lineHeight: 2,
    },
    headingSm: {
      fontSize: 3,
      fontWeight: 'bold',
      lineHeight: 2,
    },
    headingMd: {
      fontSize: 4,
      fontWeight: 'bold',
      lineHeight: 3,
    },
    headingLg: {
      fontSize: 5,
      fontWeight: 'bold',
      lineHeight: 4,
    },
    paragraphSm: {
      fontSize: 0,
      lineHeight: 1,
    },
    paragraphMd: {
      fontSize: 1,
      lineHeight: 1,
    },
    paragraphLg: {
      fontSize: 2,
      lineHeight: 2,
    },
    paragraphXl: {
      fontSize: 3,
      lineHeight: 2,
    },
    paragraphBoldSm: {
      variant: 'paragraphSm',
      fontWeight: 'bold',
    },
    paragraphBoldMd: {
      variant: 'paragraphMd',
      fontWeight: 'bold',
    },
    paragraphBoldLg: {
      variant: 'paragraphLg',
      fontWeight: 'bold',
    },
    paragraphBoldXl: {
      variant: 'paragraphXl',
      fontWeight: 'bold',
    },
    labelSm: {
      fontSize: 0,
      lineHeight: 0,
      fontWeight: 'semibold',
    },
    labelMd: {
      fontSize: 1,
      lineHeight: 1,
      fontWeight: 'semibold',
    },
    labelLg: {
      fontSize: 2,
      lineHeight: 1,
      fontWeight: 'semibold',
    },
    labelCapsSm: {
      textTransform: 'uppercase',
      fontSize: 0,
      lineHeight: 0,
      fontWeight: 'semibold',
    },
    labelCapsLg: {
      textTransform: 'uppercase',
      fontSize: 1,
      lineHeight: 1,
      fontWeight: 'semibold',
    },
  },
  styles: {
    // https://theme-ui.com/theme-spec/#styles
    root: {
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'regular',
      height: '100%',
      width: '100%',
    },
  },
  buttons: {
    primary: {
      bg: 'background',
      color: 'text',
      p: '10px',
      border: '2px solid background',
      borderRadius: '50%',
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      cursor: 'pointer',
    },
    secondary: {},
  },
});

export type TypedTheme = typeof theme;
