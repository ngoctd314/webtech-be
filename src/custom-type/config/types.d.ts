export interface Config {
  server: {
    host: string;
    port: number;
    api: {
      version: string;
    };
  };
  client: {
    domain: string;
  };
  database: {
    uri: string;
  };
  cookies: {
    jwt: {
      secret: string;
      expires: string;
    };
  };
  mail: {
    host: string;
    service: string;
    port: number;
    username: string;
    password: string;
  };
  aws: {
    secretAccessKey: string;
    accesskey: string;
  };
}
