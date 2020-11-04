import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const users: User[] = [
    {
      userId: 'c73a0954-8fa9-413c-afff-d78bc94d1d3f',
      username: 'Alex',
    },
    {
      userId: 'c73a0954-8fa9-413c-afff-d78bc94d1d35',
      username: 'Alex',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            insert: () => ({ identifiers: [{ userId: users[0].userId }] }),
            update: () => true,
            delete: () => true,
            findOne: user => {
              if (user.username) {
                return users.find(u => u.username === user.username);
              }

              return users.find(u => u.userId === user);
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('Success', () => {
      jest.spyOn(service, 'createUser');
      expect(
        service.createUser({ ...users[0], username: 'New Name' }),
      ).resolves.toStrictEqual({ userId: users[0].userId });
    });

    it('Error', () => {
      jest.spyOn(service, 'createUser');
      expect(service.createUser(users[1])).rejects.toThrowError(
        new HttpException(
          `User '${users[1].username}' already exists`,
          HttpStatus.FORBIDDEN,
        ),
      );
    });
  });

  describe('updateUser', () => {
    it('Success', () => {
      jest.spyOn(service, 'updateUser');
      expect(
        service.updateUser({ ...users[0], username: 'New Name' }),
      ).resolves.toBeUndefined();
    });

    it('Error found', () => {
      jest.spyOn(service, 'updateUser');
      expect(
        service.updateUser({ ...users[0], userId: 'blabla' }),
      ).rejects.toThrowError(new NotFoundException('User not found'));
    });

    it('Error name exists', () => {
      jest.spyOn(service, 'updateUser');
      expect(service.updateUser(users[1])).rejects.toThrowError(
        new HttpException(
          `User '${users[1].username}' already exists`,
          HttpStatus.FORBIDDEN,
        ),
      );
    });
  });

  describe('deleteUser', () => {
    it('Success', () => {
      jest.spyOn(service, 'deleteUser');
      expect(service.deleteUser(users[0].userId)).resolves.toBeUndefined();
    });

    it('Error', () => {
      jest.spyOn(service, 'deleteUser');
      expect(service.deleteUser('blabla')).rejects.toThrowError(
        new NotFoundException('User not found'),
      );
    });
  });

  it('getUser', () => {
    jest.spyOn(service, 'getUser');
    expect(service.getUser(users[0])).resolves.toBe(users[0]);
  });

  it('getUserById', () => {
    jest.spyOn(service, 'getUserById');
    expect(service.getUserById(users[0].userId)).resolves.toBe(users[0]);
  });
});
