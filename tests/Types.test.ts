import { describe, it, expect } from 'vitest';
import { IntrospectionQuery } from 'graphql';

describe('TypeScript Interfaces and Types', () => {
    it('should create IRow correctly', () => {
        const row: IRow = { key: 'testKey', value: 'testValue' };
        expect(row.key).toBe('testKey');
        expect(row.value).toBe('testValue');
    });

    it('should create IParam correctly', () => {
        const param: IParam = { key: 'paramKey', value: 'paramValue' };
        expect(param.key).toBe('paramKey');
        expect(param.value).toBe('paramValue');
    });

    it('should create IHeader correctly', () => {
        const header: IHeader = { key: 'headerKey', value: 'headerValue' };
        expect(header.key).toBe('headerKey');
        expect(header.value).toBe('headerValue');
    });

    it('should handle ActiveEditor type correctly', () => {
        const editor: ActiveEditor = 'Body';
        expect(editor).toBe('Body');
    });

    it('should create DocumentationQuery correctly', () => {
        const introspectionQuery: IntrospectionQuery = {} as IntrospectionQuery;
        const docQuery: DocumentationQuery = { data: introspectionQuery };
        expect(docQuery.data).toBe(introspectionQuery);
    });

    it('should create Oftype correctly', () => {
        const ofType: Oftype = {
            name: 'String',
            kind: 'Scalar',
            ofType: null,
        };
        expect(ofType.name).toBe('String');
        expect(ofType.kind).toBe('Scalar');
        expect(ofType.ofType).toBeNull();
    });

    it('should create nested Oftype correctly', () => {
        const nestedOftype: Oftype = {
            name: null,
            kind: 'List',
            ofType: {
                name: 'String',
                kind: 'Scalar',
                ofType: null,
            },
        };
        expect(nestedOftype.kind).toBe('List');
        expect(nestedOftype.ofType?.name).toBe('String');
    });
});
