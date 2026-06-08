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
        case 'query':
            return {
                type: 'query',
                query: node.query,
                inverted: node.inverted,
                args: node.args.map(serializeExpression),
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
        case 'query':
            return {
                type: 'query',
                query: data.query,
                inverted: data.inverted ?? false,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvQ29uZGl0aW9uVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdEQSxrREFzQ0M7QUFFRCxzREF5Q0M7QUFqRkQsU0FBZ0IsbUJBQW1CLENBQUMsSUFBb0I7SUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDekMsQ0FBQztRQUVOLEtBQUssT0FBTztZQUNSLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7SUFDVixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLElBQVM7SUFDM0MsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFLLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdEMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDM0MsQ0FBQztRQUVOLEtBQUssT0FBTztZQUNSLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLO2dCQUNoQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRCxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7UUFFTjtZQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgRXhwcmVzc2lvbk5vZGUgPVxyXG4gICAgfCBMb2dpY2FsTm9kZVxyXG4gICAgfCBDb21wYXJpc29uTm9kZVxyXG4gICAgfCBRdWVyeU5vZGVcclxuICAgIHwgTGl0ZXJhbE5vZGVcclxuICAgIHwgQm9vbGVhbk5vZGU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5Tm9kZSB7XHJcbiAgICB0eXBlOiAncXVlcnknO1xyXG5cclxuICAgIHF1ZXJ5OiBzdHJpbmc7XHJcbiAgICBpbnZlcnRlZDogYm9vbGVhbjtcclxuICAgIGFyZ3M6IEV4cHJlc3Npb25Ob2RlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGl0ZXJhbE5vZGUge1xyXG4gICAgdHlwZTogJ2xpdGVyYWwnO1xyXG5cclxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9vbGVhbk5vZGUge1xyXG4gICAgdHlwZTogJ2Jvb2xlYW4nO1xyXG5cclxuICAgIHZhbHVlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmlzb25Ob2RlIHtcclxuICAgIHR5cGU6ICdjb21wYXJpc29uJztcclxuICAgIG9wZXJhdG9yOlxyXG4gICAgICAgIHwgJz09J1xyXG4gICAgICAgIHwgJyE9J1xyXG4gICAgICAgIHwgJz4nXHJcbiAgICAgICAgfCAnPj0nXHJcbiAgICAgICAgfCAnPCdcclxuICAgICAgICB8ICc8PSc7XHJcblxyXG4gICAgbGVmdDogRXhwcmVzc2lvbk5vZGU7XHJcbiAgICByaWdodDogRXhwcmVzc2lvbk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9naWNhbE5vZGUge1xyXG4gICAgdHlwZTogJ2xvZ2ljYWwnO1xyXG4gICAgb3BlcmF0b3I6ICcmJicgfCAnfHwnO1xyXG4gICAgbGVmdDogRXhwcmVzc2lvbk5vZGU7XHJcbiAgICByaWdodDogRXhwcmVzc2lvbk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGU6IEV4cHJlc3Npb25Ob2RlKTogYW55IHtcclxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naWNhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbG9naWNhbCcsXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogbm9kZS5vcGVyYXRvcixcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUucmlnaHQpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdjb21wYXJpc29uJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb21wYXJpc29uJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBub2RlLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3F1ZXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVyeScsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogbm9kZS5xdWVyeSxcclxuICAgICAgICAgICAgICAgIGludmVydGVkOiBub2RlLmludmVydGVkLFxyXG4gICAgICAgICAgICAgICAgYXJnczogbm9kZS5hcmdzLm1hcChzZXJpYWxpemVFeHByZXNzaW9uKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnbGl0ZXJhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGl0ZXJhbCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS52YWx1ZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbm9kZS52YWx1ZSxcclxuICAgICAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplRXhwcmVzc2lvbihkYXRhOiBhbnkpOiBFeHByZXNzaW9uTm9kZSB7XHJcbiAgICBzd2l0Y2ggKGRhdGEudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2xvZ2ljYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xvZ2ljYWwnLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IGRhdGEub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2NvbXBhcmlzb24nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBhcmlzb24nLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IGRhdGEub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3F1ZXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVyeScsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogZGF0YS5xdWVyeSxcclxuICAgICAgICAgICAgICAgIGludmVydGVkOiBkYXRhLmludmVydGVkID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXJnczogKGRhdGEuYXJncyA/PyBbXSkubWFwKGRlc2VyaWFsaXplRXhwcmVzc2lvbiksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBFeHByZXNzaW9uTm9kZSB0eXBlOiAke2RhdGEudHlwZX1gKTtcclxuICAgIH1cclxufSJdfQ==