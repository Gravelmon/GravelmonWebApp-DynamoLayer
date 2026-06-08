export interface ConditionDefinition {
    id: string;
    displayName: string;
    description: string;
    parameters: ConditionParameter[];
    /**
     * Type returned by the query.
     */
    returns: ValueType;
    /**
     * Whether this value can be used directly in a condition.
     *
     * Example:
     * q.in_air
     * !q.is_ridden
     */
    condition: boolean;
    examples?: string[];
}
export type ValueType = 'boolean' | 'number' | 'string';
export interface ConditionParameter {
    name: string;
    type: ValueType;
    description: string;
    required: boolean;
}
export declare const ConditionDefinitions: Record<string, ConditionDefinition>;
