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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    constructor() {
        this.helloWorldText = 'Hello World!';
    }
    get() {
        return this.helloWorldText;
    }
    getName(name) {
        return this.getHelloText(name);
    }
    getAdvNameHelloWorld(name) {
        console.log(name);
        return this.getHelloText(name);
    }
    postHelloWorld(name) {
        return this.getHelloText(name);
    }
    putStateHelloWorld(name) {
        this.helloWorldState = name;
        return `Hello World state was changed to ${this.helloWorldState}`;
    }
    deleteStateHelloWorld() {
        return `Hello World state was deleted`;
    }
    getStateHelloWorld() {
        return this.getHelloText(this.helloWorldState);
    }
    getHelloText(text) {
        return `Hello ${text}!`;
    }
};
__decorate([
    common_1.Get('simple'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "get", null);
__decorate([
    common_1.Get('simple/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "getName", null);
__decorate([
    common_1.Get('/adv'),
    __param(0, common_1.Query('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "getAdvNameHelloWorld", null);
__decorate([
    common_1.Post('simple'),
    __param(0, common_1.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "postHelloWorld", null);
__decorate([
    common_1.Put('simple/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "putStateHelloWorld", null);
__decorate([
    common_1.Delete('simple'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "deleteStateHelloWorld", null);
__decorate([
    common_1.Get('state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getStateHelloWorld", null);
AppController = __decorate([
    common_1.Controller('app')
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map