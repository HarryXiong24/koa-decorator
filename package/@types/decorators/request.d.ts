import { RequestMethod } from '../types/request';
export declare function Request(path: string, method: RequestMethod): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function GET(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function POST(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function PUT(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function DELETE(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function DEL(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function HEAD(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare function OPTIONS(path: string): (target: Object, key: string, descriptor: PropertyDescriptor) => void;
