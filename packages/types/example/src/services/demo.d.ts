export default class DemoService {
    index(): Promise<{
        id: string;
        name: string;
        gender: string;
    }[]>;
}
