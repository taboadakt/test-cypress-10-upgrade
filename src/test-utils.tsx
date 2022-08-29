import * as React from 'react';
import { DoppioProvider } from '@odekoteam/doppio';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const Wrapper: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => <DoppioProvider applicationName="jest">{children}</DoppioProvider>;

const customRender = (component: React.ReactElement, options = {}) =>
  render(component, { wrapper: Wrapper, ...options });

// Disable multiple export rule since we _want_ to overwrite render w/ ours
/* eslint-disable import/export */
export * from '@testing-library/react';

export { customRender as render };
