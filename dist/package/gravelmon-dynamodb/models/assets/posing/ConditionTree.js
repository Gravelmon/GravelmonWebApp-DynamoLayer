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
    console.log(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ncmF2ZWxtb24tZHluYW1vZGIvbW9kZWxzL2Fzc2V0cy9wb3NpbmcvQ29uZGl0aW9uVHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQThEQSxrREFtREM7QUFFRCxzREF1REM7QUE1R0QsU0FBZ0IsbUJBQW1CLENBQUMsSUFBb0I7SUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxZQUFZO1lBQ2IsT0FBTztnQkFDSCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDekMsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM3QyxDQUFDO1FBRU4sS0FBSyxPQUFPO1lBQ1IsT0FBTztnQkFDSCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxLQUFLO1lBQ04sT0FBTztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN6QyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7SUFDVixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLHFCQUFxQixDQUFDLElBQVM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixLQUFLLFNBQVM7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzNDLENBQUM7UUFFTixLQUFLLFlBQVk7WUFDYixPQUFPO2dCQUNILElBQUksRUFBRSxZQUFZO2dCQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxLQUFLLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMzQyxDQUFDO1FBRU4sS0FBSyxTQUFTO1lBQ1YsT0FBTztnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDaEQsTUFBTSxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQy9DLENBQUM7UUFFTixLQUFLLEtBQUs7WUFDTixPQUFPO2dCQUNILElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzNDLENBQUM7UUFFTixLQUFLLE9BQU87WUFDUixPQUFPO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQsQ0FBQztRQUVOLEtBQUssU0FBUztZQUNWLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUM7UUFFTixLQUFLLFNBQVM7WUFDVixPQUFPO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDO1FBRU47WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEV4cHJlc3Npb25Ob2RlID1cclxuICAgIHwgTG9naWNhbE5vZGVcclxuICAgIHwgQ29tcGFyaXNvbk5vZGVcclxuICAgIHwgUXVlcnlOb2RlXHJcbiAgICB8IExpdGVyYWxOb2RlXHJcbiAgICB8IFRlcm5hcnlOb2RlXHJcbiAgICB8IE5vdE5vZGVcclxuICAgIHwgQm9vbGVhbk5vZGU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5Tm9kZSB7XHJcbiAgICB0eXBlOiAncXVlcnknO1xyXG5cclxuICAgIHF1ZXJ5OiBzdHJpbmc7XHJcbiAgICBhcmdzOiBFeHByZXNzaW9uTm9kZVtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlcm5hcnlOb2RlIHtcclxuICAgIHR5cGU6ICd0ZXJuYXJ5JztcclxuXHJcbiAgICBjb25kaXRpb246IEV4cHJlc3Npb25Ob2RlO1xyXG4gICAgaWZUcnVlOiBFeHByZXNzaW9uTm9kZTtcclxuICAgIGlmRmFsc2U6IEV4cHJlc3Npb25Ob2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpdGVyYWxOb2RlIHtcclxuICAgIHR5cGU6ICdsaXRlcmFsJztcclxuXHJcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5vdE5vZGUge1xyXG4gICAgdHlwZTogJ25vdCc7XHJcbiAgICB2YWx1ZTogRXhwcmVzc2lvbk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQm9vbGVhbk5vZGUge1xyXG4gICAgdHlwZTogJ2Jvb2xlYW4nO1xyXG5cclxuICAgIHZhbHVlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmlzb25Ob2RlIHtcclxuICAgIHR5cGU6ICdjb21wYXJpc29uJztcclxuICAgIG9wZXJhdG9yOlxyXG4gICAgICAgIHwgJz09J1xyXG4gICAgICAgIHwgJyE9J1xyXG4gICAgICAgIHwgJz4nXHJcbiAgICAgICAgfCAnPj0nXHJcbiAgICAgICAgfCAnPCdcclxuICAgICAgICB8ICc8PSc7XHJcblxyXG4gICAgbGVmdDogRXhwcmVzc2lvbk5vZGU7XHJcbiAgICByaWdodDogRXhwcmVzc2lvbk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9naWNhbE5vZGUge1xyXG4gICAgdHlwZTogJ2xvZ2ljYWwnO1xyXG4gICAgb3BlcmF0b3I6ICcmJicgfCAnfHwnO1xyXG4gICAgbGVmdDogRXhwcmVzc2lvbk5vZGU7XHJcbiAgICByaWdodDogRXhwcmVzc2lvbk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGU6IEV4cHJlc3Npb25Ob2RlKTogYW55IHtcclxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naWNhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbG9naWNhbCcsXHJcbiAgICAgICAgICAgICAgICBvcGVyYXRvcjogbm9kZS5vcGVyYXRvcixcclxuICAgICAgICAgICAgICAgIGxlZnQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUucmlnaHQpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdjb21wYXJpc29uJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjb21wYXJpc29uJyxcclxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBub2RlLm9wZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmxlZnQpLFxyXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHNlcmlhbGl6ZUV4cHJlc3Npb24obm9kZS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3Rlcm5hcnknOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Rlcm5hcnknLFxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUuY29uZGl0aW9uKSxcclxuICAgICAgICAgICAgICAgIGlmVHJ1ZTogc2VyaWFsaXplRXhwcmVzc2lvbihub2RlLmlmVHJ1ZSksXHJcbiAgICAgICAgICAgICAgICBpZkZhbHNlOiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUuaWZGYWxzZSksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3F1ZXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVyeScsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogbm9kZS5xdWVyeSxcclxuICAgICAgICAgICAgICAgIGFyZ3M6IG5vZGUuYXJncy5tYXAoc2VyaWFsaXplRXhwcmVzc2lvbiksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ25vdCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbm90JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBzZXJpYWxpemVFeHByZXNzaW9uKG5vZGUudmFsdWUpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2xpdGVyYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpdGVyYWwnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG5vZGUudmFsdWUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YTogYW55KTogRXhwcmVzc2lvbk5vZGUge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBzd2l0Y2ggKGRhdGEudHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2xvZ2ljYWwnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2xvZ2ljYWwnLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IGRhdGEub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ2NvbXBhcmlzb24nOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBhcmlzb24nLFxyXG4gICAgICAgICAgICAgICAgb3BlcmF0b3I6IGRhdGEub3BlcmF0b3IsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5sZWZ0KSxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5yaWdodCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3Rlcm5hcnknOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Rlcm5hcnknLFxyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5jb25kaXRpb24pLFxyXG4gICAgICAgICAgICAgICAgaWZUcnVlOiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS5pZlRydWUpLFxyXG4gICAgICAgICAgICAgICAgaWZGYWxzZTogZGVzZXJpYWxpemVFeHByZXNzaW9uKGRhdGEuaWZGYWxzZSksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ25vdCc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbm90JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBkZXNlcmlhbGl6ZUV4cHJlc3Npb24oZGF0YS52YWx1ZSksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ3F1ZXJ5JzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdxdWVyeScsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogZGF0YS5xdWVyeSxcclxuICAgICAgICAgICAgICAgIGFyZ3M6IChkYXRhLmFyZ3MgPz8gW10pLm1hcChkZXNlcmlhbGl6ZUV4cHJlc3Npb24pLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdsaXRlcmFsJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsaXRlcmFsJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLnZhbHVlLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gRXhwcmVzc2lvbk5vZGUgdHlwZTogJHtkYXRhLnR5cGV9YCk7XHJcbiAgICB9XHJcbn0iXX0=