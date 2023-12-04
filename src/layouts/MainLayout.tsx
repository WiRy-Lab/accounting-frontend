import { ReactNode } from 'react';

function MainLayout(props: { children: ReactNode }) {
  const { children } = props;

  return <main>{children}</main>;
}

export default MainLayout;
