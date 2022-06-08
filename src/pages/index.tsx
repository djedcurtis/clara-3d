import { NextPageContext } from "next";

import App from "../App";

const Page = () => <App />;

Page.getInitialProps = async (context: NextPageContext) => {
  return {};
};

export default Page;
