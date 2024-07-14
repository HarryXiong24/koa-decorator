import { Service } from '../../../src/main';

@Service()
class DemoService {
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

export default DemoService;
