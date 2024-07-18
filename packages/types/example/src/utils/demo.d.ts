declare class DemoInjectable {
    index(): Promise<{
        id: string;
        name: string;
        gender: string;
    }[]>;
}
export default DemoInjectable;
