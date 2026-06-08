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

export type ValueType =
    | 'boolean'
    | 'number'
    | 'string';

export interface ConditionParameter {
    name: string;
    type: ValueType;
    description: string;
    required: boolean;
}

export const ConditionDefinitions: Record<string, ConditionDefinition> = {
    is_busy: {
        id: 'is_busy',
        displayName: 'Is Busy',
        description: 'Whether the Pokémon is currently busy.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    in_battle: {
        id: 'in_battle',
        displayName: 'In Battle',
        description: 'Whether the Pokémon is currently in battle.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_moving: {
        id: 'is_moving',
        displayName: 'Is Moving',
        description: 'Whether the Pokémon has an active movement goal.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_flying: {
        id: 'is_flying',
        displayName: 'Is Flying',
        description: 'Whether the Pokémon has the flying behaviour flag enabled.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    get_riding_state: {
        id: 'get_riding_state',
        displayName: 'Get Riding State',
        description:
            'Retrieves a named riding state value from the current riding behaviour if available.',
        parameters: [
            {
                name: 'state',
                type: 'string',
                description: 'Name of the riding state to query.',
                required: true,
            },
        ],
        returns: 'number',
        condition: false,
        examples: ["q.get_riding_state('speed') > 0"],
    },

    is_gliding: {
        id: 'is_gliding',
        displayName: 'Is Gliding',
        description: 'Whether the Pokémon is currently gliding while ridden.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_sprinting: {
        id: 'is_sprinting',
        displayName: 'Is Sprinting',
        description: 'Whether the Pokémon is sprinting while ridden.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_drifting: {
        id: 'is_drifting',
        displayName: 'Is Drifting',
        description: 'Whether the Pokémon is drifting while ridden.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_powered_drifting: {
        id: 'is_powered_drifting',
        displayName: 'Is Powered Drifting',
        description: 'Whether the Pokémon is performing a boosted drift.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    in_air: {
        id: 'in_air',
        displayName: 'In Air',
        description: 'Whether the Pokémon is currently airborne.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_wild: {
        id: 'is_wild',
        displayName: 'Is Wild',
        description: 'Whether the Pokémon has no owner.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_in_party: {
        id: 'is_in_party',
        displayName: 'Is In Party',
        description: 'Whether the Pokémon is stored in a party.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    is_ridden: {
        id: 'is_ridden',
        displayName: 'Is Ridden',
        description: 'Whether the Pokémon currently has a controlling rider.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    has_aspect: {
        id: 'has_aspect',
        displayName: 'Has Aspect',
        description: 'Checks whether the Pokémon has a specific aspect.',
        parameters: [
            {
                name: 'aspect',
                type: 'string',
                description: 'Aspect identifier to check for.',
                required: true,
            },
        ],
        returns: 'boolean',
        condition: true,
        examples: ["q.has_aspect('shiny')"],
    },

    is_holding_item: {
        id: 'is_holding_item',
        displayName: 'Is Holding Item',
        description:
            'Whether the Pokémon is holding a visible item that is not hidden or cosmetic-only.',
        parameters: [],
        returns: 'boolean',
        condition: true,
    },

    riding_style: {
        id: 'riding_style',
        displayName: 'Riding Style',
        description: 'Current riding style of the Pokémon.',
        parameters: [],
        returns: 'string',
        condition: false,
        examples: ["q.riding_style == 'LAND'"],
    },

    is_wearing_hat: {
        id: 'is_wearing_hat',
        displayName: 'Is Wearing Hat',
        description: 'Whether the held item is classified as a hat.',
        parameters: [],
        returns: 'boolean',
        condition: true,
        examples: ['q.is_wearing_hat'],
    },

    is_wearing_face: {
        id: 'is_wearing_face',
        displayName: 'Is Wearing Face Item',
        description: 'Whether the held item is classified as a face wearable.',
        parameters: [],
        returns: 'boolean',
        condition: true,
        examples: ['q.is_wearing_face'],
    },

    is_pastured: {
        id: 'is_pastured',
        displayName: 'Is Pastured',
        description: 'Whether the Pokémon is currently tethered in a pasture.',
        parameters: [],
        returns: 'boolean',
        condition: true,
        examples: ['q.is_pastured'],
    },

    pasture_conflict_enabled: {
        id: 'pasture_conflict_enabled',
        displayName: 'Pasture Conflict Enabled',
        description: 'Whether pasture conflict behaviour is enabled.',
        parameters: [],
        returns: 'boolean',
        condition: true,
        examples: ['q.pasture_conflict_enabled'],
    },
};