import { Button } from '@odekoteam/doppio';
import { fireEvent, render } from '../test-utils';

/**
 * Example of testing Doppio components.
 */
describe('Doppio', () => {
  describe('Button', () => {
    it('should render', () => {
      const btnText = 'Click Me';
      const { getByRole } = render(<Button>{btnText}</Button>);

      const button = getByRole('button');
      expect(button).toHaveTextContent(btnText);
    });

    it('should call `onPress` callback properly', () => {
      const onPress = jest.fn();
      const { getByRole } = render(<Button onPress={onPress}>Click Me</Button>);

      fireEvent.click(getByRole('button'));

      expect(onPress).toHaveBeenCalled();
    });

    it('should not call `onPress` callback when disabled', () => {
      const onPress = jest.fn();
      const { getByRole } = render(
        <Button isDisabled onPress={onPress}>
          Click Me
        </Button>,
      );

      fireEvent.click(getByRole('button'));

      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
