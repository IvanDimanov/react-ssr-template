import {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * This component is inspired of `React.Timeout` as described in these articles:
 *   https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6
 *   https://medium.com/@sgobinda007/react-suspense-defer-rendering-5227b114359a
 *
 * Since `React.Timeout` is still not available as `import {Timeout} from 'react';`
 * we gonna use this class until this PR get implemented:
 * https://github.com/facebook/react/pull/12279
 */
class Timeout extends PureComponent {
  constructor(props) {
    super();

    const ms = props.ms || 1000;
    const timer = setTimeout(() => this.timeIsUp(), ms);

    this.state = {
      ms,
      timer,
      didTimeout: false,
    };
  }

  timeIsUp() {
    clearTimeout(this.state.timer);
    this.setState({
      didTimeout: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ms !== this.state.ms) {
      clearTimeout(prevState.timer);
      return {
        timer: setTimeout(() => this.timeIsUp(), this.state.ms),
        didTimeout: false,
      };
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.ms !== nextProps.ms) {
      return {
        ms: nextProps.ms,
      };
    }

    return null;
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer);
  }

  render() {
    return this.props.children(this.state.didTimeout);
  }
}

Timeout.propTypes = {
  ms: PropTypes.number,
  children: PropTypes.func,
};

export default Timeout;
