// This tells TypeScript about our global definitions
declare var process: {
    env: {
      NODE_ENV: 'development' | 'production';
    };
  };