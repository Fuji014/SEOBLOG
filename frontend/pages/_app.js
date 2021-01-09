import App from "next/app";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../index.css";

// This default export is required in a new `pages/_app.js` file.
class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { appProps: appProps };
  };
  render() {
    const { Component, appProps } = this.props;

    return (
      <Provider store={store}>
        <Component {...appProps} />
      </Provider>
    );
  }
}

const makeStore = () => store;
export default withRedux(makeStore)(MyApp);
