import { ExampleProvider } from '../store/example';

const withExample = (Component) => (props) => {
  return (
    <ExampleProvider>
      <Component {...props} />
    </ExampleProvider>
  );
};

export default withExample;
