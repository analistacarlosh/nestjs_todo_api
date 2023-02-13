import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CreateTaskDto, TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'Task #1',
                description: 'description #1',
                created_at: new Date(),
              },
              {
                title: 'Task #2',
                description: 'description #2',
                created_at: new Date(),
              },
              {
                title: 'Task #3',
                description: 'description #3',
                created_at: new Date(),
              },
            ]),
            create: jest
              .fn()
              .mockImplementation((createTaskDto: CreateTaskDto) =>
                Promise.resolve({ _id: '1', ...createTaskDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get(TaskController);
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new task', async () => {
      const createCatDto: CreateTaskDto = {
        title: 'Task #1',
        description: 'description #1',
        create_at: new Date(),
      };

      expect(controller.create(createCatDto)).resolves.toEqual({
        _id: '1',
        ...createCatDto,
      });
    });
  });

  describe('findAll()', () => {
    it('should get an array of cats', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          title: 'Task #1',
          description: 'description #1',
          created_at: new Date(),
        },
        {
          title: 'Task #2',
          description: 'description #2',
          created_at: new Date(),
        },
        {
          title: 'Task #3',
          description: 'description #3',
          created_at: new Date(),
        },
      ]);
    });
  });
});
