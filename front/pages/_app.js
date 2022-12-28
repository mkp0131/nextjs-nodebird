/*
 * _app.js
 * 공통으로 적용 코드
 */
import PropTypes from 'prop-types';
import wrapper from '../store/configureStore';

const App = ({ Component }) => {
  return <Component />;
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
