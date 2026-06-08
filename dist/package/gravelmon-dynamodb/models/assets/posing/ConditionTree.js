"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeExpression = serializeExpression;
exports.deserializeExpression = deserializeExpression;
function serializeExpression(node) {
    switch (node.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };
        case 'comparison':
            return {
                type: 'comparison',
                operator: node.operator,
                left: serializeExpression(node.left),
                right: serializeExpression(node.right),
            };
        case 'ternary':
            return {
                type: 'ternary',
                condition: serializeExpression(node.condition),
                ifTrue: serializeExpression(node.ifTrue),
                ifFalse: serializeExpression(node.ifFalse),
            };
        case 'query':
            return {
                type: 'query',
                query: node.query,
                args: node.args.map(serializeExpression),
            };
        case 'not':
            return {
                type: 'not',
                value: serializeExpression(node.value)
            };
        case 'literal':
            return {
                type: 'literal',
                value: node.value,
            };
        case 'boolean':
            return {
                type: 'boolean',
                value: node.value,
            };
    }
}
function deserializeExpression(data) {
    switch (data.type) {
        case 'logical':
            return {
                type: 'logical',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };
        case 'comparison':
            return {
                type: 'comparison',
                operator: data.operator,
                left: deserializeExpression(data.left),
                right: deserializeExpression(data.right),
            };
        case 'ternary':
            return {
                type: 'ternary',
                condition: deserializeExpression(data.condition),
                ifTrue: deserializeExpression(data.ifTrue),
                ifFalse: deserializeExpression(data.ifFalse),
            };
        case 'not':
            return {
                type: 'not',
                value: deserializeExpression(data.value),
            };
        case 'query':
            return {
                type: 'query',
                query: data.query,
                args: (data.args ?? []).map(deserializeExpression),
            };
        case 'literal':
            return {
                type: 'literal',
                value: data.value,
            };
        case 'boolean':
            return {
                type: 'boolean',
                value: data.value,
            };
        default:
            throw new Error(`Unknown ExpressionNode type: ${data.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvQ29uZGl0aW9uVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQThEQSxrREFtREM7QUFFRCxzREFzREM7QUEzR0QsU0FBZ0IsbUJBQW1CLENBQUMsSUFBb0I7SUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDekMsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM3QyxDQUFDO1FBRU4sS0FBSyxPQUFPO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxLQUFLO1lBQ04sT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7SUFDVixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLElBQVM7SUFDM0MsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFLLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdEMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDM0MsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMxQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMvQyxDQUFDO1FBRU4sS0FBSyxLQUFLO1lBQ04sT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxPQUFPO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JELENBQUM7UUFFTixLQUFLLFNBQVM7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBFeHByZXNzaW9uTm9kZSA9XHJcbiAgICB8IExvZ2ljYWxOb2RlXHJcbiAgICB8IENvbXBhcmlzb25Ob2RlXHJcbiAgICB8IFF1ZXJ5Tm9kZVxyXG4gICAgfCBMaXRlcmFsTm9kZVxyXG4gICAgfCBUZXJuYXJ5Tm9kZVxyXG4gICAgfCBOb3ROb2RlXHJcbiAgICB8IEJvb2xlYW5Ob2RlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBRdWVyeU5vZGUge1xyXG4gICAgdHlwZTogJ3F1ZXJ5JztcclxuXHJcbiAgICBxdWVyeTogc3RyaW5nO1xyXG4gICAgYXJnczogRXhwcmVzc2lvbk5vZGVbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZXJuYXJ5Tm9kZSB7XHJcbiAgICB0eXBlOiAndGVybmFyeSc7XHJcblxyXG4gICAgY29uZGl0aW9uOiBFeHByZXNzaW9uTm9kZTtcclxuICAgIGlmVHJ1ZTogRXhwcmVzc2lvbk5vZGU7XHJcbiAgICBpZkZhbHNlOiBFeHByZXNzaW9uTm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaXRlcmFsTm9kZSB7XHJcbiAgICB0eXBlOiAnbGl0ZXJhbCc7XHJcblxyXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3ROb2RlIHtcclxuICAgIHR5cGU6ICdub3QnO1xyXG4gICAgdmFsdWU6IEV4cHJlc3Npb25Ob2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJvb2xlYW5Ob2RlIHtcclxuICAgIHR5cGU6ICdib29sZWFuJztcclxuXHJcbiAgICB2YWx1ZTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJpc29uTm9kZSB7XHJcbiAgICB0eXBlOiAnY29tcGFyaXNvbic7XHJcbiAgICBvcGVyYXRvcjpcclxuICAgICAgICB8ICc9PSdcclxuICAgICAgICB8ICchPSdcclxuICAgICAgICB8ICc+J1xyXG4gICAgICAgIHwgJz49J1xyXG4gICAgICAgIHwgJzwnXHJcbiAgICAgICAgfCAnPD0nO1xyXG5cclxuICAgIGxlZnQ6IEV4cHJlc3Npb25Ob2RlO1xyXG4gICAgcmlnaHQ6IEV4cHJlc3Npb25Ob2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ2ljYWxOb2RlIHtcclxuICAgIHR5cGU6ICdsb2dpY2FsJztcclxuICAgIG9wZXJhdG9yOiAnJiYnIHwgJ3x8JztcclxuICAgIGxlZnQ6IEV4cHJlc3Npb25Ob2RlO1xyXG4gICAgcmlnaHQ6IEV4cHJlc3Npb25Ob2RlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplRXhwcmVzc2lvbihub2RlOiBFeHByZXNzaW9uTm9kZSk6IGFueSB7XHJcbiAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2xvZ2ljYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xvZ2ljYWwnLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IG5vZGUub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUubGVmdCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLnJpZ2h0KSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnY29tcGFyaXNvbic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29tcGFyaXNvbicsXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogbm9kZS5vcGVyYXRvcixcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUucmlnaHQpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICd0ZXJuYXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXJuYXJ5JyxcclxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmNvbmRpdGlvbiksXHJcbiAgICAgICAgICAgICAgICBpZlRydWU6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5pZlRydWUpLFxyXG4gICAgICAgICAgICAgICAgaWZGYWxzZTogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmlmRmFsc2UpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdxdWVyeSc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncXVlcnknLFxyXG4gICAgICAgICAgICAgICAgcXVlcnk6IG5vZGUucXVlcnksXHJcbiAgICAgICAgICAgICAgICBhcmdzOiBub2RlLmFyZ3MubWFwKHNlcmlhbGl6ZUV4cHJlc3Npb24pLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdub3QnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ25vdCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLnZhbHVlKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdsaXRlcmFsJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGE6IGFueSk6IEV4cHJlc3Npb25Ob2RlIHtcclxuICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naWNhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbG9naWNhbCcsXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogZGF0YS5vcGVyYXRvcixcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLnJpZ2h0KSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnY29tcGFyaXNvbic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29tcGFyaXNvbicsXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogZGF0YS5vcGVyYXRvcixcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLnJpZ2h0KSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAndGVybmFyeSc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGVybmFyeScsXHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb246IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLmNvbmRpdGlvbiksXHJcbiAgICAgICAgICAgICAgICBpZlRydWU6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLmlmVHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBpZkZhbHNlOiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5pZkZhbHNlKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnbm90JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdub3QnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhLnZhbHVlKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAncXVlcnknOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1ZXJ5JyxcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBkYXRhLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgYXJnczogKGRhdGEuYXJncyA/PyBbXSkubWFwKGRlc2VyaWFsaXplRXhwcmVzc2lvbiksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBFeHByZXNzaW9uTm9kZSB0eXBlOiAke2RhdGEudHlwZX1gKTtcclxuICAgIH1cclxufSJdfQ==