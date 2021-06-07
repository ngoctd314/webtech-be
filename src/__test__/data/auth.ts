import { UserType } from '@custom-types/resources/models';

const userTest: UserType = {
  email: 'example@gmail.com',
  password: 'example.password',
  firstName: 'firstName',
  lastName: 'lastName',
  verified: {
    token: 'e5e7013408c90854cc7f8a6b2faeca3d3420e8fc4c03314ba90ec84073a5cacb',
  },
};

export { userTest };
