"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tasks_controller_1 = require("./tasks.controller");
describe('TasksController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [tasks_controller_1.TasksController],
        }).compile();
        controller = module.get(tasks_controller_1.TasksController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
