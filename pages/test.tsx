import {
  withPageAuthRequired,
  WithPageAuthRequiredProps,
} from "@auth0/nextjs-auth0";
import { Header } from "components/Header";
import { Menu } from "components/Menu";
import { StyledTable } from "components/Table";
import { NextPage } from "next";
const Test: NextPage<{}> = () => {
  return (
    <>
      <Header size="large">Hej</Header>
      <Menu />
    </>
  );
};
export default withPageAuthRequired<WithPageAuthRequiredProps>(Test);
