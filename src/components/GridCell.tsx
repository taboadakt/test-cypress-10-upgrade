import type { ThemeUIStyleObject } from 'theme-ui';

/**
 * Demonstrating another way to address styling.
 */
const GridCell: React.FC<{ addStyles: ThemeUIStyleObject }> = ({
  children,
  addStyles,
}) => {
  const styles: ThemeUIStyleObject = {
    border: '2px solid black',
    borderRadius: '20px',
    p: '10px',
    height: '100%',

    // NOTE Nested selector!
    h1: {
      fontSize: '20px',
    },
    ...addStyles,
  };

  return <div sx={styles}>{children}</div>;
};

export default GridCell;
