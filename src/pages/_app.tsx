import '../styles/global.css';

function MyApp(props) {
  // console.log(props);
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
}

export default MyApp;
