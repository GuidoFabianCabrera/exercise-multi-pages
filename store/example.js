import { createContext } from 'react';

const ExampleContext = createContext();

const ExampleProvider = ({ children }) => {
  const example = () => {
    console.log('Example');
  };

  return (
    <ExampleContext.Provider value={{ example }}>
      {children}
    </ExampleContext.Provider>
  );
};

export { ExampleProvider, ExampleContext };
