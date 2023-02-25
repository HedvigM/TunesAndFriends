import {
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from '@auth0/nextjs-auth0';
import { Header } from 'components/Header';
import { Header2 } from 'components/Header2';
import { Menu } from 'components/Menu';
import { NextPage } from 'next';
const Test: NextPage<{}> = () => {
  return (
    <>
      <Header />
      <Header2 />
      <Menu />
    </>
  );
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Test);
