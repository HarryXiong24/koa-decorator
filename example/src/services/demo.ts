import { Service } from '../../../src';

@Service()
export default class DemoService {
  public async index(): Promise<
    {
      id: string;
      name: string;
      gender: string;
    }[]
  > {
    return [
      { id: '11111', name: 'harry', gender: 'male' },
      { id: '22222', name: 'peter', gender: 'female' },
    ];
  }
}
