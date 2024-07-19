import { Injectable } from 'koa-decorator-x';

@Injectable()
class DemoInjectable {
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

export default DemoInjectable;
