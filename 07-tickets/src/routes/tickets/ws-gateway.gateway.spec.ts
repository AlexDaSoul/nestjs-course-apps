import { Test, TestingModule } from '@nestjs/testing';
import { WsGatewayGateway } from './ws-gateway.gateway';

describe('WsGatewayGateway', () => {
    let gateway: WsGatewayGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WsGatewayGateway],
        }).compile();

        gateway = module.get<WsGatewayGateway>(WsGatewayGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
