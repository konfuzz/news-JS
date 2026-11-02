import Loader from './loader';

const assertEnvVariable = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};

class AppLoader extends Loader {
  constructor() {
    super(assertEnvVariable(process.env.API_URL, 'API_URL'), {
      apiKey: assertEnvVariable(process.env.API_KEY, 'API_KEY'),
    });
  }
}

export default AppLoader;
