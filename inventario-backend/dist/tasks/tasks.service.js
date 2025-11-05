"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        var _a, _b;
        const task = await this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                status: ((_a = dto.status) !== null && _a !== void 0 ? _a : client_1.TaskStatus.PENDING),
                priority: (_b = dto.priority) !== null && _b !== void 0 ? _b : 3,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
                userId,
            },
        });
        return task;
    }
    async findAllForUser(userId) {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOneForUser(userId, id) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task || task.userId !== userId) {
            throw new common_1.NotFoundException('Tarea no encontrada');
        }
        return task;
    }
    async update(userId, id, dto) {
        var _a, _b, _c, _d;
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task || task.userId !== userId) {
            throw new common_1.NotFoundException('Tarea no encontrada');
        }
        const updated = await this.prisma.task.update({
            where: { id },
            data: {
                title: (_a = dto.title) !== null && _a !== void 0 ? _a : task.title,
                description: (_b = dto.description) !== null && _b !== void 0 ? _b : task.description,
                status: ((_c = dto.status) !== null && _c !== void 0 ? _c : client_1.TaskStatus.PENDING),
                priority: (_d = dto.priority) !== null && _d !== void 0 ? _d : task.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : task.dueDate,
            },
        });
        return updated;
    }
    async remove(userId, id) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task || task.userId !== userId) {
            throw new common_1.NotFoundException('Tarea no encontrada');
        }
        await this.prisma.task.delete({ where: { id } });
        return { message: 'Tarea eliminada' };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
